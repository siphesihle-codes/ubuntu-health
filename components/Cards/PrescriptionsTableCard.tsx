import React, { useState } from "react";
import { Pill, Printer } from "lucide-react";
import {
	type Patient,
	type Prescription,
	PRESCRIPTION_STATUS,
	PRESCRIPTION_STATUS_COLORS,
} from "@/types";
import ClientDate from "../ClientDate";
import PrescriptionScript from "../PrescriptionScript";
import { usePatients } from "@/hooks/usePatients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface PrescriptionsPageProps {
	prescriptions: Prescription[];
}

const PrescriptionsTableCard = ({ prescriptions }: PrescriptionsPageProps) => {
	const [scripted, setScripted] = useState<Prescription | null>(null);
	const { data: patients = [] } = usePatients();

	const patientFor = (prescription: Prescription): Patient | undefined =>
		patients.find((patient) => patient.id === prescription.patientId);

	const patientName = (prescription: Prescription) => {
		const patient = patientFor(prescription);
		return patient
			? `${patient.firstName} ${patient.lastName}`
			: `#${prescription.patientId}`;
	};

	if (prescriptions.length === 0) {
		return (
			<Card>
				<div className="flex flex-col items-center px-6 py-14 text-center">
					<span className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
						<Pill className="size-5" />
					</span>
					<h2 className="mt-4 text-base font-medium">No prescriptions found</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Create a new prescription to get started.
					</p>
				</div>
			</Card>
		);
	}

	return (
		<>
			<Card className="p-0 [--card-spacing:0px]">
				<div className="max-h-[70vh] overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 z-10 bg-card">
							<TableRow>
								<TableHead className="px-6">Patient</TableHead>
								<TableHead className="px-6">Medications</TableHead>
								<TableHead className="px-6">Status</TableHead>
								<TableHead className="px-6">Repeats</TableHead>
								<TableHead className="px-6">Frequency</TableHead>
								<TableHead className="px-6">Prescriber</TableHead>
								<TableHead className="px-6">End date</TableHead>
								<TableHead className="px-6 text-right">Script</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{prescriptions.map((prescription) => (
								<TableRow key={prescription.id}>
									<TableCell className="px-6 py-3 font-medium">
										{patientName(prescription)}
									</TableCell>
									<TableCell className="max-w-xs px-6 py-3">
										<p className="line-clamp-2 text-muted-foreground">
											{prescription.medications.length === 0
												? "None recorded"
												: prescription.medications
														.map(
															(medication) =>
																`${medication.name} ${medication.dosage}`
														)
														.join(", ")}
										</p>
									</TableCell>
									<TableCell className="px-6 py-3">
										<Badge
											className={
												PRESCRIPTION_STATUS_COLORS[prescription.status] ??
												"bg-muted text-muted-foreground"
											}
										>
											{PRESCRIPTION_STATUS[prescription.status] ??
												prescription.status}
										</Badge>
									</TableCell>
									<TableCell className="px-6 py-3 tabular-nums">
										{prescription.refills}
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{prescription.frequency}
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{prescription.prescriberName || "Not recorded"}
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{prescription.endDate ? (
											<ClientDate dateString={prescription.endDate} />
										) : (
											"Not set"
										)}
									</TableCell>
									<TableCell className="px-6 py-3 text-right">
										<Button
											size="sm"
											variant="outline"
											onClick={() => setScripted(prescription)}
										>
											<Printer />
											<span className="hidden sm:inline">Print</span>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
					<span>
						{prescriptions.length} prescription
						{prescriptions.length === 1 ? "" : "s"}
					</span>
				</div>
			</Card>

			{scripted ? (
				<PrescriptionScript
					prescription={scripted}
					patient={patientFor(scripted)}
					onClose={() => setScripted(null)}
				/>
			) : null}
		</>
	);
};

export default PrescriptionsTableCard;
