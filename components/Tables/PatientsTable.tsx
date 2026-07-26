import React, { useMemo } from "react";
import PatientsTableCard from "../Cards/PatientsTableCard";
import useApiData from "@/hooks/useApiData";
import { Patient } from "@/types";

interface PatientsTableProps {
	searchTerm?: string;
}

const PatientsTable = ({ searchTerm = "" }: PatientsTableProps) => {
	const {
		data: patients,
		isLoading: patientsLoading,
		error: patientsError,
	} = useApiData<Patient>("Patients");

	const isLoading = patientsLoading;
	const error = patientsError;

	const filteredPatients = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return patients;

		return patients.filter((patient) =>
			`${patient.firstName} ${patient.lastName} ${patient.email ?? ""} ${
				patient.phone ?? ""
			}`
				.toLowerCase()
				.includes(query)
		);
	}, [patients, searchTerm]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading patients data...
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-600 ">
				Error loading patients data. Please try again later.
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="mt-8">
				<PatientsTableCard patients={filteredPatients} />
			</div>
		</div>
	);
};

export default PatientsTable;
