"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { APPOINTMENT_TYPES, STATUS_LABELS } from "@/types";
import {
	Calendar,
	User,
	ClipboardList,
	Clock,
	FileText,
	CalendarCheck,
} from "lucide-react";
import { API_BASE_URL } from "@/app/api/config";

interface AppointmentFormProps {
	onClose: () => void;
}

const AppointmentForm = ({ onClose }: AppointmentFormProps) => {
	const [appointmentType, setAppointmentType] = useState("");
	const [status, setStatus] = useState("");

	const formik = useFormik({
		initialValues: {
			patientFirstName: "",
			patientLastName: "",
			appointmentDate: "",
			appointmentTime: "",
			appointmentType: "",
			status: "scheduled",
			notes: "",
		},
		validationSchema: Yup.object({
			patientFirstName: Yup.string().required("First name is required"),
			patientLastName: Yup.string().required("Last name is required"),
			appointmentDate: Yup.date().required("Appointment date is required"),
			appointmentTime: Yup.string().required("Appointment time is required"),
			appointmentType: Yup.string().required("Appointment type is required"),
			status: Yup.string().required("Appointment status is required"),
		}),
		onSubmit: async (values) => {
			try {
				const token = localStorage.getItem("token");

				console.log("======= APPOINTMENT =======");
				console.log(JSON.stringify(values, null, 2));

				const response = await fetch(`${API_BASE_URL}/api/Appointments`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(values),
				});

				if (!response.ok) {
					throw new Error("Failed to schedule appointment");
				}

				toast.success("Appointment scheduled!");
				formik.resetForm();
				setTimeout(onClose, 1000);
			} catch (err) {
				console.error(`Error scheduling appointment: ${err}`);
				toast.error(`${err}.`);
			}
		},
	});

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div
				className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-3xl w-full
      max-h-[90vh] overflow-y-auto"
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-blue-700 hover:text-gray-700 text-2xl"
				>
					&times;
				</button>

				<form onSubmit={formik.handleSubmit} className="space-y-6">
					<h2
						className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center
          justify-center"
					>
						<Calendar className="mr-2 text-blue-500" size={24} />
						Schedule Appointment
					</h2>

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
									value={formik.values.patientFirstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.patientFirstName &&
									formik.errors.patientFirstName && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.patientFirstName}
										</p>
									)}
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
									value={formik.values.patientLastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.patientLastName &&
									formik.errors.patientLastName && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.patientLastName}
										</p>
									)}
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
									value={appointmentType}
									onChange={(e) => {
										setAppointmentType(e.target.value);
										formik.setFieldValue("appointmentType", e.target.value);
									}}
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
								{formik.touched.appointmentType &&
									formik.errors.appointmentType && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.appointmentType}
										</p>
									)}
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
									value={formik.values.status}
									onChange={(e) => {
										setStatus(e.target.value);
										formik.setFieldValue("status", e.target.value);
									}}
								>
									{Object.entries(STATUS_LABELS).map(([value, label]) => (
										<option key={value} value={value}>
											{label}
										</option>
									))}
								</select>
								{formik.touched.status && formik.errors.status && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.status}
									</p>
								)}
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
									value={formik.values.appointmentDate}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.appointmentDate &&
									formik.errors.appointmentDate && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.appointmentDate}
										</p>
									)}
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
									value={formik.values.appointmentTime}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.appointmentTime &&
									formik.errors.appointmentTime && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.appointmentTime}
										</p>
									)}
							</div>
						</div>
					</div>

					{/* Notes */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<FileText className="mr-2 text-gray-500" size={18} />
							Additional Information
						</div>
						<div>
							<label
								htmlFor="notes"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Notes (Optional)
							</label>
							<textarea
								id="notes"
								name="notes"
								value={formik.values.notes}
								onChange={formik.handleChange}
								rows={3}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							/>
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
							Schedule Appointment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AppointmentForm;
