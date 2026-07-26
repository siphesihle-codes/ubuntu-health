import { useMemo } from "react";
import { Appointment } from "@/types";
import useApiData from "./useApiData";

export default function useAppointmentData(patientId: number) {
	const {
		data: appointments,
		isLoading: appointmentsLoading,
		error: appointmentsError,
	} = useApiData<Appointment>("Appointments");

	// filter by patientId
	const filteredappointments = useMemo(() => {
		if (!appointments) return [];
		return appointments.filter(
			(appointment) => appointment.patientId === patientId
		);
	}, [appointments, patientId]);

	return { filteredappointments, appointmentsLoading, appointmentsError };
}
