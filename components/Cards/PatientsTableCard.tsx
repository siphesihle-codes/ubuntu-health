import React, { useState } from "react";
import { Pencil, Trash2, User } from "lucide-react";
import { Patient } from "@/types/index";
import { toast } from "sonner";
import EditPatientModal from "../Modals/EditPatientModal";
import { useRouter } from "next/router";
import { useDeletePatient, useUpdatePatient } from "@/hooks/usePatients";

interface PatientsTableProps {
	patients: Patient[];
	onDelete?: (id: string) => void;
	onEdit?: (id: string) => void;
}

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
		<div className="relative max-h-[80vh] overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-sm">
			<table className="w-full text-sm table-auto text-left">
				<thead>
					<tr>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Patient
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Contact
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Medical Info
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Status
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{patients.map((patient) => (
						<tr
							key={patient.id}
							className="hover:bg-gray-50 transition-colors cursor-pointer"
						>
							<td
								onKeyPress={() => handleRowClick(String(patient.id))}
								onClick={() => handleRowClick(String(patient.id))}
								className="px-6 py-4"
							>
								<div className="flex items-center gap-4">
									<div
										className="flex items-center justify-center w-10 h-10 rounded-full
                    bg-blue-50 text-blue-600"
									>
										<User size={18} />
									</div>
									<div>
										<div className="font-medium text-gray-900">
											{patient.firstName} {patient.lastName}
										</div>
										<div className="text-xs text-gray-500">
											ID: {patient.id}
										</div>
									</div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="space-y-1">
									<div className="text-gray-900">
										{patient.phone || "Not provided"}
									</div>
									<div className="text-gray-500 text-sm">
										{patient.email || "Not provided"}
									</div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="space-y-1">
									<div className="text-xs text-gray-500">
										{patient.allergies?.length || 0} allergies
									</div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center gap-2">
									{patient.medicalAidName ? (
										<span
											className="text-xs px-2 py-1 rounded-full bg-green-100
                      text-green-800"
										>
											Medical Aid: {patient.medicalAidName}
										</span>
									) : (
										<span
											className="text-xs px-2 py-1 rounded-full bg-yellow-100
                      text-yellow-800"
										>
											Private Pay
										</span>
									)}
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex gap-4">
									<button
										type="button"
										onClick={() => handleEditClick(patient)}
										className="text-blue-600 hover:text-blue-800 transition-colors"
										title="Edit Patient"
									>
										<Pencil size={18} />
									</button>
									<button
										type="button"
										onClick={() => handleDelete(String(patient.id))}
										disabled={deletePatient.isPending}
										className="text-red-600 hover:text-red-800 transition-colors
                    disabled:opacity-50"
										title="Delete Patient"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{isEditModalOpen && editingPatient && (
				<EditPatientModal
					patient={editingPatient}
					onSave={handleSave}
					onClose={() => setIsEditModalOpen(false)}
				/>
			)}

			{/* Pagination */}
			<div className="flex justify-between items-center m-3 text-sm text-gray-600">
				<div>
					Showing 1-{patients.length} of {patients.length} patients
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						className="px-3 py-1 rounded border border-gray-300 bg-white
          hover:bg-gray-50 transition-colors"
					>
						Previous
					</button>
					<button
						type="button"
						className="px-3 py-1 rounded border border-gray-300 bg-white
          hover:bg-gray-50 transition-colors"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default PatientsTableCard;
