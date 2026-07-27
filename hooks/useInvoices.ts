import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Invoice } from "@/types";

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
