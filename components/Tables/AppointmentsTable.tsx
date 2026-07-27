import React from "react";
import AppointmentsTableCard from "../Cards/AppointmentsTableCard";
import { useAppointments } from "@/hooks/useAppointments";

const AppointmentsTable = () => {
	const { data: appointments = [], isLoading, error } = useAppointments();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading appointments data...
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-400">
				Error loading appointments. Please try again later.
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="mt-8">
				<AppointmentsTableCard appointments={appointments} />
			</div>
		</div>
	);
};

export default AppointmentsTable;
