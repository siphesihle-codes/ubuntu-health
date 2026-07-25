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
	const patientsLength = patients.length;
	const patientsThisWeekLength = patientsThisWeek.length;

	return (
		<div className="space-y-2  ">
			<p>
				Total Patients: <span className="">{patientsLength}</span>
			</p>
			<p>
				New This Week: <span className="">{patientsThisWeekLength}</span>
			</p>
		</div>
	);
};

export default PatientsCard;
