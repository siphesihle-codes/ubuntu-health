import { Appointment, STATUS_COLORS } from "@/types";
import React from "react";
import { Badge } from "@/components/ui/badge";

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
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<span className="text-xs text-muted-foreground">
					Today&apos;s appointments
				</span>
				<span className="font-heading text-2xl font-semibold tracking-tight">
					{appointments.length}
				</span>
			</div>
			<div className="flex flex-wrap gap-2">
				<Badge className={STATUS_COLORS.scheduled}>
					Scheduled: {scheduledCount}
				</Badge>
				<Badge className={STATUS_COLORS.inProgress}>
					In progress: {inProgressCount}
				</Badge>
			</div>
		</div>
	);
};

export default AppointmentsCard;
