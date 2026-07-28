import React from "react";
import { Boxes, FileWarning, Search } from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TRIAL_LENGTH_DAYS } from "@/types";

const problems = [
	{
		icon: FileWarning,
		title: "Paper files that only exist in one room",
		description:
			"A folder can only be in one place at a time. If it is on someone else's desk, in a car, or simply misfiled, the consultation starts without a history.",
	},
	{
		icon: Boxes,
		title: "A different system for every job",
		description:
			"The diary lives in one book, scripts in a pad, invoices in a spreadsheet. Nothing reconciles, and every handover means retyping the same patient details.",
	},
	{
		icon: Search,
		title: "Questions that take an afternoon",
		description:
			"Who has not paid? What did we prescribe in March? How many patients did we see last week? Simple questions turn into a filing cabinet search.",
	},
];

const stats = [
	{ value: `${TRIAL_LENGTH_DAYS} days`, label: "Free trial, no card required" },
	{ value: "Unlimited", label: "Reception and nursing staff on every plan" },
	{ value: "One click", label: "Export everything you have put in" },
];

const Mission = () => {
	return (
		<section id="about" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">Why we built this</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						The admin tax on a small practice is enormous
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Most independent practices in South Africa are still held together by
						paper files, a desk diary and a spreadsheet. It works, right up until
						it does not.
					</p>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{problems.map((problem) => (
						<Card key={problem.title}>
							<CardHeader>
								<span className="mb-3 flex size-11 items-center justify-center rounded-md bg-destructive/10 text-destructive">
									<problem.icon className="size-5" />
								</span>
								<CardTitle>{problem.title}</CardTitle>
								<CardDescription>{problem.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>

				<div className="mx-auto mt-16 max-w-2xl text-center">
					<h3 className="text-2xl font-semibold sm:text-3xl">
						Software that stays out of the way
					</h3>
					<p className="mt-4 text-base text-muted-foreground">
						We build for family doctors, general practitioners and small clinics.
						That means no modules you will never open, no implementation project,
						and no contract that holds your records hostage. You sign up, you
						import what you have, and you work.
					</p>
				</div>

				<dl className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-3">
					{stats.map((stat) => (
						<div key={stat.label} className="flex flex-col items-center gap-1">
							<dt className="font-heading text-3xl font-semibold tracking-tight">
								{stat.value}
							</dt>
							<dd className="text-center text-sm text-muted-foreground">
								{stat.label}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
};

export default Mission;
