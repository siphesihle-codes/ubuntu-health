import React from "react";
import { Check, Minus } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/types";
import type { Role } from "@/types";

const roles = Object.keys(ROLE_LABELS) as Role[];

const modules: { name: string; roles: Role[] }[] = [
	{
		name: "Dashboard",
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Appointments and diary",
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Patient records",
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Prescriptions",
		roles: ["admin", "doctor", "nurse"],
	},
	{
		name: "Invoices",
		roles: ["admin", "receptionist"],
	},
	{
		name: "Staff administration",
		roles: ["admin"],
	},
	{
		name: "Subscription and billing",
		roles: ["admin"],
	},
];

const Roles = () => {
	return (
		<section id="roles" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">Your team</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Everyone sees the part of the practice they need
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Invite staff by email and give them a role. Reception can run the
						diary and the invoices without ever opening a prescription, and only
						an administrator can change who has access.
					</p>
				</div>

				<div className="mx-auto mt-12 max-w-4xl">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{roles.map((role) => (
							<div
								key={role}
								className="flex flex-col gap-1 rounded-md bg-muted/50 p-4"
							>
								<span className="font-heading text-sm font-medium">
									{ROLE_LABELS[role]}
								</span>
								<span className="text-xs text-muted-foreground">
									{ROLE_DESCRIPTIONS[role]}
								</span>
							</div>
						))}
					</div>

					<div className="mt-8 overflow-x-auto rounded-md ring-1 ring-foreground/10">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="min-w-48">Area</TableHead>
									{roles.map((role) => (
										<TableHead key={role} className="text-center">
											{ROLE_LABELS[role]}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{modules.map((module) => (
									<TableRow key={module.name}>
										<TableCell className="font-medium">{module.name}</TableCell>
										{roles.map((role) => (
											<TableCell key={role}>
												<span className="flex justify-center">
													{module.roles.includes(role) ? (
														<span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success">
															<Check className="size-3" />
															<span className="sr-only">
																{ROLE_LABELS[role]} has access to{" "}
																{module.name}
															</span>
														</span>
													) : (
														<span className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground">
															<Minus className="size-3" />
															<span className="sr-only">
																{ROLE_LABELS[role]} has no access to{" "}
																{module.name}
															</span>
														</span>
													)}
												</span>
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Practitioner seats are what you pay for. Reception and nursing staff
						are unlimited on every plan.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Roles;
