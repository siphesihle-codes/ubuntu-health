import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
	type Appointment,
	APPOINTMENT_TYPES,
	STATUS_COLORS,
	STATUS_LABELS,
} from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAppointmentModal from "../Modals/EditAppointmentModal";
import { API_BASE_URL } from "@/app/api/config";

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

	const token = localStorage.getItem("token");

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/Appointments/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				toast.error("Failed to delete appointment");
				throw new Error("Failed to delete appointment");
			}

			if (onDelete) {
				onDelete(id);
			}

			toast.success("Appointment deleted successfully");
		} catch (error) {
			toast.error("Error deleting appointment");
			console.error("Error deleting appointment:", error);
		}
	};

	const handleEditClick = (appointment: Appointment) => {
		setEditingAppointment(appointment);
		setIsEditModalOpen(true);
	};

	const handleSave = async (updatedAppointment: Appointment) => {
		try {
			const appointmentUpdateDto = {
				patientFirstName: updatedAppointment.patientFirstName,
				patientLastName: updatedAppointment.patientLastName,
				appointmentDate: updatedAppointment.appointmentDate,
				appointmentTime: updatedAppointment.appointmentTime,
				appointmentType: updatedAppointment.appointmentType,
				status: updatedAppointment.status,
				notes: updatedAppointment.notes || "",
			};

			const response = await fetch(
				`${API_BASE_URL}/api/Appointments/${updatedAppointment.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(appointmentUpdateDto),
				}
			);

			if (!response.ok) {
				const errorData = await response.text();
				console.error("API error response:", errorData);
				throw new Error("Failed to update appointment");
			}

			if (onEdit) onEdit(String(updatedAppointment.id));

			setIsEditModalOpen(false);
			toast.success("Appointment updated successfully");
		} catch (error) {
			console.error("Error updating appointment:", error);
			toast.error("Failed to update appointment");
		}
	};

	return (
		<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-700">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Patient Name
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Date
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Time
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Type
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Status
							</th>
							<th scope="col" className="px-6 py-3 font-medium text-gray-700">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{appointments.map((appointment) => (
							<tr
								key={appointment.id}
								className="hover:bg-gray-50 transition-colors"
							>
								<td className="px-6 py-4 font-medium text-gray-900">
									{appointment.patientFirstName} {appointment.patientLastName}
								</td>
								<td className="px-6 py-4 text-gray-500">
									{appointment.appointmentDate}
								</td>
								<td className="px-6 py-4 text-gray-500">
									{appointment.appointmentTime}
								</td>
								<td className="px-6 py-4 text-gray-500">
									{APPOINTMENT_TYPES[appointment.appointmentType]}
								</td>
								<td className="px-6 py-4">
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${
											STATUS_COLORS[appointment.status]
										}`}
									>
										{STATUS_LABELS[appointment.status]}
									</span>
								</td>
								<td className="px-6 py-4">
									<div className="flex gap-4">
										<button
											type="button"
											onClick={() => handleEditClick(appointment)}
											className="text-blue-600 hover:text-blue-800 transition-colors"
											title="Edit Appointment"
										>
											<Pencil size={18} />
										</button>
										<button
											type="button"
											onClick={() => handleDelete(String(appointment.id))}
											className="text-red-600 hover:text-red-800 transition-colors"
											title="Delete Appointment"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Appointment Modal */}
			{isEditModalOpen && editingAppointment && (
				<EditAppointmentModal
					appointment={editingAppointment}
					onSave={handleSave}
					onClose={() => setIsEditModalOpen(false)}
				/>
			)}

			<div className="flex justify-between items-center m-3 text-sm text-gray-600">
				<div>
					Showing 1-{appointments.length} of {appointments.length} appointments
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						className="px-3 py-1 rounded border border-gray-300 bg-white
          hover:bg-gray-50 transition-colors"
					>
						Previous
					</button>
					<button
						type="button"
						className="px-3 py-1 rounded border border-gray-300 bg-white
          hover:bg-gray-50 transition-colors"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default AppointmentsTableCard;
