import React from "react";
import { ChevronDown } from "lucide-react";
import { LEGAL, SUPPORT_EMAIL, TRIAL_LENGTH_DAYS } from "@/types";

const questions = [
	{
		question: "Is there anything to install on the practice computers?",
		answer:
			"No. Ubuntu Health runs in the browser, so any machine that can open a website can run it: the consulting room PC, the tablet at reception, or a phone when you are on call. Scripts print straight from the browser using your existing printer.",
	},
	{
		question: "Can I bring my existing patient records across?",
		answer:
			"Yes. Upload a CSV of your patients and we will match the columns you already have, including ID number, medical aid and membership number. Patients with the same ID number are matched rather than duplicated, and you get a summary of everything created and skipped before you rely on it.",
	},
	{
		question: "Can reception see clinical notes and prescriptions?",
		answer:
			"No. A receptionist works with patients, the diary and invoices. Prescriptions are limited to doctors and nurses, and only an administrator can manage staff, roles and the subscription.",
	},
	{
		question: "Do I pay for reception and nursing staff?",
		answer:
			"No. Plans are priced per practitioner. Reception and nursing staff are unlimited on every plan, so growing your front desk never changes your bill.",
	},
	{
		question: `What happens when the ${TRIAL_LENGTH_DAYS}-day trial ends?`,
		answer:
			"Nothing is deleted. You choose a plan to carry on working, and if you decide against it your records stay available so you can export them before you go.",
	},
	{
		question: "Can I get my data out if I leave?",
		answer: `Yes, at any time. A single export gives you a JSON file containing your patients, appointments, clinical notes, prescriptions and invoices. After a cancellation we keep your records for ${LEGAL.retentionDays} days so there is no rush to do it on the last day.`,
	},
	{
		question: "Is this built for South African practices specifically?",
		answer:
			"Yes. Patient files carry South African ID numbers, medical aid schemes and membership numbers. Printed scripts carry the prescriber's HPCSA number and a signature and practice stamp line. Money is in rands throughout, and our privacy terms are written against POPIA rather than adapted from somewhere else.",
	},
];

const Faq = () => {
	return (
		<section id="faq" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">Questions</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						The things practices ask us first
					</h2>
				</div>

				<div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
					{questions.map((item) => (
						<details
							key={item.question}
							className="group rounded-md bg-card ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
								{item.question}
								<ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
							</summary>
							<p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
								{item.answer}
							</p>
						</details>
					))}
				</div>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					Something we have not covered?{" "}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className="text-foreground underline-offset-4 hover:underline"
					>
						{SUPPORT_EMAIL}
					</a>
				</p>
			</div>
		</section>
	);
};

export default Faq;
