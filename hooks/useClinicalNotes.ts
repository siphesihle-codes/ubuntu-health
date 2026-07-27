import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { ClinicalNote } from "@/types";

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
