import React, { useState } from "react";
import { Appointment, APPOINTMENT_TYPES, STATUS_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface EditAppointmentModalProps {
	appointment: Appointment;
	onSave: (updatedAppointment: Appointment) => void;
	onClose: () => void;
}

const EditAppointmentModal = ({
	appointment,
	onSave,
	onClose,
}: EditAppointmentModalProps) => {
	const [formData, setFormData] = useState<Appointment>({ ...appointment });

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (
		name: keyof Appointment,
		value: string | null
	) => {
		setFormData((prev) => ({ ...prev, [name]: value ?? "" }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSave(formData);
	};

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Edit appointment</DialogTitle>
					<DialogDescription>
						Update the visit details for this patient.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="patientFirstName">First name</Label>
							<Input
								id="patientFirstName"
								name="patientFirstName"
								value={formData.patientFirstName}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="patientLastName">Last name</Label>
							<Input
								id="patientLastName"
								name="patientLastName"
								value={formData.patientLastName}
								onChange={handleChange}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentType">Appointment type</Label>
							<Select
								value={formData.appointmentType}
								onValueChange={(value) =>
									handleSelectChange("appointmentType", value)
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
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="status">Status</Label>
							<Select
								value={formData.status}
								onValueChange={(value) => handleSelectChange("status", value)}
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
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentDate">Date</Label>
							<Input
								type="date"
								id="appointmentDate"
								name="appointmentDate"
								value={formData.appointmentDate}
								onChange={handleChange}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="appointmentTime">Time</Label>
							<Input
								type="time"
								id="appointmentTime"
								name="appointmentTime"
								value={formData.appointmentTime}
								onChange={handleChange}
							/>
						</div>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditAppointmentModal;
