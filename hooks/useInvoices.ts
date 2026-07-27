import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Invoice } from "@/types";

export interface InvoicePayload {
	patientId: number;
	patientFirstName: string;
	patientLastName: string;
	totalAmount: number;
	status: string;
	notes: string;
	dueDate: string;
}

const invoicesQuery = {
	queryKey: queryKeys.invoices.all,
	queryFn: () => apiRequest<Invoice[]>("Invoices"),
};

export function useInvoices() {
	return useQuery(invoicesQuery);
}

export function usePatientInvoices(patientId: number) {
	return useQuery({
		...invoicesQuery,
		select: (invoices: Invoice[]) =>
			invoices.filter((invoice) => invoice.patientId === patientId),
	});
}

export function useCreateInvoice() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (invoice: InvoicePayload) =>
			apiRequest<Invoice>("Invoices", {
				method: "POST",
				body: JSON.stringify(invoice),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all }),
	});
}

export function useUpdateInvoice() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, ...invoice }: InvoicePayload & { id: number }) =>
			apiRequest<Invoice>(`Invoices/${id}`, {
				method: "PUT",
				body: JSON.stringify(invoice),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all }),
	});
}

export function useDeleteInvoice() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) =>
			apiRequest<void>(`Invoices/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all }),
	});
}
