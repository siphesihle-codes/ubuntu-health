import React, { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useDiary } from "@/hooks/useAppointments";
import { usePractitioners } from "@/hooks/useStaff";
import AppointmentForm from "@/components/Forms/AppointmentForm";
import { APPOINTMENT_TYPES, STATUS_COLORS, STATUS_LABELS } from "@/types";
import type { Appointment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const UNASSIGNED = "unassigned";

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const startOfWeek = (date: Date) => {
	const start = new Date(date);
	const weekday = (start.getDay() + 6) % 7;
	start.setDate(start.getDate() - weekday);
	start.setHours(0, 0, 0, 0);
	return start;
};

const addDays = (date: Date, days: number) => {
	const next = new Date(date);
	next.setDate(next.getDate() + days);
	return next;
};

const weekLabel = (from: Date, to: Date) =>
	`${from.toLocaleDateString("en-ZA", {
		day: "numeric",
		month: "short",
	})} to ${to.toLocaleDateString("en-ZA", {
		day: "numeric",
		month: "short",
		year: "numeric",
	})}`;

const byTime = (a: Appointment, b: Appointment) =>
	(a.appointmentTime ?? "").localeCompare(b.appointmentTime ?? "");

const Diary = () => {
	const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
	const [practitionerFilter, setPractitionerFilter] = useState("all");
	const [bookingDate, setBookingDate] = useState<string | null>(null);

	const weekEnd = addDays(weekStart, 6);
	const from = toIsoDate(weekStart);
	const to = toIsoDate(weekEnd);

	const { data: appointments = [], isPending } = useDiary(from, to);
	const { data: practitioners = [] } = usePractitioners();

	const days = useMemo(
		() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
		[weekStart]
	);

	const visibleAppointments = useMemo(() => {
		if (practitionerFilter === "all") return appointments;

		if (practitionerFilter === UNASSIGNED) {
			return appointments.filter((appointment) => !appointment.practitionerId);
		}

		return appointments.filter(
			(appointment) => appointment.practitionerId === practitionerFilter
		);
	}, [appointments, practitionerFilter]);

	const byDay = useMemo(() => {
		const grouped = new Map<string, Appointment[]>();

		visibleAppointments.forEach((appointment) => {
			const existing = grouped.get(appointment.appointmentDate) ?? [];
			existing.push(appointment);
			grouped.set(appointment.appointmentDate, existing);
		});

		grouped.forEach((entries) => entries.sort(byTime));
		return grouped;
	}, [visibleAppointments]);

	const today = toIsoDate(new Date());

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2">
					<Button
						size="icon-sm"
						variant="outline"
						onClick={() => setWeekStart(addDays(weekStart, -7))}
						aria-label="Previous week"
					>
						<ChevronLeft />
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={() => setWeekStart(startOfWeek(new Date()))}
					>
						This week
					</Button>
					<Button
						size="icon-sm"
						variant="outline"
						onClick={() => setWeekStart(addDays(weekStart, 7))}
						aria-label="Next week"
					>
						<ChevronRight />
					</Button>
					<span className="ml-1 text-sm text-muted-foreground">
						{weekLabel(weekStart, weekEnd)}
					</span>
				</div>

				<Select
					value={practitionerFilter}
					onValueChange={(value) => setPractitionerFilter(value ?? "all")}
				>
					<SelectTrigger className="w-full sm:w-56">
						<SelectValue placeholder="All practitioners" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All practitioners</SelectItem>
						{practitioners.map((practitioner) => (
							<SelectItem key={practitioner.id} value={practitioner.id}>
								{practitioner.name}
							</SelectItem>
						))}
						<SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isPending ? (
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton key={index} className="h-56 rounded-3xl" />
					))}
				</div>
			) : (
				<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
					{days.map((day) => {
						const date = toIsoDate(day);
						const entries = byDay.get(date) ?? [];
						const isToday = date === today;

						return (
							<Card
								key={date}
								size="sm"
								className={`gap-3 ${isToday ? "ring-2 ring-primary/40" : ""}`}
							>
								<div className="flex items-center justify-between gap-2 px-4">
									<div className="flex flex-col">
										<span className="text-xs text-muted-foreground">
											{day.toLocaleDateString("en-ZA", { weekday: "long" })}
										</span>
										<span className="font-heading text-lg font-medium">
											{day.toLocaleDateString("en-ZA", {
												day: "numeric",
												month: "short",
											})}
										</span>
									</div>
									<Button
										size="icon-xs"
										variant="ghost"
										onClick={() => setBookingDate(date)}
										aria-label={`Book on ${date}`}
									>
										<Plus />
									</Button>
								</div>

								<div className="flex flex-col gap-2 px-4 pb-1">
									{entries.length === 0 ? (
										<p className="py-6 text-center text-xs text-muted-foreground">
											Nothing booked
										</p>
									) : (
										entries.map((appointment) => (
											<div
												key={appointment.id}
												className="flex flex-col gap-1 rounded-2xl bg-muted/60 p-3"
											>
												<div className="flex items-center justify-between gap-2">
													<span className="text-xs font-medium tabular-nums">
														{appointment.appointmentTime || "No time"}
													</span>
													<Badge
														className={
															STATUS_COLORS[appointment.status] ??
															"bg-muted text-muted-foreground"
														}
													>
														{STATUS_LABELS[appointment.status] ??
															appointment.status}
													</Badge>
												</div>
												<span className="truncate text-sm font-medium">
													{appointment.patientFirstName}{" "}
													{appointment.patientLastName}
												</span>
												<span className="truncate text-xs text-muted-foreground">
													{appointment.practitionerName || "Unassigned"}
												</span>
												<span className="truncate text-xs text-muted-foreground">
													{APPOINTMENT_TYPES[appointment.appointmentType] ??
														appointment.appointmentType}
												</span>
											</div>
										))
									)}
								</div>
							</Card>
						);
					})}
				</div>
			)}

			{visibleAppointments.length === 0 && !isPending ? (
				<Card>
					<div className="flex flex-col items-center px-6 py-10 text-center">
						<span className="flex size-12 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
							<CalendarDays className="size-5" />
						</span>
						<h3 className="mt-4 text-base font-medium">
							Nothing booked this week
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Every practitioner in the practice shares this diary.
						</p>
					</div>
				</Card>
			) : null}

			{bookingDate ? (
				<AppointmentForm
					initialDate={bookingDate}
					initialPractitionerId={
						practitionerFilter === "all" || practitionerFilter === UNASSIGNED
							? undefined
							: practitionerFilter
					}
					onClose={() => setBookingDate(null)}
				/>
			) : null}
		</div>
	);
};

export default Diary;
