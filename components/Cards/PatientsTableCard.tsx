import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Patient } from "@/types/index";
import { toast } from "sonner";
import EditPatientModal from "../Modals/EditPatientModal";
import { useRouter } from "next/router";
import { useDeletePatient, useUpdatePatient } from "@/hooks/usePatients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface PatientsTableProps {
	patients: Patient[];
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
}

const initials = (firstName: string, lastName: string) =>
	`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

const PatientsTableCard = ({
	patients,
	onDelete,
	onEdit,
}: PatientsTableProps) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
	const router = useRouter();
	const { tenantId } = router.query as { tenantId: string };

	const deletePatient = useDeletePatient();
	const updatePatient = useUpdatePatient();

	const handleDelete = (id: string) => {
		deletePatient.mutate(id, {
			onSuccess: () => {
				onDelete?.(id);
				toast.success("Patient deleted successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	const handleEditClick = (patient: Patient) => {
		setEditingPatient(patient);
		setIsEditModalOpen(true);
	};

	const handleSave = (updatedPatient: Patient) => {
		updatePatient.mutate(updatedPatient, {
			onSuccess: () => {
				onEdit?.(String(updatedPatient.id));
				setIsEditModalOpen(false);
				toast.success("Patient updated successfully");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	const handleRowClick = (patientId: string) => {
		router.push(`/patients/${tenantId}/${patientId}`);
	};

	return (
		<Card className="p-0 [--card-spacing:0px]">
			<div className="max-h-[70vh] overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-card">
						<TableRow>
							<TableHead className="px-6">Patient</TableHead>
							<TableHead className="px-6">Contact</TableHead>
							<TableHead className="px-6">Allergies</TableHead>
							<TableHead className="px-6">Cover</TableHead>
							<TableHead className="px-6 text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patients.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									className="px-6 py-12 text-center text-muted-foreground"
								>
									No patients found
								</TableCell>
							</TableRow>
						) : (
							patients.map((patient) => (
								<TableRow
									key={patient.id}
									onClick={() => handleRowClick(String(patient.id))}
									className="cursor-pointer"
								>
									<TableCell className="px-6 py-3">
										<div className="flex items-center gap-3">
											<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
												{initials(patient.firstName, patient.lastName)}
											</span>
											<div className="flex flex-col">
												<span className="font-medium">
													{patient.firstName} {patient.lastName}
												</span>
												<span className="text-xs text-muted-foreground">
													ID: {patient.id}
												</span>
											</div>
										</div>
									</TableCell>
									<TableCell className="px-6 py-3">
										<div className="flex flex-col">
											<span>{patient.phone || "Not provided"}</span>
											<span className="text-xs text-muted-foreground">
												{patient.email || "Not provided"}
											</span>
										</div>
									</TableCell>
									<TableCell className="px-6 py-3 text-muted-foreground">
										{patient.allergies?.length || 0}
									</TableCell>
									<TableCell className="px-6 py-3">
										{patient.medicalAidName ? (
											<Badge className="bg-success/10 text-success">
												{patient.medicalAidName}
											</Badge>
										) : (
											<Badge className="bg-warning/10 text-warning">
												Private pay
											</Badge>
										)}
									</TableCell>
									<TableCell
										className="px-6 py-3 text-right"
										onClick={(event) => event.stopPropagation()}
									>
										<div className="flex justify-end gap-1">
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => handleEditClick(patient)}
												aria-label={`Edit ${patient.firstName} ${patient.lastName}`}
											>
												<Pencil />
											</Button>
											<Button
												variant="ghost"
												size="icon-sm"
												onClick={() => handleDelete(String(patient.id))}
												disabled={deletePatient.isPending}
												className="text-destructive hover:text-destructive"
												aria-label={`Delete ${patient.firstName} ${patient.lastName}`}
											>
												<Trash2 />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
				<span>
					{patients.length} patient{patients.length === 1 ? "" : "s"}
				</span>
			</div>

			{isEditModalOpen && editingPatient ? (
				<EditPatientModal
					patient={editingPatient}
					onSave={handleSave}
					onClose={() => setIsEditModalOpen(false)}
				/>
			) : null}
		</Card>
	);
};

export default PatientsTableCard;
