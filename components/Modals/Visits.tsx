import React, { useState } from "react";
import type { ClinicalNote } from "@/types";
import { Pencil, Plus, Stethoscope, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ClientDate from "../ClientDate";
import ClinicalNoteForm from "../Forms/ClinicalNoteForm";
import { useDeleteClinicalNote } from "@/hooks/useClinicalNotes";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ClinicalNoteOverviewProps {
	patientId: number;
	clinicalNotes: ClinicalNote[];
	canEdit: boolean;
}

const ClinicalNotesOverview = ({
	patientId,
	clinicalNotes,
	canEdit,
}: ClinicalNoteOverviewProps) => {
	const [isCreating, setIsCreating] = useState(false);
	const [editing, setEditing] = useState<ClinicalNote | null>(null);
	const deleteClinicalNote = useDeleteClinicalNote();

	const handleDelete = (clinicalNote: ClinicalNote) => {
		deleteClinicalNote.mutate(clinicalNote.id, {
			onSuccess: () => toast.success("Note deleted"),
			onError: (error) => toast.error(error.message),
		});
	};

	const newNoteButton = canEdit ? (
		<Button size="sm" onClick={() => setIsCreating(true)}>
			<Plus />
			New note
		</Button>
	) : null;

	return (
		<>
			{clinicalNotes.length === 0 ? (
				<Card>
					<div className="flex flex-col items-center px-6 py-14 text-center">
						<span className="flex size-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
							<Stethoscope className="size-5" />
						</span>
						<h2 className="mt-4 text-base font-medium">No visits recorded</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Clinical notes will appear here after the first consultation.
						</p>
						{canEdit ? <div className="mt-5">{newNoteButton}</div> : null}
					</div>
				</Card>
			) : (
				<div className="flex flex-col gap-4">
					{canEdit ? (
						<div className="flex justify-end">{newNoteButton}</div>
					) : null}

					{clinicalNotes.map((clinicalNote) => (
						<Card key={clinicalNote.id}>
							<CardHeader>
								<CardTitle>
									{clinicalNote.diagnosesCode || "Consultation"}
								</CardTitle>
								<CardDescription>
									Note #{clinicalNote.id} &middot;{" "}
									<ClientDate dateString={clinicalNote.createdAt} />
								</CardDescription>
								{canEdit ? (
									<CardAction>
										<div className="flex items-center gap-1">
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => setEditing(clinicalNote)}
												aria-label={`Edit note ${clinicalNote.id}`}
											>
												<Pencil />
											</Button>
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => handleDelete(clinicalNote)}
												disabled={deleteClinicalNote.isPending}
												className="text-destructive hover:text-destructive"
												aria-label={`Delete note ${clinicalNote.id}`}
											>
												<Trash2 />
											</Button>
										</div>
									</CardAction>
								) : null}
							</CardHeader>
							<CardContent>
								<p className="text-sm whitespace-pre-line text-muted-foreground">
									{clinicalNote.notes || "No notes recorded"}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{isCreating ? (
				<ClinicalNoteForm
					patientId={patientId}
					onClose={() => setIsCreating(false)}
				/>
			) : null}

			{editing ? (
				<ClinicalNoteForm
					patientId={patientId}
					clinicalNote={editing}
					onClose={() => setEditing(null)}
				/>
			) : null}
		</>
	);
};

export default ClinicalNotesOverview;
