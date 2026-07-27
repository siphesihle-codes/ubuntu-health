import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { ClinicalNote } from "@/types";

export interface ClinicalNotePayload {
	patientId: number;
	diagnosesCode: string;
	notes: string;
}

const clinicalNotesQuery = {
	queryKey: queryKeys.clinicalNotes.all,
	queryFn: () => apiRequest<ClinicalNote[]>("ClinicalNotes"),
};

export function useClinicalNotes() {
	return useQuery(clinicalNotesQuery);
}

export function usePatientClinicalNotes(patientId: number) {
	return useQuery({
		...clinicalNotesQuery,
		select: (clinicalNotes: ClinicalNote[]) =>
			clinicalNotes.filter(
				(clinicalNote) => clinicalNote.patientId === patientId
			),
	});
}

export function useCreateClinicalNote() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (clinicalNote: ClinicalNotePayload) =>
			apiRequest<ClinicalNote>("ClinicalNotes", {
				method: "POST",
				body: JSON.stringify(clinicalNote),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.clinicalNotes.all }),
	});
}

export function useUpdateClinicalNote() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			diagnosesCode,
			notes,
		}: Omit<ClinicalNotePayload, "patientId"> & { id: number }) =>
			apiRequest<ClinicalNote>(`ClinicalNotes/${id}`, {
				method: "PUT",
				body: JSON.stringify({ diagnosesCode, notes }),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.clinicalNotes.all }),
	});
}

export function useDeleteClinicalNote() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) =>
			apiRequest<void>(`ClinicalNotes/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.clinicalNotes.all }),
	});
}
