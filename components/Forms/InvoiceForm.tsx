import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCreateInvoice, useUpdateInvoice } from "@/hooks/useInvoices";
import { usePatients } from "@/hooks/usePatients";
import { INVOICE_STATUS } from "@/types";
import type { Invoice } from "@/types";
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

interface InvoiceFormProps {
	invoice?: Invoice;
	onClose: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const inThirtyDays = () =>
	new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const InvoiceForm = ({ invoice, onClose }: InvoiceFormProps) => {
	const { data: patients = [] } = usePatients();
	const patientItems = patients.map((patient) => ({
		label: `${patient.firstName} ${patient.lastName}`,
		value: String(patient.id),
	}));
	const createInvoice = useCreateInvoice();
	const updateInvoice = useUpdateInvoice();
	const isEditing = Boolean(invoice);
	const isLoading = createInvoice.isPending || updateInvoice.isPending;

	const formik = useFormik({
		initialValues: {
			patientId: invoice ? String(invoice.patientId) : "",
			totalAmount: invoice ? String(invoice.totalAmount) : "",
			status: invoice?.status ?? "draft",
			dueDate: invoice?.dueDate || inThirtyDays(),
			notes: invoice?.notes ?? "",
		},
		validationSchema: Yup.object({
			patientId: Yup.string().required("Choose a patient"),
			totalAmount: Yup.number()
				.typeError("Amount must be a number")
				.min(0, "Amount cannot be negative")
				.max(9999999, "Amount is too large")
				.required("Amount is required"),
			status: Yup.string().required("Status is required"),
			dueDate: Yup.date()
				.typeError("Due date must be a valid date")
				.required("Due date is required"),
		}),
		onSubmit: (values) => {
			const patient = patients.find(
				(entry) => String(entry.id) === values.patientId
			);

			if (!patient) {
				toast.error("That patient is no longer in your practice");
				return;
			}

			const payload = {
				patientId: patient.id,
				patientFirstName: patient.firstName,
				patientLastName: patient.lastName,
				totalAmount: Number(values.totalAmount),
				status: values.status,
				dueDate: values.dueDate,
				notes: values.notes,
			};

			const handlers = {
				onSuccess: () => {
					toast.success(isEditing ? "Invoice updated" : "Invoice created");
					onClose();
				},
				onError: (error: Error) => toast.error(error.message),
			};

			if (invoice) {
				updateInvoice.mutate({ id: invoice.id, ...payload }, handlers);
				return;
			}

			createInvoice.mutate(payload, handlers);
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
					<DialogTitle>{isEditing ? "Edit invoice" : "New invoice"}</DialogTitle>
					<DialogDescription>
						Bill a patient for a consultation or procedure.
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
							<Label htmlFor="totalAmount">Amount (R)</Label>
							<Input
								id="totalAmount"
								name="totalAmount"
								type="number"
								min="0"
								step="0.01"
								value={formik.values.totalAmount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="0.00"
								disabled={isLoading}
								aria-invalid={isInvalid("totalAmount")}
							/>
							{fieldError("totalAmount")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="status">Status</Label>
							<Select
								items={INVOICE_STATUS}
								value={formik.values.status}
								onValueChange={(value) =>
									formik.setFieldValue("status", value ?? "")
								}
							>
								<SelectTrigger id="status" className="w-full">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									{Object.entries(INVOICE_STATUS).map(([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("status")}
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="dueDate">Due date</Label>
							<Input
								id="dueDate"
								name="dueDate"
								type="date"
								min={today()}
								value={formik.values.dueDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
								aria-invalid={isInvalid("dueDate")}
							/>
							{fieldError("dueDate")}
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
							placeholder="What is being billed for..."
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
									Saving...
								</>
							) : isEditing ? (
								"Save changes"
							) : (
								"Create invoice"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InvoiceForm;
