import React from "react";
import {
	AlertCircle,
	Calendar,
	ChevronRight,
	CreditCard,
	Pill,
	Plus,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import { usePatients } from "@/hooks/usePatients";
import { usePrescriptions } from "@/hooks/usePrescriptions";
import { useAppointments } from "@/hooks/useAppointments";
import { useInvoices } from "@/hooks/useInvoices";
import { INVOICE_STATUS_COLORS, STATUS_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toIsoDate } from "@/lib/utils";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const currency = (amount: number) =>
	`R${amount.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

const initials = (firstName: string, lastName: string) =>
	`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

const EmptyState = ({ message }: { message: string }) => (
	<p className="py-8 text-center text-sm text-muted-foreground">{message}</p>
);

const DashboardPage = () => {
	const { tenantId } = useRouter().query as { tenantId: string };

	const { data: patients = [] } = usePatients();
	const { data: prescriptions = [] } = usePrescriptions();
	const { data: appointments = [] } = useAppointments();
	const { data: invoices = [] } = useInvoices();

	const upcoming = appointments
		.filter((appointment) => appointment.appointmentDate >= toIsoDate(new Date()))
		.sort((a, b) =>
			`${a.appointmentDate} ${a.appointmentTime ?? ""}`.localeCompare(
				`${b.appointmentDate} ${b.appointmentTime ?? ""}`
			)
		);

	const stats = {
		patients: patients.length,
		appointments: appointments.length,
		prescriptions: prescriptions.length,
		revenue: invoices
			.filter((invoice) => invoice.status === "paid")
			.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
		pendingPayments: invoices
			.filter((invoice) => invoice.status !== "paid")
			.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
	};

	const summaryCards = [
		{
			label: "Total patients",
			value: stats.patients.toLocaleString(),
			icon: Users,
			href: `/patients/${tenantId}`,
		},
		{
			label: "Appointments",
			value: stats.appointments.toLocaleString(),
			icon: Calendar,
			href: `/appointments/${tenantId}`,
		},
		{
			label: "Active prescriptions",
			value: stats.prescriptions.toLocaleString(),
			icon: Pill,
			href: `/prescriptions/${tenantId}`,
		},
		{
			label: "Revenue collected",
			value: currency(stats.revenue),
			icon: CreditCard,
			href: `/invoices/${tenantId}`,
		},
	];

	const financials = [
		{
			label: "Total revenue",
			value: currency(stats.revenue),
			icon: TrendingUp,
			tone: "text-success",
		},
		{
			label: "Pending payments",
			value: currency(stats.pendingPayments),
			icon: CreditCard,
			tone: "text-warning",
		},
		{
			label: "Outstanding invoices",
			value: invoices.filter((invoice) => invoice.status !== "paid").length,
			icon: AlertCircle,
			tone: "text-destructive",
		},
	];

	return (
		<Layout
			title="Dashboard"
			description="Overview of your practice"
			actions={
				<Button size="sm" render={<Link href={`/patients/${tenantId}`} />}>
					<Plus />
					New patient
				</Button>
			}
		>
			<div className="flex max-w-7xl flex-col gap-6">
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{summaryCards.map((card) => (
						<Link key={card.label} href={card.href} className="group">
							<Card
								size="sm"
								className="transition-shadow group-hover:shadow-lg"
							>
								<CardContent className="flex items-center justify-between gap-4">
									<div className="flex min-w-0 flex-col gap-1">
										<span className="truncate text-xs text-muted-foreground">
											{card.label}
										</span>
										<span className="font-heading text-2xl font-semibold tracking-tight">
											{card.value}
										</span>
									</div>
									<span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
										<card.icon className="size-5" />
									</span>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card className="lg:col-span-1">
						<CardHeader>
							<CardTitle>Recent patients</CardTitle>
							<CardAction>
								<Button
									variant="ghost"
									size="xs"
									render={<Link href={`/patients/${tenantId}`} />}
								>
									View all
									<ChevronRight data-icon="inline-end" />
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent className="max-h-96 overflow-y-auto">
							{patients.length === 0 ? (
								<EmptyState message="No patients yet" />
							) : (
								<ul className="flex flex-col gap-1">
									{patients
										.slice()
										.reverse()
										.slice(0, 8)
										.map((patient) => (
											<li key={patient.id}>
												<Link
													href={`/patients/${tenantId}/${patient.id}`}
													className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
												>
													<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
														{initials(patient.firstName, patient.lastName)}
													</span>
													<div className="flex min-w-0 flex-col">
														<span className="truncate text-sm font-medium">
															{patient.firstName} {patient.lastName}
														</span>
														<span className="truncate text-xs text-muted-foreground">
															{patient.medicalAidName ?? "No medical aid"}
														</span>
													</div>
												</Link>
											</li>
										))}
								</ul>
							)}
						</CardContent>
					</Card>

					<Card className="lg:col-span-1">
						<CardHeader>
							<CardTitle>Upcoming appointments</CardTitle>
							<CardAction>
								<Button
									variant="ghost"
									size="xs"
									render={<Link href={`/appointments/${tenantId}`} />}
								>
									View all
									<ChevronRight data-icon="inline-end" />
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent className="max-h-96 overflow-y-auto">
							{upcoming.length === 0 ? (
								<EmptyState message="No appointments scheduled" />
							) : (
								<ul className="flex flex-col gap-1">
									{upcoming.slice(0, 8).map((appointment) => (
										<li
											key={appointment.id}
											className="flex items-start justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
										>
											<div className="flex min-w-0 flex-col gap-1">
												<span className="truncate text-sm font-medium">
													{appointment.patientFirstName}{" "}
													{appointment.patientLastName}
												</span>
												<span className="text-xs text-muted-foreground">
													{STATUS_LABELS[appointment.status]}
												</span>
											</div>
											<div className="flex shrink-0 flex-col items-end text-xs">
												<ClientDate dateString={appointment.appointmentDate} />
												<span className="text-muted-foreground">
													{appointment.appointmentTime || "No time"}
												</span>
											</div>
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>

					<Card className="lg:col-span-1">
						<CardHeader>
							<CardTitle>Recent invoices</CardTitle>
							<CardAction>
								<Button
									variant="ghost"
									size="xs"
									render={<Link href={`/invoices/${tenantId}`} />}
								>
									View all
									<ChevronRight data-icon="inline-end" />
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent className="max-h-96 overflow-y-auto">
							{invoices.length === 0 ? (
								<EmptyState message="No invoices yet" />
							) : (
								<ul className="flex flex-col gap-1">
									{invoices.slice(0, 8).map((invoice) => (
										<li
											key={invoice.id}
											className="flex items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted"
										>
											<div className="flex min-w-0 flex-col gap-1">
												<span className="truncate text-sm font-medium">
													Invoice #{invoice.id}
												</span>
												<span className="text-xs text-muted-foreground">
													<ClientDate dateString={invoice.createdAt ?? ""} />
												</span>
											</div>
											<div className="flex shrink-0 flex-col items-end gap-1">
												<span className="text-sm font-medium">
													{currency(invoice.totalAmount)}
												</span>
												<Badge
													className={
														INVOICE_STATUS_COLORS[invoice.status] ??
														"bg-muted text-muted-foreground"
													}
												>
													{invoice.status}
												</Badge>
											</div>
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Financial overview</CardTitle>
						<CardDescription>
							Billing performance across your practice
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-3">
							{financials.map((item) => (
								<div
									key={item.label}
									className="flex flex-col gap-2 rounded-md bg-muted/50 p-4"
								>
									<div className="flex items-center justify-between">
										<span className="text-xs text-muted-foreground">
											{item.label}
										</span>
										<item.icon className={`size-4 ${item.tone}`} />
									</div>
									<span
										className={`font-heading text-2xl font-semibold tracking-tight ${item.tone}`}
									>
										{item.value}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default DashboardPage;
