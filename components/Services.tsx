import React from "react";
import {
	ArrowLeftRight,
	CalendarCheck,
	CreditCard,
	MonitorSmartphone,
	NotebookPen,
	Pill,
	Stethoscope,
	Users,
} from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const services = [
	{
		icon: Stethoscope,
		title: "Patient records",
		description:
			"Demographics, ID number, address, medical aid, allergies, current medication and emergency contact in one file that stays current.",
	},
	{
		icon: CalendarCheck,
		title: "Shared diary",
		description:
			"A weekly view every practitioner works from, with filtering per practitioner and booking straight into any day.",
	},
	{
		icon: NotebookPen,
		title: "Clinical notes",
		description:
			"Consultation notes recorded against the patient and tagged with an ICD-10 diagnosis code for later reference.",
	},
	{
		icon: Pill,
		title: "Prescriptions",
		description:
			"Multi-medication scripts with dosage, frequency and repeats, printed with your prescriber details and a signature line.",
	},
	{
		icon: CreditCard,
		title: "Invoicing",
		description:
			"Invoices raised against a patient and a visit, with due dates and statuses from draft through to paid or overdue.",
	},
	{
		icon: Users,
		title: "Staff and roles",
		description:
			"Invite doctors, nurses and reception by email. Each role sees only the part of the practice it needs.",
	},
	{
		icon: ArrowLeftRight,
		title: "Import and export",
		description:
			"Bring patients across by CSV, and take a full JSON export of everything in your practice whenever you want it.",
	},
	{
		icon: MonitorSmartphone,
		title: "Works anywhere",
		description:
			"Runs in the browser on the consulting room PC, the tablet at reception or a phone on call. Light and dark themes included.",
	},
];

function Services() {
	return (
		<section id="services" className="border-b bg-muted/30">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">What is included</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Everything your practice runs on
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Every plan includes all of it. There are no add-on modules and no
						feature held back for a higher tier.
					</p>
				</div>

				<div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{services.map((service) => (
						<Card
							key={service.title}
							className="transition-shadow hover:shadow-lg"
						>
							<CardHeader>
								<span className="mb-3 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
									<service.icon className="size-5" />
								</span>
								<CardTitle>{service.title}</CardTitle>
								<CardDescription>{service.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default Services;
