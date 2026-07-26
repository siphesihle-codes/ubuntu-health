import { useMemo } from "react";
import { ClinicalNote } from "@/types";
import useApiData from "./useApiData";

export default function useClinicalNoteData(patientId: number) {
	const {
		data: clinicalNotes,
		isLoading: clinicalNotesLoading,
		error: clinicalNotesError,
	} = useApiData<ClinicalNote>("ClinicalNotes");

	// filter by patientId
	const filteredClinicalNotes = useMemo(() => {
		if (!clinicalNotes) return [];
		return clinicalNotes.filter(
			(clinicalNote) => clinicalNote.patientId === patientId
		);
	}, [clinicalNotes, patientId]);

	return { filteredClinicalNotes, clinicalNotesLoading, clinicalNotesError };
}
