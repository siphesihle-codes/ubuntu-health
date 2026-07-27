export interface PagedResult<T> {
	items: T[];
	totalCount: number;
	page: number;
	pageSize: number;
}

export interface Patient {
	id: number;
	firstName: string;
	lastName: string;
	idNumber: string;
	sex: string;
	email: string;
	phone: string;
	street: string;
	streetTwo: string;
	city: string;
	province: string;
	postalCode: string;
	allergies: string;
	currentMedication: string | null;
	medicalAidName: string | null;
	membershipNumber: string | null;
	emergencyContactFirstName: string;
	emergencyContactLastName: string;
	emergencyContactPhone: string;
	emergencyContactRelationship: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface Appointment {
	id: number;
	tenantId: string;
	patientId: number;
	patientFirstName: string;
	patientLastName: string;
	appointmentDate: string;
	appointmentTime: string;
	appointmentType: keyof typeof APPOINTMENT_TYPES;
	status: keyof typeof STATUS_LABELS;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface Invoice {
	id: number;
	tenantId: string;
	patientId: number;
	appointmentId: number;
	totalAmount: number;
	status: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface Prescription {
	id: number;
	tenantId: string;
	patientId: number;
	practitionerId: number;
	endDate: string;
	frequency: string;
	refills: number;
	status: keyof typeof PRESCRIPTION_STATUS;
	instructions: string;
	createdAt: string;
	updatedAt: string;
}

export interface ClinicalNote {
	id: number;
	tenantId: string;
	patientId: number;
	doctorId: string;
	diagnosesCode: string;
	status: string | null;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export const APPOINTMENT_TYPES = {
	initialConsultation: "Initial consultation",
	followUp: "Follow-up",
	annualPhysical: "Annual physical",
	urgentCare: "Urgent care",
	specialistReferral: "Specialist referral",
	procedure: "Procedure",
	labWork: "Lab work",
	vaccination: "Vaccination",
	preventiveCare: "Preventive care",
	chronicDisease: "Chronic disease management",
	mentalHealth: "Mental health",
	telehealth: "Telehealth",
	preOperative: "Pre-operative",
	postOperative: "Post-operative",
	physicalTherapy: "Physical therapy",
	other: "Other",
};

export const STATUS_LABELS = {
	scheduled: "Scheduled",
	confirmed: "Confirmed",
	checkedIn: "Checked in",
	inProgress: "In Progress",
	completed: "Completed",
	cancelled: "Cancelled",
	noShow: "No show",
	rescheduled: "Rescheduled",
};

export const STATUS_COLORS = {
	scheduled: "bg-blue-100 text-blue-800",
	confirmed: "bg-green-100 text-green-800",
	checkedIn: "bg-purple-100 text-purple-800",
	inProgress: "bg-yellow-100 text-yellow-800",
	completed: "bg-gray-300 text-gray-800",
	cancelled: "bg-red-100 text-red-800",
	noShow: "bg-orange-100 text-orange-800",
	rescheduled: "bg-indigo-100 text-indigo-800",
};

export const MEDICATION_TYPES = {
	tablet: "Tablet",
	capsule: "Capsule",
	syrup: "Syrup",
	injection: "Injection",
	ointment: "Ointment",
	drops: "Drops",
	inhaler: "Inhaler",
	patch: "Transdermal patch",
	suppository: "Suppository",
	other: "Other",
} as const;

export const PRESCRIPTION_STATUS = {
	active: "Active",
	pending: "Pending",
	completed: "Completed",
	cancelled: "Cancelled",
	expired: "Expired",
} as const;

export const BILL_STATUS = {
	pending: "Pending",
	paid: "Paid",
	overdue: "Overdue",
	cancelled: "Cancelled",
	refunded: "Refunded",
} as const;

export const INVOICE_STATUS = {
	draft: "Draft",
	pending: "Pending",
	paid: "Paid",
	overdue: "Overdue",
	cancelled: "Cancelled",
	partiallyPaid: "Partially Paid",
} as const;
