import type { PracticeImport } from "@/hooks/useImport";

const PATIENT_COLUMNS: Record<string, string> = {
	firstname: "firstName",
	name: "firstName",
	givenname: "firstName",
	lastname: "lastName",
	surname: "lastName",
	familyname: "lastName",
	idnumber: "idNumber",
	identitynumber: "idNumber",
	said: "idNumber",
	sex: "sex",
	gender: "sex",
	email: "email",
	emailaddress: "email",
	phone: "phone",
	cell: "phone",
	cellphone: "phone",
	mobile: "phone",
	contactnumber: "phone",
	street: "street",
	address: "street",
	addressline1: "street",
	streettwo: "streetTwo",
	addressline2: "streetTwo",
	city: "city",
	town: "city",
	province: "province",
	postalcode: "postalCode",
	postcode: "postalCode",
	allergies: "allergies",
	currentmedication: "currentMedication",
	medication: "currentMedication",
	medicalaidname: "medicalAidName",
	medicalaid: "medicalAidName",
	scheme: "medicalAidName",
	membershipnumber: "membershipNumber",
	membernumber: "membershipNumber",
	emergencycontactfirstname: "emergencyContactFirstName",
	emergencycontactlastname: "emergencyContactLastName",
	emergencycontactphone: "emergencyContactPhone",
	emergencycontactrelationship: "emergencyContactRelationship",
};

const normaliseHeader = (header: string) =>
	header.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

const splitCsvRow = (row: string) => {
	const values: string[] = [];
	let value = "";
	let inQuotes = false;

	for (let index = 0; index < row.length; index += 1) {
		const character = row[index];

		if (character === '"') {
			if (inQuotes && row[index + 1] === '"') {
				value += '"';
				index += 1;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}

		if (character === "," && !inQuotes) {
			values.push(value);
			value = "";
			continue;
		}

		value += character;
	}

	values.push(value);
	return values.map((entry) => entry.trim());
};

export const parseCsvPatients = (text: string): PracticeImport => {
	const rows = text
		.split(/\r?\n/)
		.filter((row) => row.trim().length > 0)
		.map(splitCsvRow);

	if (rows.length < 2) {
		throw new Error("That CSV has no rows below the header");
	}

	const headers = rows[0].map(normaliseHeader);
	const mapped = headers.map((header) => PATIENT_COLUMNS[header]);

	if (!mapped.includes("firstName") && !mapped.includes("lastName")) {
		throw new Error(
			"That CSV needs a first name or last name column to identify patients"
		);
	}

	const patients = rows.slice(1).map((row, index) => {
		const patient: Record<string, string | number> = { id: index + 1 };

		mapped.forEach((field, column) => {
			if (!field) return;
			const value = row[column];
			if (value) patient[field] = value;
		});

		return patient;
	});

	return { patients } as PracticeImport;
};

export const parseImportFile = async (file: File): Promise<PracticeImport> => {
	const text = await file.text();

	if (file.name.toLowerCase().endsWith(".csv")) {
		return parseCsvPatients(text);
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new Error("That file is not valid JSON or CSV");
	}

	if (typeof parsed !== "object" || parsed === null) {
		throw new Error("That file does not look like a practice export");
	}

	const { patients, appointments, clinicalNotes, prescriptions, invoices } =
		parsed as PracticeImport;

	return {
		patients: patients ?? [],
		appointments: appointments ?? [],
		clinicalNotes: clinicalNotes ?? [],
		prescriptions: prescriptions ?? [],
		invoices: invoices ?? [],
	};
};
