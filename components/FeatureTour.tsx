import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
	{
		eyebrow: "The diary",
		title: "One week, every practitioner, one screen",
		description:
			"The diary is shared across the practice rather than split per person. Reception books into it, practitioners work off it, and nobody has to ask whether a slot is free.",
		points: [
			"A full week at a glance, with today outlined so you never lose your place",
			"Filter down to a single practitioner, or show everything that is unassigned",
			"Book straight into any day without leaving the week you are looking at",
			"Sixteen appointment types, from initial consultation to post-operative follow-up",
			"Statuses that match how rooms actually run: scheduled, confirmed, checked in, in progress, completed, cancelled, no show",
		],
		image: "/screens/diary.png",
		alt: "The shared weekly diary showing appointments across seven days with practitioner filtering",
	},
	{
		eyebrow: "The patient file",
		title: "Everything about a patient, without opening four things",
		description:
			"One record holds the demographics, the cover details, the clinical history and the money. Open a patient and the full picture is already there.",
		points: [
			"ID number, contact details and full address captured once",
			"Medical aid scheme and membership number kept alongside the file",
			"Allergies and current medication surfaced where they matter, including on the printed script",
			"Emergency contact and relationship recorded for when it counts",
			"Visits, clinical notes with ICD-10 diagnosis codes, prescriptions and invoices all attached to the same patient",
		],
		image: "/screens/patient-file.png",
		alt: "A patient record showing demographics, medical aid details, allergies, visits and clinical notes",
	},
	{
		eyebrow: "Prescriptions",
		title: "Write the script, print it signed and ready",
		description:
			"Build a prescription with as many medications as the patient needs, then print a script that a pharmacy will accept without a phone call to confirm what it says.",
		points: [
			"Multiple medications on one script, each with its own dosage and instructions",
			"Frequency, repeats and a validity date recorded on the prescription itself",
			"The printed script carries your practice name, the patient's ID number and their allergies",
			"Prescriber name and HPCSA number printed with a signature and practice stamp line",
			"Prints straight from the browser, so there is nothing to install on the practice PC",
		],
		image: "/screens/prescription.png",
		alt: "A printable prescription script showing practice header, patient details, medications and prescriber signature line",
	},
	{
		eyebrow: "Billing",
		title: "Know what you are owed without a spreadsheet",
		description:
			"Invoices are raised against the patient and the visit they belong to, so the billing picture and the clinical picture never drift apart.",
		points: [
			"Raise an invoice from the patient file, with a due date and notes",
			"Statuses that reflect reality: draft, pending, paid, partially paid, overdue and cancelled",
			"Revenue collected, payments still pending and the count of outstanding invoices on the dashboard",
			"Every amount in rands, formatted the way South African patients expect to read it",
		],
		image: "/screens/invoices.png",
		alt: "The invoices screen showing invoice numbers, patients, amounts in rands and payment statuses",
	},
];

const FeatureTour = () => {
	return (
		<section id="tour" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">A closer look</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						What a day in the practice looks like
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Four screens carry almost all of the work. Here is what each one
						does.
					</p>
				</div>

				<div className="mt-16 flex flex-col gap-20 lg:gap-28">
					{features.map((feature, index) => (
						<div
							key={feature.title}
							className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
						>
							<div
								className={cn(
									"flex flex-col",
									index % 2 === 1 && "lg:order-2"
								)}
							>
								<Badge variant="secondary" className="w-fit">
									{feature.eyebrow}
								</Badge>

								<h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
									{feature.title}
								</h3>

								<p className="mt-4 text-base text-muted-foreground">
									{feature.description}
								</p>

								<ul className="mt-6 flex flex-col gap-3">
									{feature.points.map((point) => (
										<li key={point} className="flex items-start gap-3">
											<span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
												<Check className="size-3" />
											</span>
											<span className="text-sm">{point}</span>
										</li>
									))}
								</ul>
							</div>

							<div
								className={cn(
									"relative aspect-16/10 w-full overflow-hidden rounded-md bg-card shadow-lg ring-1 ring-foreground/10",
									index % 2 === 1 && "lg:order-1"
								)}
							>
								<Image
									src={feature.image}
									alt={feature.alt}
									fill
									className="object-cover object-top"
									sizes="(max-width: 1024px) 100vw, 544px"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeatureTour;
