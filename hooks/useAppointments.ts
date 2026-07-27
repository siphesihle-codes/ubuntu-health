import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Appointment, PagedResult } from "@/types";

export const DEFAULT_PAGE_SIZE = 100;

export interface AppointmentPayload {
	patientId?: number;
	patientFirstName: string;
	patientLastName: string;
	appointmentDate: string;
	appointmentTime: string;
	appointmentType: string;
	status: string;
	notes: string;
}

const appointmentsQuery = (page: number, pageSize: number) => ({
	queryKey: queryKeys.appointments.list(page, pageSize),
	queryFn: () =>
		apiRequest<PagedResult<Appointment>>(
			`Appointments?page=${page}&pageSize=${pageSize}`
		),
});

export function useAppointments(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
	return useQuery({
		...appointmentsQuery(page, pageSize),
		select: (result) => result.items,
	});
}

export function usePatientAppointments(patientId: number) {
	return useQuery({
		...appointmentsQuery(1, DEFAULT_PAGE_SIZE),
		select: (result) =>
			result.items.filter((appointment) => appointment.patientId === patientId),
	});
}

export function useCreateAppointment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (appointment: AppointmentPayload) =>
			apiRequest<void>("Appointments", {
				method: "POST",
				body: JSON.stringify(appointment),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
	});
}

export function useUpdateAppointment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (appointment: Appointment) =>
			apiRequest<void>(`Appointments/${appointment.id}`, {
				method: "PUT",
				body: JSON.stringify({
					patientId: appointment.patientId,
					patientFirstName: appointment.patientFirstName,
					patientLastName: appointment.patientLastName,
					appointmentDate: appointment.appointmentDate,
					appointmentTime: appointment.appointmentTime,
					appointmentType: appointment.appointmentType,
					status: appointment.status,
					notes: appointment.notes || "",
				}),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
	});
}

export function useDeleteAppointment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) =>
			apiRequest<void>(`Appointments/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all }),
	});
}
