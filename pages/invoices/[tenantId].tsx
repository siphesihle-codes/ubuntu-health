import { useState } from "react";
import {
	AlertCircle,
	CheckCircle,
	Clock,
	FileText,
	Pencil,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import InvoiceForm from "@/components/Forms/InvoiceForm";
import { useDeleteInvoice, useInvoices } from "@/hooks/useInvoices";
import { INVOICE_STATUS, INVOICE_STATUS_COLORS } from "@/types";
import type { Invoice } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const FILTERS = [
	{ value: "all", label: "All" },
	{ value: "draft", label: "Drafts" },
	{ value: "pending", label: "Pending" },
	{ value: "paid", label: "Paid" },
	{ value: "overdue", label: "Overdue" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

const currency = (amount: number) =>
	`R${amount.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

const patientName = (invoice: Invoice) =>
	[invoice.patientFirstName, invoice.patientLastName]
		.filter(Boolean)
		.join(" ") || `Patient #${invoice.patientId}`;

const InvoicePage = () => {
	const [filter, setFilter] = useState<Filter>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [editing, setEditing] = useState<Invoice | null>(null);

	const { data: invoices = [] } = useInvoices();
	const deleteInvoice = useDeleteInvoice();

	const term = searchQuery.trim().toLowerCase();

	const filteredInvoices = invoices.filter((invoice) => {
		const matchesFilter = filter === "all" || invoice.status === filter;

		const matchesSearch =
			term === "" ||
			invoice.id.toString().includes(term) ||
			patientName(invoice).toLowerCase().includes(term);

		return matchesFilter && matchesSearch;
	});

	const handleDelete = (invoice: Invoice) => {
		deleteInvoice.mutate(invoice.id, {
			onSuccess: () => toast.success(`Invoice ${invoice.id} deleted`),
			onError: (error) => toast.error(error.message),
		});
	};

	const stats = [
		{
			label: "Total invoices",
			value: invoices.length.toLocaleString(),
			icon: FileText,
			tone: "text-foreground",
		},
		{
			label: "Amount due",
			value: currency(
				invoices
					.filter((invoice) => invoice.status !== "paid")
					.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
			),
			icon: AlertCircle,
			tone: "text-warning",
		},
		{
			label: "Overdue",
			value: invoices
				.filter((invoice) => invoice.status === "overdue")
				.length.toLocaleString(),
			icon: Clock,
			tone: "text-destructive",
		},
		{
			label: "Paid",
			value: currency(
				invoices
					.filter((invoice) => invoice.status === "paid")
					.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
			),
			icon: CheckCircle,
			tone: "text-success",
		},
	];

	return (
		<Layout
			title="Invoices"
			description="Manage and track patient invoices"
			actions={
				<Button size="sm" onClick={() => setIsCreating(true)}>
					<Plus />
					<span className="hidden sm:inline">New invoice</span>
				</Button>
			}
		>
			<div className="flex max-w-7xl flex-col gap-6">
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.label} size="sm">
							<CardContent className="flex items-center justify-between gap-4">
								<div className="flex min-w-0 flex-col gap-1">
									<span className="truncate text-xs text-muted-foreground">
										{stat.label}
									</span>
									<span
										className={`font-heading text-2xl font-semibold tracking-tight ${stat.tone}`}
									>
										{stat.value}
									</span>
								</div>
								<span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
									<stat.icon className={`size-5 ${stat.tone}`} />
								</span>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-wrap gap-2">
						{FILTERS.map((option) => (
							<Button
								key={option.value}
								size="sm"
								variant={filter === option.value ? "default" : "outline"}
								onClick={() => setFilter(option.value)}
							>
								{option.label}
							</Button>
						))}
					</div>

					<div className="relative w-full sm:max-w-xs">
						<Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search invoices..."
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							className="pl-10"
						/>
					</div>
				</div>

				<Card className="p-0 [--card-spacing:0px]">
					{filteredInvoices.length === 0 ? (
						<div className="flex flex-col items-center px-6 py-14 text-center">
							<span className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
								<FileText className="size-5" />
							</span>
							<h3 className="mt-4 text-base font-medium">No invoices found</h3>
							<p className="mt-1 text-sm text-muted-foreground">
								{searchQuery
									? "Try a different search term"
									: "Create a new invoice to get started"}
							</p>
						</div>
					) : (
						<>
							<div className="max-h-[70vh] overflow-auto">
								<Table>
									<TableHeader className="sticky top-0 z-10 bg-card">
										<TableRow>
											<TableHead className="px-6">Invoice #</TableHead>
											<TableHead className="px-6">Patient</TableHead>
											<TableHead className="px-6">Amount</TableHead>
											<TableHead className="px-6">Status</TableHead>
											<TableHead className="px-6">Due</TableHead>
											<TableHead className="px-6">Created</TableHead>
											<TableHead className="px-6 text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredInvoices.map((invoice) => (
											<TableRow key={invoice.id}>
												<TableCell className="px-6 py-3 font-medium tabular-nums">
													{invoice.id}
												</TableCell>
												<TableCell className="px-6 py-3">
													{patientName(invoice)}
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
														{INVOICE_STATUS[
															invoice.status as keyof typeof INVOICE_STATUS
														] ?? invoice.status}
													</Badge>
												</TableCell>
												<TableCell className="px-6 py-3 text-muted-foreground">
													{invoice.dueDate || "Not set"}
												</TableCell>
												<TableCell className="px-6 py-3 text-muted-foreground">
													<ClientDate dateString={invoice.createdAt} />
												</TableCell>
												<TableCell className="px-6 py-3 text-right">
													<div className="flex items-center justify-end gap-1">
														<Button
															size="icon-sm"
															variant="ghost"
															onClick={() => setEditing(invoice)}
															aria-label={`Edit invoice ${invoice.id}`}
														>
															<Pencil />
														</Button>
														<Button
															size="icon-sm"
															variant="ghost"
															onClick={() => handleDelete(invoice)}
															disabled={deleteInvoice.isPending}
															className="text-destructive hover:text-destructive"
															aria-label={`Delete invoice ${invoice.id}`}
														>
															<Trash2 />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>

							<div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
								<span>
									{filteredInvoices.length} invoice
									{filteredInvoices.length === 1 ? "" : "s"}
								</span>
							</div>
						</>
					)}
				</Card>
			</div>

			{isCreating ? <InvoiceForm onClose={() => setIsCreating(false)} /> : null}

			{editing ? (
				<InvoiceForm invoice={editing} onClose={() => setEditing(null)} />
			) : null}
		</Layout>
	);
};

export default InvoicePage;
