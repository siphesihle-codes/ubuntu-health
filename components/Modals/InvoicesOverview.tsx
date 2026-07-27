import React from "react";
import { useRouter } from "next/router";
import { usePatientInvoices } from "@/hooks/useInvoices";
import { FileText } from "lucide-react";
import ClientDate from "../ClientDate";
import { INVOICE_STATUS_COLORS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const currency = (amount: number) =>
	`R${amount.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

const InvoicesOverview = () => {
	const { id: patientIdParam } = useRouter().query as { id: string };
	const patientId = parseInt(patientIdParam, 10);

	const {
		data: invoices = [],
		isLoading,
		error,
	} = usePatientInvoices(patientId);

	if (isLoading) {
		return (
			<Card className="gap-3">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="flex items-center gap-4 px-6">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="h-4 w-24" />
					</div>
				))}
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<div className="px-6 py-12 text-center text-sm text-destructive">
					Error loading invoices data.
				</div>
			</Card>
		);
	}

	if (invoices.length === 0) {
		return (
			<Card>
				<div className="flex flex-col items-center px-6 py-14 text-center">
					<span className="flex size-12 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
						<FileText className="size-5" />
					</span>
					<h2 className="mt-4 text-base font-medium">No invoices yet</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Invoices raised for this patient will appear here.
					</p>
				</div>
			</Card>
		);
	}

	return (
		<Card className="p-0 [--card-spacing:0px]">
			<div className="max-h-[60vh] overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-card">
						<TableRow>
							<TableHead className="px-6">Invoice #</TableHead>
							<TableHead className="px-6">Amount</TableHead>
							<TableHead className="px-6">Status</TableHead>
							<TableHead className="px-6">Created</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="px-6 py-3 font-medium tabular-nums">
									{invoice.id}
								</TableCell>
								<TableCell className="px-6 py-3 font-medium tabular-nums">
									{currency(invoice.totalAmount)}
								</TableCell>
								<TableCell className="px-6 py-3">
									<Badge
										className={
											INVOICE_STATUS_COLORS[invoice.status] ??
											"bg-muted text-muted-foreground"
										}
									>
										{invoice.status}
									</Badge>
								</TableCell>
								<TableCell className="px-6 py-3 text-muted-foreground">
									<ClientDate dateString={invoice.createdAt} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
};

export default InvoicesOverview;
