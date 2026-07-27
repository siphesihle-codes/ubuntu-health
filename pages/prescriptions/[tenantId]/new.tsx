import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCreatePrescription } from "@/hooks/usePrescriptions";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const FREQUENCIES = [
	"Once daily",
	"Twice daily",
	"Three times daily",
	"Four times daily",
	"As needed",
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-1">
		<h2 className="text-sm font-medium">{children}</h2>
		<Separator />
	</div>
);

const NewPrescriptionPage = () => {
	const { tenantId } = useRouter().query as { tenantId: string };
	const createPrescription = useCreatePrescription();
	const isSubmitting = createPrescription.isPending;

	const formik = useFormik({
		initialValues: {
			patientId: "",
			medication: "",
			dosage: "",
			frequency: "",
			startDate: "",
			endDate: "",
			instructions: "",
			refills: 0,
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Patient ID is required"),
			medication: Yup.string().required("Medication is required"),
			dosage: Yup.string().required("Dosage is required"),
			frequency: Yup.string().required("Frequency is required"),
			startDate: Yup.date().required("Start date is required"),
		}),
		onSubmit: (values) => {
			createPrescription.mutate(
				{
					patientId: values.patientId,
					practitionerId: "1",
					endDate: values.endDate,
					frequency: values.frequency,
					refills: values.refills,
					status: "active",
					instructions: values.instructions,
					medications: [
						{
							name: values.medication,
							dosage: values.dosage,
							instructions: values.instructions,
						},
					],
				},
				{
					onSuccess: () => {
						toast.success("Prescription created successfully!");
						formik.resetForm();
					},
					onError: (error) => {
						toast.error(error.message);
					},
				}
			);
		},
	});

	const fieldError = (field: keyof typeof formik.values) =>
		formik.touched[field] && formik.errors[field] ? (
			<p className="text-xs text-destructive">{formik.errors[field]}</p>
		) : null;

	const isInvalid = (field: keyof typeof formik.values) =>
		Boolean(formik.touched[field] && formik.errors[field]) || undefined;

	return (
		<Layout
			title="New prescription"
			description="Create a new medication prescription"
			actions={
				<Button
					size="sm"
					variant="outline"
					render={<Link href={`/prescriptions/${tenantId}`} />}
				>
					<ArrowLeft />
					<span className="hidden sm:inline">Back</span>
				</Button>
			}
		>
			<div className="mx-auto max-w-3xl">
				<Card>
					<CardContent>
						<form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
							<section className="flex flex-col gap-4">
								<SectionHeading>Patient</SectionHeading>
								<div className="flex flex-col gap-2 sm:max-w-xs">
									<Label htmlFor="patientId">Patient ID</Label>
									<Input
										id="patientId"
										name="patientId"
										value={formik.values.patientId}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										placeholder="PAT-12345"
										disabled={isSubmitting}
										aria-invalid={isInvalid("patientId")}
									/>
									{fieldError("patientId")}
								</div>
							</section>

							<section className="flex flex-col gap-4">
								<SectionHeading>Medication details</SectionHeading>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<Label htmlFor="medication">Medication name</Label>
										<Input
											id="medication"
											name="medication"
											value={formik.values.medication}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder="e.g. Amoxicillin"
											disabled={isSubmitting}
											aria-invalid={isInvalid("medication")}
										/>
										{fieldError("medication")}
									</div>

									<div className="flex flex-col gap-2">
										<Label htmlFor="dosage">Dosage</Label>
										<Input
											id="dosage"
											name="dosage"
											value={formik.values.dosage}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder="e.g. 500mg"
											disabled={isSubmitting}
											aria-invalid={isInvalid("dosage")}
										/>
										{fieldError("dosage")}
									</div>

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
										<Label htmlFor="refills">Refills</Label>
										<Input
											type="number"
											id="refills"
											name="refills"
											min="0"
											max="10"
											value={formik.values.refills}
											onChange={formik.handleChange}
											disabled={isSubmitting}
										/>
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="instructions">Additional instructions</Label>
									<Textarea
										id="instructions"
										name="instructions"
										rows={3}
										value={formik.values.instructions}
										onChange={formik.handleChange}
										placeholder="Special instructions for the patient..."
										disabled={isSubmitting}
									/>
								</div>
							</section>

							<section className="flex flex-col gap-4">
								<SectionHeading>Prescription dates</SectionHeading>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<Label htmlFor="startDate">Start date</Label>
										<Input
											type="date"
											id="startDate"
											name="startDate"
											value={formik.values.startDate}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											disabled={isSubmitting}
											aria-invalid={isInvalid("startDate")}
										/>
										{fieldError("startDate")}
									</div>

									<div className="flex flex-col gap-2">
										<Label htmlFor="endDate">
											End date{" "}
											<span className="text-muted-foreground">(optional)</span>
										</Label>
										<Input
											type="date"
											id="endDate"
											name="endDate"
											value={formik.values.endDate}
											onChange={formik.handleChange}
											disabled={isSubmitting}
										/>
									</div>
								</div>
							</section>

							<div className="flex justify-end gap-3">
								<Button
									type="button"
									variant="outline"
									onClick={() => formik.resetForm()}
									disabled={isSubmitting}
								>
									Reset
								</Button>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<Loader2 className="animate-spin" />
											Creating...
										</>
									) : (
										"Create prescription"
									)}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default NewPrescriptionPage;
