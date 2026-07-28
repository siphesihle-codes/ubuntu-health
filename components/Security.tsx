import Link from "next/link";
import React from "react";
import { Download, FileSpreadsheet, KeyRound, Scale } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LEGAL } from "@/types";

const commitments = [
	{
		icon: Scale,
		title: "Your practice stays the responsible party",
		description:
			"Under POPIA your practice decides what patient information is captured and why. We act as your operator and process those records only to run the service on your instruction.",
	},
	{
		icon: KeyRound,
		title: "Separated by practice, restricted by role",
		description:
			"Every record belongs to your practice and is only reachable by people you have invited. Roles decide what each person sees, and only an administrator can change them.",
	},
	{
		icon: Download,
		title: "Your data is never held hostage",
		description: `Take a full export of your practice as a JSON file whenever you want it. If you cancel, records stay available for ${LEGAL.retentionDays} days so you have time to take them with you.`,
	},
];

const Security = () => {
	return (
		<section id="security" className="border-b bg-muted/30">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">
						Trust and your records
					</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Patient information deserves a straight answer
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Health information is special personal information under POPIA. Our{" "}
						<Link
							href="/policy"
							className="text-foreground underline underline-offset-4"
						>
							privacy policy
						</Link>{" "}
						sets out in plain terms what we hold, where it is processed and what
						you can ask us for.
					</p>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{commitments.map((commitment) => (
						<Card key={commitment.title}>
							<CardHeader>
								<span className="mb-3 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
									<commitment.icon className="size-5" />
								</span>
								<CardTitle>{commitment.title}</CardTitle>
								<CardDescription>{commitment.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>

				<Card className="mt-6">
					<CardHeader>
						<span className="mb-3 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
							<FileSpreadsheet className="size-5" />
						</span>
						<CardTitle>Bringing your existing records across</CardTitle>
						<CardDescription>
							You do not have to start from an empty system.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
						<p>
							Upload a CSV of your patients and we will read the columns you
							already have: first and last name, ID number, sex, email, phone,
							address, medical aid and membership number. If you are moving from
							another Ubuntu Health practice, a JSON export brings patients,
							appointments, clinical notes, prescriptions and invoices in one
							file.
						</p>
						<p>
							Patients already on file with the same ID number are matched rather
							than duplicated, and nothing already captured is overwritten. Every
							import finishes with a summary of exactly what was created, what
							was matched and what was skipped, so you can check the result
							before you rely on it.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default Security;
