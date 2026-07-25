import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
	User,
	MapPin,
	Users,
	PillBottle,
	ClipboardList,
	UserRoundPen,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "@/lib/api/config";

interface PatientFormProps {
	onClose: () => void;
}

export default function PatientForm({ onClose }: PatientFormProps) {
	const [sex, setSex] = useState("");
	const [currentMeds, setCurrentMeds] = useState("");

	const formik = useFormik({
		initialValues: {
			tenantId: "",
			firstName: "",
			lastName: "",
			idNumber: "",
			sex: "",
			email: "",
			phone: "",
			street: "",
			streetTwo: "",
			city: "",
			province: "",
			postalCode: "",
			allergies: "",
			currentMedication: "",
			emergencyContactFirstName: "",
			emergencyContactLastName: "",
			emergencyContactPhone: "",
			emergencyContactRelationship: "",
			medicalAidName: "",
			membershipNumber: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(20, "Name must be 20 characters or less.")
				.required("First Name is required."),
			lastName: Yup.string()
				.max(20, "Name must be 20 characters or less.")
				.required("Last Name is required."),
			email: Yup.string()
				.email("Invalid email address.")
				.required("E-Mail is required."),
		}),
		onSubmit: async (values) => {
			try {
				const token = localStorage.getItem("token");

				console.log("======= VALUES =======");
				console.log(JSON.stringify(values, null, 2));

				const response = await fetch(`${API_BASE_URL}/api/Patients`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(values),
				});

				if (!response.ok) {
					throw new Error("Failed to register patient");
				}

				toast.success("Patient Registered!");
				formik.resetForm();
				setTimeout(onClose, 1000);
			} catch (err) {
				console.error(`Error submitting form: ${err}.`);
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
						<UserRoundPen className="mr-2 text-blue-500" size={24} />
						Patient Registration
					</h2>

					{/* Personal Information */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<User className="mr-2 text-gray-500" size={18} />
							Personal Information
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							{/* First Name */}
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									First Name *
								</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									placeholder="John"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.firstName && formik.errors.firstName && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.firstName}
									</p>
								)}
							</div>

							{/* Last Name */}
							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Last Name *
								</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									placeholder="Doe"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.lastName && formik.errors.lastName && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.lastName}
									</p>
								)}
							</div>

							{/* ID Number */}
							<div>
								<label
									htmlFor="idNumber"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									ID Number
								</label>
								<input
									type="text"
									name="idNumber"
									id="idNumber"
									value={formik.values.idNumber}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Sex */}
							<div>
								<label
									htmlFor="sex"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Sex *
								</label>
								<select
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									value={sex}
									onChange={(e) => {
										setSex(e.target.value);
										formik.setFieldValue("sex", e.target.value);
									}}
								>
									<option value="">Select Sex</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>

							{/* Phone Number */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Phone Number
								</label>
								<input
									type="text"
									name="phone"
									id="phone"
									value={formik.values.phone}
									onChange={formik.handleChange}
									placeholder="000 000 0000"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Email */}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									placeholder="johndoe@email.com"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
								{formik.touched.email && formik.errors.email && (
									<p className="text-red-600 text-xs mt-1">
										{formik.errors.email}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Address */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<MapPin className="mr-2 text-gray-500" size={18} />
							Address
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Street Address */}
							<div>
								<label
									htmlFor="street"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Street Address
								</label>
								<input
									type="text"
									name="street"
									id="street"
									value={formik.values.street}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Street Address Line 2 */}
							<div>
								<label
									htmlFor="streetTwo"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Street Address Line 2
								</label>
								<input
									type="text"
									name="streetTwo"
									id="streetTwo"
									value={formik.values.streetTwo}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* City */}
							<div>
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									City
								</label>
								<input
									type="text"
									name="city"
									id="city"
									value={formik.values.city}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Province */}
							<div>
								<label
									htmlFor="province"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Province
								</label>
								<input
									type="text"
									name="province"
									id="province"
									value={formik.values.province}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Emergency Contact */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<Users className="mr-2 text-gray-500" size={18} />
							Emergency Contact
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Emergency Contact First Name */}
							<div>
								<label
									htmlFor="emergencyContactFirstName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									First Name
								</label>
								<input
									type="text"
									name="emergencyContactFirstName"
									id="emergencyContactFirstName"
									value={formik.values.emergencyContactFirstName}
									onChange={formik.handleChange}
									placeholder="Jane"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Emergency Contact Last Name */}
							<div>
								<label
									htmlFor="emergencyContactLastName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Last Name
								</label>
								<input
									type="text"
									name="emergencyContactLastName"
									id="emergencyContactLastName"
									value={formik.values.emergencyContactLastName}
									onChange={formik.handleChange}
									placeholder="Doe"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Relationship */}
							<div>
								<label
									htmlFor="emergencyContactRelationship"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Relationship
								</label>
								<input
									type="text"
									name="emergencyContactRelationship"
									id="emergencyContactRelationship"
									value={formik.values.emergencyContactRelationship}
									onChange={formik.handleChange}
									placeholder="Mother"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Contact Number */}
							<div>
								<label
									htmlFor="emergencyContactPhone"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Contact Number
								</label>
								<input
									type="text"
									name="emergencyContactPhone"
									id="emergencyContactPhone"
									value={formik.values.emergencyContactPhone}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Medical Aid */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<PillBottle className="mr-2 text-gray-500" size={18} />
							Medical Aid
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Medical Aid Name */}
							<div>
								<label
									htmlFor="medicalAidName"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Medical Aid Name
								</label>
								<input
									type="text"
									name="medicalAidName"
									id="medicalAidName"
									value={formik.values.medicalAidName}
									onChange={formik.handleChange}
									placeholder="Discovery"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Membership Number */}
							<div>
								<label
									htmlFor="membershipNumber"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Membership Number
								</label>
								<input
									type="text"
									name="membershipNumber"
									id="membershipNumber"
									value={formik.values.membershipNumber}
									onChange={formik.handleChange}
									placeholder="123456789"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Additional Information */}
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
						<h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<ClipboardList className="mr-2 text-gray-500" size={18} />
							Additional Information
						</h2>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Current Medication */}
							<div>
								<label
									htmlFor="currentMedication"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Taking any medication?
								</label>
								<select
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									value={currentMeds}
									onChange={(e) => {
										setCurrentMeds(e.target.value);
										formik.setFieldValue("currentMedication", e.target.value);
									}}
								>
									<option value="">Select</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>

							{/* Allergies */}
							<div className="md:col-span-2">
								<label
									htmlFor="allergies"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Allergies *
								</label>
								<textarea
									required
									name="allergies"
									id="allergies"
									value={formik.values.allergies}
									onChange={formik.handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									rows={3}
								/>
							</div>
						</div>
					</div>

					{/* Submit button */}
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
              hover:bg-blue-700 transition-colors"
						>
							Register Patient
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
