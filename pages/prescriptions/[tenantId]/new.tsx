import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Calendar, Pill, User } from "lucide-react";
import Link from "next/link";
import { useCreatePrescription } from "@/hooks/usePrescriptions";

const NewPrescriptionPage = () => {
	const createPrescription = useCreatePrescription();
	const isSubmitting = createPrescription.isPending;

	const formik = useFormik({
		initialValues: {
			patientId: "",
			medication: "",
			dosage: "",
			frequency: "",
			startDate: "",
			endDate: "",
			instructions: "",
			refills: 0,
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Patient ID is required"),
			medication: Yup.string().required("Medication is required"),
			dosage: Yup.string().required("Dosage is required"),
			frequency: Yup.string().required("Frequency is required"),
			startDate: Yup.date().required("Start date is required"),
		}),
		onSubmit: (values) => {
			createPrescription.mutate(
				{
					patientId: values.patientId,
					practitionerId: "1",
					endDate: values.endDate,
					frequency: values.frequency,
					refills: values.refills,
					status: "active",
					instructions: values.instructions,
					medications: [
						{
							name: values.medication,
							dosage: values.dosage,
							instructions: values.instructions,
						},
					],
				},
				{
					onSuccess: () => {
						toast.success("Prescription created successfully!");
						formik.resetForm();
					},
					onError: (error) => {
						toast.error(error.message);
					},
				}
			);
		},
	});

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-2xl font-bold text-gray-800">
							New Prescription
						</h1>
						<p className="text-gray-600 mt-1">
							Create a new medication prescription
						</p>
					</div>
					<Link
						href="/prescriptions"
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700
            hover:bg-gray-50 transition-colors"
					>
						Back to Prescriptions
					</Link>
				</div>

				{/* Form */}
				<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
					<form onSubmit={formik.handleSubmit} className="space-y-6">
						{/* Patient Information */}
						<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
							<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
								<User size={18} className="text-gray-500" />
								Patient Information
							</h2>

							<div className="grid md:grid-cols-2 gap-6">
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
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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

						{/* Medication Details */}
						<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
							<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
								<Pill size={18} className="text-gray-500" />
								Medication Details
							</h2>

							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="medication"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Medication Name
									</label>
									<input
										type="text"
										id="medication"
										name="medication"
										value={formik.values.medication}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
										placeholder="e.g., Amoxicillin"
									/>
									{formik.touched.medication && formik.errors.medication && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.medication}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="dosage"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Dosage
									</label>
									<input
										type="text"
										id="dosage"
										name="dosage"
										value={formik.values.dosage}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
										placeholder="e.g., 500mg"
									/>
									{formik.touched.dosage && formik.errors.dosage && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.dosage}
										</p>
									)}
								</div>

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
										className="w-full p-3 border rounded-md focus:outline-none focus:ring-2
                    focus:ring-cyan-500/50"
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
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>

							<div className="mt-6">
								<label
									htmlFor="instructions"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Additional Instructions
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

						{/* Dates */}
						<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
							<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
								<Calendar size={18} className="text-gray-500" />
								Prescription Dates
							</h2>

							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="startDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Start Date
									</label>
									<input
										type="date"
										id="startDate"
										name="startDate"
										value={formik.values.startDate}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
									{formik.touched.startDate && formik.errors.startDate && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.startDate}
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
										className="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
							</div>
						</div>

						{/* Form Actions */}
						<div className="flex justify-end gap-4 pt-4">
							<button
								type="button"
								onClick={() => formik.resetForm()}
								className="px-6 py-2 border border-gray-300 rounded-md text-gray-700
                hover:bg-gray-50 transition-colors"
							>
								Reset
							</button>
							<button
								type="submit"
								disabled={isSubmitting}
								className="px-6 py-2 bg-blue-600 rounded-md text-white font-medium
                hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Creating..." : "Create Prescription"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewPrescriptionPage;
