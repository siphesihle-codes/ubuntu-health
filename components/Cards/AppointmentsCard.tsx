import { Appointment } from "@/types";
import React from "react";

interface AppointmentsCardProps {
	appointments: Appointment[];
}

const AppointmentsCard = ({ appointments }: AppointmentsCardProps) => {
	const scheduledCount = appointments.filter(
		(a) => a.status === "scheduled"
	).length;
	const inProgressCount = appointments.filter(
		(a) => a.status === "inProgress"
	).length;

	return (
		<div className="space-y-2  ">
			<p>
				Todays Appointments: <span className="">{appointments.length}</span>
			</p>
			<div className="flex justify-between">
				<span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">
					Scheduled: {scheduledCount}
				</span>
				<span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
					In Progress:{inProgressCount}
				</span>
			</div>
		</div>
	);
};

export default AppointmentsCard;
