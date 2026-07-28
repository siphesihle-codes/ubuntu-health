import React, { useId, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { PRESCRIPTION_STATUS } from "@/types";
import { useCreatePrescription } from "@/hooks/usePrescriptions";
import { usePatients } from "@/hooks/usePatients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PrescriptionFormProps {
	patientId?: number;
	onClose: () => void;
}

const FREQUENCIES = [
	"Once daily",
	"Twice daily",
	"Three times daily",
	"Four times daily",
	"As needed",
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-1">
		<h3 className="text-sm font-medium">{children}</h3>
		<Separator />
	</div>
);

export default function PrescriptionForm({
	patientId,
	onClose,
}: PrescriptionFormProps) {
	const medicationIdPrefix = useId();
	const medicationCount = useRef(0);
	const { data: patients = [] } = usePatients();
	const patientItems = patients.map((patient) => ({
		label: `${patient.firstName} ${patient.lastName}`,
		value: String(patient.id),
	}));
	const createPrescription = useCreatePrescription();
	const isLoading = createPrescription.isPending;

	const formik = useFormik({
		initialValues: {
			patientId: patientId ? String(patientId) : "",
			endDate: "",
			frequency: "",
			refills: 0,
			status: "active",
			medications: [
				{
					medicationId: medicationIdPrefix,
					name: "",
					dosage: "",
					instructions: "",
				},
			],
			instructions: "",
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Choose a patient"),
			medications: Yup.array().of(
				Yup.object().shape({
					name: Yup.string().required("Medication name is required"),
					dosage: Yup.string().required("Dosage is required"),
				})
			),
			frequency: Yup.string().required("Frequency is required"),
		}),
		onSubmit: (values) => {
			createPrescription.mutate(
				{
					patientId: Number(values.patientId),
					endDate: values.endDate,
					frequency: values.frequency,
					refills: Number(values.refills),
					status: values.status,
					instructions: values.instructions,
					medications: values.medications.map((medication) => ({
						name: medication.name,
						dosage: medication.dosage,
						instructions: medication.instructions,
					})),
				},
				{
					onSuccess: () => {
						toast.success("Prescription created!");
						onClose();
					},
					onError: (error) => {
						toast.error(error.message);
					},
				}
			);
		},
	});

	const addMedication = () => {
		medicationCount.current += 1;
		formik.setFieldValue("medications", [
			...formik.values.medications,
			{
				medicationId: `${medicationIdPrefix}-${medicationCount.current}`,
				name: "",
				dosage: "",
				instructions: "",
			},
		]);
	};

	const removeMedication = (index: number) => {
		const medications = [...formik.values.medications];
		medications.splice(index, 1);
		formik.setFieldValue("medications", medications);
	};

	const medicationError = (index: number, field: "name" | "dosage") => {
		const isTouched = formik.touched.medications?.[index]?.[field];
		const errors = formik.errors.medications;

		if (!isTouched || !Array.isArray(errors)) return null;

		const error = errors[index];
		if (!error || typeof error !== "object") return null;

		const message = (error as Record<string, string>)[field];
		return message ? <p className="text-xs text-destructive">{message}</p> : null;
	};

	const fieldError = (field: "patientId" | "frequency") =>
		formik.touched[field] && formik.errors[field] ? (
			<p className="text-xs text-destructive">{formik.errors[field]}</p>
		) : null;

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>New prescription</DialogTitle>
					<DialogDescription>
						Add medications, dosage and dispensing instructions. We do not check
						for interactions or allergies.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
					<section className="flex flex-col gap-4">
						<SectionHeading>Patient</SectionHeading>
						<div className="flex flex-col gap-2 sm:max-w-xs">
							<Label htmlFor="patientId">Patient</Label>
							<Select
								items={patientItems}
								value={formik.values.patientId}
								onValueChange={(value) =>
									formik.setFieldValue("patientId", value ?? "")
								}
							>
								<SelectTrigger id="patientId" className="w-full">
									<SelectValue placeholder="Select a patient" />
								</SelectTrigger>
								<SelectContent>
									{patients.map((patient) => (
										<SelectItem key={patient.id} value={String(patient.id)}>
											{patient.firstName} {patient.lastName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("patientId")}
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Medications</SectionHeading>
						<div className="flex flex-col gap-5">
							{formik.values.medications.map((medication, index) => (
								<div
									key={medication.medicationId}
									className="flex flex-col gap-3 rounded-md bg-muted/50 p-4"
								>
									<div className="flex items-center justify-between">
										<span className="text-xs font-medium text-muted-foreground">
											Medication {index + 1}
										</span>
										{index > 0 ? (
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												onClick={() => removeMedication(index)}
												className="text-destructive hover:text-destructive"
												aria-label={`Remove medication ${index + 1}`}
											>
												<Trash2 />
											</Button>
										) : null}
									</div>

									<div className="grid gap-4 sm:grid-cols-3">
										<div className="flex flex-col gap-2">
											<Label htmlFor={`medications[${index}].name`}>Name</Label>
											<Input
												id={`medications[${index}].name`}
												name={`medications[${index}].name`}
												value={medication.name}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												placeholder="e.g. Amoxicillin"
												disabled={isLoading}
											/>
											{medicationError(index, "name")}
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor={`medications[${index}].dosage`}>
												Dosage
											</Label>
											<Input
												id={`medications[${index}].dosage`}
												name={`medications[${index}].dosage`}
												value={medication.dosage}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												placeholder="e.g. 500mg"
												disabled={isLoading}
											/>
											{medicationError(index, "dosage")}
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor={`medications[${index}].instructions`}>
												Instructions
											</Label>
											<Input
												id={`medications[${index}].instructions`}
												name={`medications[${index}].instructions`}
												value={medication.instructions || ""}
												onChange={formik.handleChange}
												placeholder="Special instructions"
												disabled={isLoading}
											/>
										</div>
									</div>
								</div>
							))}

							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={addMedication}
								className="self-start"
							>
								<Plus />
								Add another medication
							</Button>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Prescription details</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-3">
							<div className="flex flex-col gap-2">
								<Label htmlFor="frequency">Frequency</Label>
								<Select
									value={formik.values.frequency}
									onValueChange={(value) =>
										formik.setFieldValue("frequency", value ?? "")
									}
								>
									<SelectTrigger id="frequency" className="w-full">
										<SelectValue placeholder="Select frequency" />
									</SelectTrigger>
									<SelectContent>
										{FREQUENCIES.map((frequency) => (
											<SelectItem key={frequency} value={frequency}>
												{frequency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{fieldError("frequency")}
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="refills">Repeats</Label>
								<Input
									type="number"
									id="refills"
									name="refills"
									min="0"
									max="10"
									value={formik.values.refills}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="status">Status</Label>
								<Select
									items={PRESCRIPTION_STATUS}
									value={formik.values.status}
									onValueChange={(value) =>
										formik.setFieldValue("status", value ?? "")
									}
								>
									<SelectTrigger id="status" className="w-full">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										{Object.entries(PRESCRIPTION_STATUS).map(([key, label]) => (
											<SelectItem key={key} value={key}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="endDate">
									Valid until{" "}
									<span className="text-muted-foreground">(optional)</span>
								</Label>
								<Input
									type="date"
									id="endDate"
									name="endDate"
									value={formik.values.endDate}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>
						</div>
					</section>

					<div className="flex flex-col gap-2">
						<Label htmlFor="instructions">Additional instructions</Label>
						<Textarea
							id="instructions"
							name="instructions"
							rows={3}
							value={formik.values.instructions}
							onChange={formik.handleChange}
							placeholder="Special instructions for the patient..."
							disabled={isLoading}
						/>
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
									Creating...
								</>
							) : (
								"Create prescription"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
