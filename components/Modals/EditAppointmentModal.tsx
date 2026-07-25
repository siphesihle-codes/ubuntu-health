import React, { useState } from "react";
import { Appointment, APPOINTMENT_TYPES, STATUS_LABELS } from "@/types";
import {
	Calendar,
	User,
	ClipboardList,
	Clock,
	FileText,
	CalendarCheck,
} from "lucide-react";

interface EditAppointmentModalProps {
	appointment: Appointment;
	onSave: (updatedAppointment: Appointment) => void;
	onClose: () => void;
}

const EditAppointmentModal = ({
	appointment,
	onSave,
	onClose,
}: EditAppointmentModalProps) => {
	const [formData, setFormData] = useState<Appointment>({ ...appointment });

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onSave(formData);
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-3xl w-full
          max-h-[90vh] overflow-y-auto"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 text-blue-700 hover:text-gray-700 text-2xl"
				>
					&times;
				</button>

				<form onSubmit={handleSubmit} className="space-y-6">
					<h2
						className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center
              justify-center"
					>
						<Calendar className="mr-2 text-blue-500" size={24} />
						Edit Appointment
					</h2>

					{/* Hidden ID field to ensure it's preserved */}
					<input type="hidden" name="id" value={formData.id} />

					{/* Patient Name */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<User className="mr-2 text-gray-500" size={18} />
							Patient Information
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="patientFirstName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									First Name
								</label>
								<input
									type="text"
									id="patientFirstName"
									name="patientFirstName"
									value={formData.patientFirstName}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="patientLastName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Last Name
								</label>
								<input
									type="text"
									id="patientLastName"
									name="patientLastName"
									value={formData.patientLastName}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Appointment Details */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<ClipboardList className="mr-2 text-gray-500" size={18} />
							Appointment Details
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="appointmentType"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Appointment Type
								</label>
								<select
									id="appointmentType"
									name="appointmentType"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									value={formData.appointmentType}
									onChange={handleChange}
								>
									<option value="" disabled>
										Select appointment type
									</option>
									{Object.entries(APPOINTMENT_TYPES).map(([key, label]) => (
										<option key={key} value={key}>
											{label.toUpperCase()}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="status"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Status
								</label>
								<select
									id="status"
									name="status"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									value={formData.status}
									onChange={handleChange}
								>
									{Object.entries(STATUS_LABELS).map(([value, label]) => (
										<option key={value} value={value}>
											{label}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* Date and Time */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<Clock className="mr-2 text-gray-500" size={18} />
							Date & Time
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="appointmentDate"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Appointment Date
								</label>
								<input
									type="date"
									id="appointmentDate"
									name="appointmentDate"
									value={formData.appointmentDate}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="appointmentTime"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Appointment Time
								</label>
								<input
									type="time"
									id="appointmentTime"
									name="appointmentTime"
									value={formData.appointmentTime}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-center gap-4 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-2 border border-gray-300 rounded-md text-gray-700
                  hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-2 bg-blue-600 rounded-md text-white font-medium
                  hover:bg-blue-700 transition-colors flex items-center"
						>
							<CalendarCheck className="mr-2" size={18} />
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditAppointmentModal;
