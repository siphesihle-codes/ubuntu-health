import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { ImportSummary } from "@/types";

export interface PracticeImport {
	patients?: unknown[];
	appointments?: unknown[];
	clinicalNotes?: unknown[];
	prescriptions?: unknown[];
	invoices?: unknown[];
}

export function useImportPractice() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (practice: PracticeImport) =>
			apiRequest<ImportSummary>("Import", {
				method: "POST",
				body: JSON.stringify(practice),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
			queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
			queryClient.invalidateQueries({ queryKey: queryKeys.clinicalNotes.all });
			queryClient.invalidateQueries({ queryKey: queryKeys.prescriptions.all });
			queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
		},
	});
}
