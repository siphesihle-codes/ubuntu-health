import React from "react";
import { Calendar, FileText, Pill, Stethoscope } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const services = [
	{
		icon: Stethoscope,
		title: "Patient management",
		description:
			"Demographics, medical history and treatment plans in one record that stays current.",
	},
	{
		icon: Calendar,
		title: "Appointment scheduling",
		description:
			"Flexible booking with automated reminders for both practitioners and patients.",
	},
	{
		icon: Pill,
		title: "E-prescriptions",
		description:
			"Issue electronic scripts in seconds, reducing errors and repeat admin.",
	},
	{
		icon: FileText,
		title: "Invoicing",
		description:
			"Generate invoices and track payments without leaving the patient file.",
	},
];

function Services() {
	return (
		<section id="services" className="border-b bg-muted/30">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">What we offer</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Everything your practice runs on
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Four essentials, designed to work together rather than as bolted-on
						modules.
					</p>
				</div>

				<div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{services.map((service) => (
						<Card
							key={service.title}
							className="transition-shadow hover:shadow-lg"
						>
							<CardHeader>
								<span className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
									<service.icon className="size-5" />
								</span>
								<CardTitle>{service.title}</CardTitle>
								<CardDescription>{service.description}</CardDescription>
							</CardHeader>
							<CardContent />
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}

export default Services;
