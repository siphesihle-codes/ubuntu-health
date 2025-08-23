"use client";
import { Patient } from "@/types";
import React, { useState } from "react";
import {
	User,
	Users,
	UserRoundPen,
	MapPin,
	PillBottle,
	ClipboardList,
} from "lucide-react";

interface EditPatientModalProps {
	patient: Patient;
	onSave: (updatedPatient: Patient) => void;
	onClose: () => void;
}

const EditPatientModal = ({
	patient,
	onSave,
	onClose,
}: EditPatientModalProps) => {
	const [formData, setFormData] = useState<Patient>({ ...patient });

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
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
						<UserRoundPen className="mr-2 text-blue-500" size={24} />
						Edit Patient
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
									value={formData.firstName}
									onChange={handleChange}
									placeholder="John"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
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
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Doe"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
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
									value={formData.idNumber}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							{/* Gender */}
							<div>
								<label
									htmlFor="sex"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Sex *
								</label>
								<select
									required
									id="sex"
									name="sex"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									value={formData.sex}
									onChange={handleChange}
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
									value={formData.phone}
									onChange={handleChange}
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
									value={formData.email}
									onChange={handleChange}
									placeholder="johndoe@email.com"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
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
									value={formData.street ?? ""}
									onChange={handleChange}
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
									value={formData.streetTwo ?? ""}
									onChange={handleChange}
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
									value={formData.city}
									onChange={handleChange}
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
									value={formData.province}
									onChange={handleChange}
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
									value={formData.emergencyContactFirstName}
									onChange={handleChange}
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
									value={formData.emergencyContactLastName}
									onChange={handleChange}
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
									value={formData.emergencyContactRelationship ?? ""}
									onChange={handleChange}
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
									value={formData.emergencyContactPhone}
									onChange={handleChange}
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
									value={formData.medicalAidName ?? ""}
									onChange={handleChange}
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
									value={formData.membershipNumber ?? ""}
									onChange={handleChange}
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
									value={formData.currentMedication ?? ""}
									onChange={handleChange}
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
									name="allergies"
									id="allergies"
									value={formData.allergies ?? ""}
									onChange={handleChange}
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
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditPatientModal;
