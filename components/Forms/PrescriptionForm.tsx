import React, { useId, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
	Pill,
	User,
	Calendar,
	Plus,
	Trash2,
	ClipboardList,
	FileText,
} from "lucide-react";
import { PRESCRIPTION_STATUS } from "@/types";
import { useCreatePrescription } from "@/hooks/usePrescriptions";

interface PrescriptionFormProps {
	onClose: () => void;
}

export default function PrescriptionForm({ onClose }: PrescriptionFormProps) {
	const [status, setStatus] = useState("active");
	const medicationIdPrefix = useId();
	const medicationCount = useRef(0);
	const createPrescription = useCreatePrescription();

	const formik = useFormik({
		initialValues: {
			patientId: "",
			practitionerId: "1",
			issueDate: new Date().toISOString().split("T")[0],
			endDate: "",
			frequency: "",
			refills: 0,
			status: "active",
			medications: [
				{
					medicationId: medicationIdPrefix,
					name: "",
					dosage: "",
					instructions: "",
				},
			],
			instructions: "",
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Patient ID is required"),
			medications: Yup.array().of(
				Yup.object().shape({
					name: Yup.string().required("Medication name is required"),
					dosage: Yup.string().required("Dosage is required"),
				})
			),
			frequency: Yup.string().required("Frequency is required"),
			issueDate: Yup.date().required("Issue date is required"),
		}),
		onSubmit: (values) => {
			createPrescription.mutate(values, {
				onSuccess: () => {
					toast.success("Prescription created!");
					formik.resetForm();
					setTimeout(onClose, 1000);
				},
				onError: (error) => {
					toast.error(error.message);
				},
			});
		},
	});

	const addMedication = () => {
		medicationCount.current += 1;
		formik.setFieldValue("medications", [
			...formik.values.medications,
			{
				medicationId: `${medicationIdPrefix}-${medicationCount.current}`,
				name: "",
				dosage: "",
				instructions: "",
			},
		]);
	};

	const removeMedication = (index: number) => {
		const medications = [...formik.values.medications];
		medications.splice(index, 1);
		formik.setFieldValue("medications", medications);
	};

	return (
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center
    z-50 p-4"
		>
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

				<form onSubmit={formik.handleSubmit} className="space-y-6">
					<h2
						className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center
          justify-center"
					>
						<Pill className="mr-2 text-blue-500" size={24} />
						New Prescription
					</h2>

					{/* Patient Information */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<User className="mr-2 text-gray-500" size={18} />
							Patient Information
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="patientId"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Patient ID
								</label>
								<input
									type="text"
									id="patientId"
									name="patientId"
									value={formik.values.patientId}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									placeholder="PAT-12345"
								/>
								{formik.touched.patientId && formik.errors.patientId && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.patientId}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Medications */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<Pill className="mr-2 text-gray-500" size={18} />
							Medications
						</div>
						{formik.values.medications.map((med, index) => (
							<div key={med.medicationId} className="mb-4 last:mb-0">
								<div className="flex justify-between items-center mb-2">
									<h2 className="text-sm font-bold text-gray-700">
										Medication #{index + 1}
									</h2>
									{index > 0 && (
										<button
											type="button"
											onClick={() => removeMedication(index)}
											className="text-red-600 hover:text-red-800"
										>
											<Trash2 size={16} />
										</button>
									)}
								</div>
								<div className="grid md:grid-cols-3 gap-4">
									<div>
										<label
											htmlFor={`medications[${index}].name`}
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Name
										</label>
										<input
											type="text"
											id={`medications[${index}].name`}
											name={`medications[${index}].name`}
											value={med.name}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
											placeholder="e.g., Amoxicillin"
										/>
										{formik.touched.medications?.[index]?.name &&
											Array.isArray(formik.errors.medications) &&
											formik.errors.medications[index] &&
											typeof formik.errors.medications[index] === "object" &&
											formik.errors.medications[index] !== null &&
											"name" in
												(formik.errors.medications[index] as object) && (
												<p className="text-red-600 text-xs mt-1">
													{
														(
															formik.errors.medications[index] as {
																name: string;
															}
														).name
													}
												</p>
											)}
									</div>
									<div>
										<label
											htmlFor={`medications[${index}].dosage`}
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Dosage
										</label>
										<input
											type="text"
											id={`medications[${index}].dosage`}
											name={`medications[${index}].dosage`}
											value={med.dosage}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
											placeholder="e.g., 500mg"
										/>
										{formik.touched.medications?.[index]?.dosage &&
											Array.isArray(formik.errors.medications) &&
											formik.errors.medications[index] &&
											typeof formik.errors.medications[index] === "object" &&
											formik.errors.medications[index] !== null &&
											"dosage" in
												(formik.errors.medications[index] as object) && (
												<p className="text-red-600 text-xs mt-1">
													{
														(
															formik.errors.medications[index] as {
																dosage: string;
															}
														).dosage
													}
												</p>
											)}
									</div>
									<div>
										<label
											htmlFor={`medications[${index}].instructions`}
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Instructions
										</label>
										<input
											type="text"
											id={`medications[${index}].instructions`}
											name={`medications[${index}].instructions`}
											value={med.instructions || ""}
											onChange={formik.handleChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                      focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
											placeholder="Special instructions"
										/>
									</div>
								</div>
							</div>
						))}
						<button
							type="button"
							onClick={addMedication}
							className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
						>
							<Plus size={16} className="mr-1" />
							Add another medication
						</button>
					</div>

					{/* Prescription Details */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<ClipboardList className="mr-2 text-gray-500" size={18} />
							Prescription Details
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="frequency"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Frequency
								</label>
								<select
									id="frequency"
									name="frequency"
									value={formik.values.frequency}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select frequency</option>
									<option value="Once daily">Once daily</option>
									<option value="Twice daily">Twice daily</option>
									<option value="Three times daily">Three times daily</option>
									<option value="Four times daily">Four times daily</option>
									<option value="As needed">As needed</option>
								</select>
								{formik.touched.frequency && formik.errors.frequency && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.frequency}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="refills"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Refills
								</label>
								<input
									type="number"
									id="refills"
									name="refills"
									min="0"
									max="10"
									value={formik.values.refills}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
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
									value={status}
									onChange={(e) => {
										setStatus(e.target.value);
										formik.setFieldValue("status", e.target.value);
									}}
								>
									{Object.entries(PRESCRIPTION_STATUS).map(([key, value]) => (
										<option key={key} value={key}>
											{value.toUpperCase()}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{/* Dates */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<Calendar className="mr-2 text-gray-500" size={18} />
							Prescription Dates
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="issueDate"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Issue Date
								</label>
								<input
									type="date"
									id="issueDate"
									name="issueDate"
									value={formik.values.issueDate}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.issueDate && formik.errors.issueDate && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.issueDate}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="endDate"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									End Date (Optional)
								</label>
								<input
									type="date"
									id="endDate"
									name="endDate"
									value={formik.values.endDate}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Additional Instructions */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<div className="flex items-center text-lg font-semibold text-gray-700 mb-4">
							<FileText className="mr-2 text-gray-500" size={18} />
							Additional Information
						</div>
						<div>
							<label
								htmlFor="instructions"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Instructions
							</label>
							<textarea
								id="instructions"
								name="instructions"
								rows={3}
								value={formik.values.instructions}
								onChange={formik.handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Special instructions for the patient..."
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
							<Pill className="mr-2" size={18} />
							Create Prescription
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
