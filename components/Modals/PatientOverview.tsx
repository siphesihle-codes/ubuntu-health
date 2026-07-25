import { Patient } from "@/types";
import React from "react";

interface PatientOverviewProps {
	patient: Patient;
}

const PatientOverview = ({ patient }: PatientOverviewProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Demographics */}
			<div className="border rounded-lg p-6 bg-white">
				<h2 className="text-lg font-medium mb-4">Demographics</h2>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-xs">ID Number</p>
						<p>{patient.idNumber}</p>
					</div>
					<div>
						<p className="text-xs">Gender</p>
						<p>{patient.sex.toUpperCase()}</p>
					</div>
					<div>
						<p className="text-xs">Email</p>
						<p>{patient.email}</p>
					</div>
					<div>
						<p className="text-xs">Contact</p>
						<p>{patient.phone}</p>
					</div>
					<div>
						<p className="text-xs">Membership No.</p>
						<p>{patient.membershipNumber}</p>
					</div>
					<div className="col-span-2">
						<p className="text-xs">Address</p>
						<p>
							{patient.street}
							{patient.streetTwo ? `, ${patient.streetTwo}` : ""},{" "}
							{patient.city}, {patient.province} {patient.postalCode}
						</p>
					</div>
					{patient.medicalAidName && (
						<div className="col-span-2">
							<p className="text-xs">Medical Aid</p>
							<p>{patient.medicalAidName}</p>
						</div>
					)}
					{patient.currentMedication && (
						<div>
							<p className="text-xs">Current Medication</p>
							<p>{patient.currentMedication}</p>
						</div>
					)}
					<div className="col-span-2">
						<p className="text-xs">Emergency Contact</p>
						<p>
							{patient.emergencyContactFirstName}{" "}
							{patient.emergencyContactLastName}
							{patient.emergencyContactRelationship
								? ` (${patient.emergencyContactRelationship})`
								: ""}
							&nbsp;– {patient.emergencyContactPhone}
						</p>
					</div>
				</div>
			</div>

			<div className="border rounded-lg p-6 bg-white">
				<h2 className=" text-lg font-medium mb-4">Medical History</h2>
				<ul className="list-disc list-inside space-y-1">
					{/* {patient.medicalHistory.map((item, index) => (
						<li key={index} className=" ">
							{item}
						</li>
					))} */}
				</ul>
			</div>

			<div className="border rounded-lg p-6 bg-white">
				<h2 className=" text-lg font-medium mb-4">Allergies</h2>
				<div className="flex flex-wrap gap-2">
					{patient.allergies && (
						<div>
							<p className="text-red-400">{patient.allergies}</p>
						</div>
					)}
				</div>
			</div>

			<div className="border rounded-lg p-6 bg-white">
				<h2 className=" text-lg font-medium mb-4">Active Conditions</h2>
				<div className="flex flex-wrap gap-2">
					{/* {patient.activeConditions.map((condition, index) => (
						<span
							key={index}
							className="px-3 py-1 bg-amber-900/30 border border-amber-400/20 text-amber-400 rounded-full text-xs"
						>
							{condition}
						</span>
					))} */}
				</div>
			</div>
		</div>
	);
};

export default PatientOverview;
