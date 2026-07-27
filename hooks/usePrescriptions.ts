import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Prescription } from "@/types";

export interface PrescriptionMedicationPayload {
	name: string;
	dosage: string;
	instructions: string;
}

export interface PrescriptionPayload {
	patientId: number;
	endDate: string;
	frequency: string;
	refills: number;
	status: string;
	medications: PrescriptionMedicationPayload[];
	instructions: string;
}

const prescriptionsQuery = {
	queryKey: queryKeys.prescriptions.all,
	queryFn: () => apiRequest<Prescription[]>("Prescriptions"),
};

export function usePrescriptions() {
	return useQuery(prescriptionsQuery);
}

export function usePatientPrescriptions(patientId: number) {
	return useQuery({
		...prescriptionsQuery,
		select: (prescriptions: Prescription[]) =>
			prescriptions.filter(
				(prescription) => prescription.patientId === patientId
			),
	});
}

export function useCreatePrescription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (prescription: PrescriptionPayload) =>
			apiRequest<Prescription>("Prescriptions", {
				method: "POST",
				body: JSON.stringify(prescription),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.prescriptions.all }),
	});
}

export function useDeletePrescription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) =>
			apiRequest<void>(`Prescriptions/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.prescriptions.all }),
	});
}
