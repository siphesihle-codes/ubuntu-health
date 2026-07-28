import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { APPOINTMENT_TYPES, STATUS_LABELS } from "@/types";
import { Loader2 } from "lucide-react";
import { useCreateAppointment } from "@/hooks/useAppointments";
import { usePatients } from "@/hooks/usePatients";
import { usePractitioners } from "@/hooks/useStaff";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface AppointmentFormProps {
	initialDate?: string;
	initialPractitionerId?: string;
	onClose: () => void;
}

const AppointmentForm = ({
	initialDate,
	initialPractitionerId,
	onClose,
}: AppointmentFormProps) => {
	const { data: patients = [] } = usePatients();
	const { data: practitioners = [] } = usePractitioners();
	const patientItems = patients.map((patient) => ({
		label: `${patient.firstName} ${patient.lastName}`,
		value: String(patient.id),
	}));
	const practitionerItems = practitioners.map((practitioner) => ({
		label: practitioner.name,
		value: practitioner.id,
	}));
	const createAppointment = useCreateAppointment();
	const isLoading = createAppointment.isPending;

	const formik = useFormik({
		initialValues: {
			patientId: "",
			practitionerId: initialPractitionerId ?? "",
			appointmentDate: initialDate ?? "",
			appointmentTime: "",
			appointmentType: "",
			status: "scheduled",
			notes: "",
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Choose a patient"),
			practitionerId: Yup.string().required("Choose a practitioner"),
			appointmentDate: Yup.date().required("Appointment date is required"),
			appointmentTime: Yup.string().required("Appointment time is required"),
			appointmentType: Yup.string().required("Appointment type is required"),
			status: Yup.string().required("Appointment status is required"),
		}),
		onSubmit: (values) => {
			const patient = patients.find(
				(entry) => String(entry.id) === values.patientId
			);
			const practitioner = practitioners.find(
				(entry) => entry.id === values.practitionerId
			);

			if (!patient || !practitioner) {
				toast.error("That patient or practitioner is no longer available");
				return;
			}

			createAppointment.mutate(
				{
					patientId: patient.id,
					patientFirstName: patient.firstName,
					patientLastName: patient.lastName,
					practitionerId: practitioner.id,
					practitionerName: practitioner.name,
					appointmentDate: values.appointmentDate,
					appointmentTime: values.appointmentTime,
					appointmentType: values.appointmentType,
					status: values.status,
					notes: values.notes,
				},
				{
					onSuccess: () => {
						toast.success("Appointment scheduled!");
						onClose();
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
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Schedule appointment</DialogTitle>
					<DialogDescription>
						Book a visit with a practitioner and set its type, time and status.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="flex flex-col gap-2">
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

						<div className="flex flex-col gap-2">
							<Label htmlFor="practitionerId">Practitioner</Label>
							<Select
								items={practitionerItems}
								value={formik.values.practitionerId}
								onValueChange={(value) =>
									formik.setFieldValue("practitionerId", value ?? "")
								}
							>
								<SelectTrigger id="practitionerId" className="w-full">
									<SelectValue placeholder="Select a practitioner" />
								</SelectTrigger>
								<SelectContent>
									{practitioners.map((practitioner) => (
										<SelectItem key={practitioner.id} value={practitioner.id}>
											{practitioner.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("practitionerId")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentType">Appointment type</Label>
							<Select
								items={APPOINTMENT_TYPES}
								value={formik.values.appointmentType}
								onValueChange={(value) =>
									formik.setFieldValue("appointmentType", value ?? "")
								}
							>
								<SelectTrigger id="appointmentType" className="w-full">
									<SelectValue placeholder="Select appointment type" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(APPOINTMENT_TYPES).map(([key, label]) => (
										<SelectItem key={key} value={key}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("appointmentType")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="status">Status</Label>
							<Select
								items={STATUS_LABELS}
								value={formik.values.status}
								onValueChange={(value) => formik.setFieldValue("status", value ?? "")}
							>
								<SelectTrigger id="status" className="w-full">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(STATUS_LABELS).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("status")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentDate">Date</Label>
							<Input
								type="date"
								id="appointmentDate"
								name="appointmentDate"
								value={formik.values.appointmentDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
								aria-invalid={isInvalid("appointmentDate")}
							/>
							{fieldError("appointmentDate")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentTime">Time</Label>
							<Input
								type="time"
								id="appointmentTime"
								name="appointmentTime"
								value={formik.values.appointmentTime}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
								aria-invalid={isInvalid("appointmentTime")}
							/>
							{fieldError("appointmentTime")}
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="notes">
							Notes <span className="text-muted-foreground">(optional)</span>
						</Label>
						<Textarea
							id="notes"
							name="notes"
							rows={3}
							value={formik.values.notes}
							onChange={formik.handleChange}
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
									Scheduling...
								</>
							) : (
								"Schedule appointment"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentForm;
