import { Patient } from "@/types";
import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface PatientOverviewProps {
	patient: Patient;
}

const Detail = ({
	label,
	value,
	className,
}: {
	label: string;
	value: React.ReactNode;
	className?: string;
}) => (
	<div className={`flex flex-col gap-1 ${className ?? ""}`}>
		<dt className="text-xs text-muted-foreground">{label}</dt>
		<dd className="text-sm">{value || "Not provided"}</dd>
	</div>
);

const PatientOverview = ({ patient }: PatientOverviewProps) => {
	const address = [
		patient.street,
		patient.streetTwo,
		patient.city,
		patient.province,
		patient.postalCode,
	]
		.filter(Boolean)
		.join(", ");

	const emergencyContact = [
		`${patient.emergencyContactFirstName ?? ""} ${
			patient.emergencyContactLastName ?? ""
		}`.trim(),
		patient.emergencyContactRelationship
			? `(${patient.emergencyContactRelationship})`
			: "",
		patient.emergencyContactPhone,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="grid gap-4 lg:grid-cols-2">
			<Card className="lg:col-span-2">
				<CardHeader>
					<CardTitle>Demographics</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<Detail label="ID number" value={patient.idNumber} />
						<Detail label="Sex" value={patient.sex} className="capitalize" />
						<Detail label="Email" value={patient.email} />
						<Detail label="Contact" value={patient.phone} />
						<Detail label="Medical aid" value={patient.medicalAidName} />
						<Detail label="Membership no." value={patient.membershipNumber} />
						<Detail
							label="Address"
							value={address}
							className="sm:col-span-2 lg:col-span-3"
						/>
						<Detail
							label="Emergency contact"
							value={emergencyContact}
							className="sm:col-span-2 lg:col-span-3"
						/>
					</dl>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Allergies</CardTitle>
				</CardHeader>
				<CardContent>
					{patient.allergies ? (
						<p className="text-sm text-destructive">{patient.allergies}</p>
					) : (
						<p className="text-sm text-muted-foreground">
							No allergies recorded
						</p>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Current medication</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						{patient.currentMedication || "None recorded"}
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default PatientOverview;
