import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
	useCreateClinicalNote,
	useUpdateClinicalNote,
} from "@/hooks/useClinicalNotes";
import type { ClinicalNote } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ClinicalNoteFormProps {
	patientId: number;
	clinicalNote?: ClinicalNote;
	onClose: () => void;
}

const ClinicalNoteForm = ({
	patientId,
	clinicalNote,
	onClose,
}: ClinicalNoteFormProps) => {
	const createClinicalNote = useCreateClinicalNote();
	const updateClinicalNote = useUpdateClinicalNote();
	const isEditing = Boolean(clinicalNote);
	const isLoading = createClinicalNote.isPending || updateClinicalNote.isPending;

	const formik = useFormik({
		initialValues: {
			diagnosesCode: clinicalNote?.diagnosesCode ?? "",
			notes: clinicalNote?.notes ?? "",
		},
		validationSchema: Yup.object({
			diagnosesCode: Yup.string()
				.max(20, "Diagnosis code cannot exceed 20 characters")
				.required("Diagnosis code is required"),
			notes: Yup.string()
				.max(10000, "Notes cannot exceed 10 000 characters")
				.required("Consultation notes are required"),
		}),
		onSubmit: (values) => {
			const handlers = {
				onSuccess: () => {
					toast.success(isEditing ? "Note updated" : "Consultation note saved");
					onClose();
				},
				onError: (error: Error) => toast.error(error.message),
			};

			if (clinicalNote) {
				updateClinicalNote.mutate({ id: clinicalNote.id, ...values }, handlers);
				return;
			}

			createClinicalNote.mutate({ patientId, ...values }, handlers);
		},
	});

	const fieldError = (field: keyof typeof formik.values) =>
		formik.touched[field] && formik.errors[field] ? (
			<p className="text-xs text-destructive">{formik.errors[field]}</p>
		) : null;

	const isInvalid = (field: keyof typeof formik.values) =>
		Boolean(formik.touched[field] && formik.errors[field]) || undefined;

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit consultation note" : "New consultation note"}
					</DialogTitle>
					<DialogDescription>
						Record the diagnosis and what happened in the consultation.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
					<div className="flex flex-col gap-2 sm:max-w-xs">
						<Label htmlFor="diagnosesCode">Diagnosis code</Label>
						<Input
							id="diagnosesCode"
							name="diagnosesCode"
							value={formik.values.diagnosesCode}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="e.g. J06.9"
							disabled={isLoading}
							aria-invalid={isInvalid("diagnosesCode")}
						/>
						{fieldError("diagnosesCode")}
						<p className="text-xs text-muted-foreground">
							ICD-10 code. We do not validate codes for you.
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="notes">Consultation notes</Label>
						<Textarea
							id="notes"
							name="notes"
							rows={12}
							value={formik.values.notes}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Presenting complaint, examination, assessment and plan..."
							disabled={isLoading}
							aria-invalid={isInvalid("notes")}
						/>
						{fieldError("notes")}
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="animate-spin" />
									Saving...
								</>
							) : (
								"Save note"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ClinicalNoteForm;
