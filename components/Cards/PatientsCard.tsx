import React from "react";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { Patient } from "@/types";

interface PatientsCardProps {
	patients: Patient[];
}

const PatientsCard = ({ patients }: PatientsCardProps) => {
	const now = new Date();
	const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
	const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
	const patientsThisWeek = patients.filter((patient) =>
		isWithinInterval(new Date(patient.createdAt ?? now), {
			start: startOfCurrentWeek,
			end: endOfCurrentWeek,
		})
	);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<span className="text-xs text-muted-foreground">Total patients</span>
				<span className="font-heading text-2xl font-semibold tracking-tight">
					{patients.length}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-xs text-muted-foreground">New this week</span>
				<span className="font-heading text-2xl font-semibold tracking-tight text-primary">
					{patientsThisWeek.length}
				</span>
			</div>
		</div>
	);
};

export default PatientsCard;
