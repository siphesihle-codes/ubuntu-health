import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Patient } from "@/types";

export type PatientPayload = Omit<Patient, "id" | "createdAt" | "updatedAt">;

export function usePatients() {
	return useQuery({
		queryKey: queryKeys.patients.all,
		queryFn: () => apiRequest<Patient[]>("Patients"),
	});
}

export function usePatient(id: string | undefined) {
	return useQuery({
		queryKey: queryKeys.patients.detail(id ?? ""),
		queryFn: () => apiRequest<Patient>(`Patients/${id}`),
		enabled: Boolean(id),
	});
}

export function useCreatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (patient: PatientPayload) =>
			apiRequest<void>("Patients", {
				method: "POST",
				body: JSON.stringify(patient),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.patients.all }),
	});
}

export function useUpdatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (patient: Patient) =>
			apiRequest<void>(`Patients/${patient.id}`, {
				method: "PUT",
				body: JSON.stringify(patient),
			}),
		onSuccess: (_data, patient) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
			queryClient.invalidateQueries({
				queryKey: queryKeys.patients.detail(String(patient.id)),
			});
		},
	});
}

export function useDeletePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) =>
			apiRequest<void>(`Patients/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.patients.all }),
	});
}
