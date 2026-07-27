import React, { useMemo } from "react";
import AppointmentsTableCard from "../Cards/AppointmentsTableCard";
import { useAppointments } from "@/hooks/useAppointments";
import { APPOINTMENT_TYPES, STATUS_LABELS } from "@/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AppointmentsTableProps {
	searchTerm?: string;
}

const AppointmentsTable = ({ searchTerm = "" }: AppointmentsTableProps) => {
	const { data: appointments = [], isLoading, error } = useAppointments();

	const filteredAppointments = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return appointments;

		return appointments.filter((appointment) =>
			`${appointment.patientFirstName} ${appointment.patientLastName} ${
				appointment.practitionerName ?? ""
			} ${APPOINTMENT_TYPES[appointment.appointmentType] ?? ""} ${
				STATUS_LABELS[appointment.status] ?? ""
			}`
				.toLowerCase()
				.includes(query)
		);
	}, [appointments, searchTerm]);

	if (isLoading) {
		return (
			<Card className="gap-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="flex items-center gap-4 px-6">
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-4 w-20" />
					</div>
				))}
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<div className="px-6 py-12 text-center text-sm text-destructive">
					Error loading appointments. Please try again later.
				</div>
			</Card>
		);
	}

	return <AppointmentsTableCard appointments={filteredAppointments} />;
};

export default AppointmentsTable;
