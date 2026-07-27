import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
	type Appointment,
	APPOINTMENT_TYPES,
	STATUS_COLORS,
	STATUS_LABELS,
} from "@/types";
import { toast } from "sonner";
import ClientDate from "../ClientDate";
import EditAppointmentModal from "../Modals/EditAppointmentModal";
import {
	useDeleteAppointment,
	useUpdateAppointment,
} from "@/hooks/useAppointments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface AppointmentsCardProps {
	appointments: Appointment[];
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
}

const AppointmentsTableCard = ({
	appointments,
	onDelete,
	onEdit,
}: AppointmentsCardProps) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingAppointment, setEditingAppointment] =
		useState<Appointment | null>(null);

	const deleteAppointment = useDeleteAppointment();
	const updateAppointment = useUpdateAppointment();

	const handleDelete = (id: string) => {
		deleteAppointment.mutate(id, {
			onSuccess: () => {
				onDelete?.(id);
				toast.success("Appointment deleted successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	const handleEditClick = (appointment: Appointment) => {
		setEditingAppointment(appointment);
		setIsEditModalOpen(true);
	};

	const handleSave = (updatedAppointment: Appointment) => {
		updateAppointment.mutate(updatedAppointment, {
			onSuccess: () => {
				onEdit?.(String(updatedAppointment.id));
				setIsEditModalOpen(false);
				toast.success("Appointment updated successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	return (
		<Card className="p-0 [--card-spacing:0px]">
			<div className="max-h-[70vh] overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-card">
						<TableRow>
							<TableHead className="px-6">Patient</TableHead>
							<TableHead className="px-6">Date</TableHead>
							<TableHead className="px-6">Time</TableHead>
							<TableHead className="px-6">Type</TableHead>
							<TableHead className="px-6">Status</TableHead>
							<TableHead className="px-6 text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{appointments.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="px-6 py-12 text-center text-muted-foreground"
								>
									No appointments found
								</TableCell>
							</TableRow>
						) : (
							appointments.map((appointment) => (
								<TableRow key={appointment.id}>
									<TableCell className="px-6 py-3 font-medium">
										{appointment.patientFirstName} {appointment.patientLastName}
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										<ClientDate dateString={appointment.appointmentDate} />
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{appointment.appointmentTime}
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{APPOINTMENT_TYPES[appointment.appointmentType]}
									</TableCell>
									<TableCell className="px-6 py-3">
										<Badge className={STATUS_COLORS[appointment.status]}>
											{STATUS_LABELS[appointment.status]}
										</Badge>
									</TableCell>
									<TableCell className="px-6 py-3 text-right">
										<div className="flex justify-end gap-1">
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => handleEditClick(appointment)}
												aria-label="Edit appointment"
											>
												<Pencil />
											</Button>
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => handleDelete(String(appointment.id))}
												disabled={deleteAppointment.isPending}
												className="text-destructive hover:text-destructive"
												aria-label="Delete appointment"
											>
												<Trash2 />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
				<span>
					{appointments.length} appointment
					{appointments.length === 1 ? "" : "s"}
				</span>
			</div>

			{isEditModalOpen && editingAppointment ? (
				<EditAppointmentModal
					appointment={editingAppointment}
					onSave={handleSave}
					onClose={() => setIsEditModalOpen(false)}
				/>
			) : null}
		</Card>
	);
};

export default AppointmentsTableCard;
