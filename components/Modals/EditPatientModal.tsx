import { Patient } from "@/types";
import React, { useState } from "react";
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

interface EditPatientModalProps {
	patient: Patient;
	onSave: (updatedPatient: Patient) => void;
	onClose: () => void;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-1">
		<h3 className="text-sm font-medium">{children}</h3>
		<Separator />
	</div>
);

const EditPatientModal = ({
	patient,
	onSave,
	onClose,
}: EditPatientModalProps) => {
	const [formData, setFormData] = useState<Patient>({ ...patient });

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: keyof Patient, value: string | null) => {
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
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Edit patient</DialogTitle>
					<DialogDescription>
						Update this patient&apos;s record.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<section className="flex flex-col gap-4">
						<SectionHeading>Personal information</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="firstName">First name</Label>
								<Input
									id="firstName"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="John"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="lastName">Last name</Label>
								<Input
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Doe"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="idNumber">ID number</Label>
								<Input
									id="idNumber"
									name="idNumber"
									value={formData.idNumber}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="sex">Sex</Label>
								<Select
									items={{ male: "Male", female: "Female" }}
									value={formData.sex}
									onValueChange={(value) => handleSelectChange("sex", value)}
								>
									<SelectTrigger id="sex" className="w-full">
										<SelectValue placeholder="Select sex" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="phone">Phone number</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									value={formData.phone}
									onChange={handleChange}
									placeholder="000 000 0000"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="johndoe@email.com"
								/>
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Address</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="street">Street address</Label>
								<Input
									id="street"
									name="street"
									value={formData.street ?? ""}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="streetTwo">Street address line 2</Label>
								<Input
									id="streetTwo"
									name="streetTwo"
									value={formData.streetTwo ?? ""}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									name="city"
									value={formData.city}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="province">Province</Label>
								<Input
									id="province"
									name="province"
									value={formData.province}
									onChange={handleChange}
								/>
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Emergency contact</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactFirstName">First name</Label>
								<Input
									id="emergencyContactFirstName"
									name="emergencyContactFirstName"
									value={formData.emergencyContactFirstName}
									onChange={handleChange}
									placeholder="Jane"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactLastName">Last name</Label>
								<Input
									id="emergencyContactLastName"
									name="emergencyContactLastName"
									value={formData.emergencyContactLastName}
									onChange={handleChange}
									placeholder="Doe"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactRelationship">
									Relationship
								</Label>
								<Input
									id="emergencyContactRelationship"
									name="emergencyContactRelationship"
									value={formData.emergencyContactRelationship ?? ""}
									onChange={handleChange}
									placeholder="Mother"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactPhone">Contact number</Label>
								<Input
									id="emergencyContactPhone"
									name="emergencyContactPhone"
									type="tel"
									value={formData.emergencyContactPhone}
									onChange={handleChange}
								/>
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Medical aid</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="medicalAidName">Medical aid name</Label>
								<Input
									id="medicalAidName"
									name="medicalAidName"
									value={formData.medicalAidName ?? ""}
									onChange={handleChange}
									placeholder="Discovery"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="membershipNumber">Membership number</Label>
								<Input
									id="membershipNumber"
									name="membershipNumber"
									value={formData.membershipNumber ?? ""}
									onChange={handleChange}
									placeholder="123456789"
								/>
							</div>
						</div>
					</section>

					<section className="flex flex-col gap-4">
						<SectionHeading>Additional information</SectionHeading>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="currentMedication">
									Taking any medication?
								</Label>
								<Select
									value={formData.currentMedication ?? ""}
									onValueChange={(value) =>
										handleSelectChange("currentMedication", value)
									}
								>
									<SelectTrigger
										id="currentMedication"
										className="w-full sm:max-w-xs"
									>
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Yes">Yes</SelectItem>
										<SelectItem value="No">No</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="allergies">Allergies</Label>
								<Textarea
									id="allergies"
									name="allergies"
									rows={3}
									value={formData.allergies ?? ""}
									onChange={handleChange}
								/>
							</div>
						</div>
					</section>

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

export default EditPatientModal;
