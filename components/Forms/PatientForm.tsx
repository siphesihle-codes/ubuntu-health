import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCreatePatient } from "@/hooks/usePatients";
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

interface PatientFormProps {
	onClose: () => void;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-1">
		<h3 className="text-sm font-medium">{children}</h3>
		<Separator />
	</div>
);

export default function PatientForm({ onClose }: PatientFormProps) {
	const createPatient = useCreatePatient();
	const isLoading = createPatient.isPending;

	const formik = useFormik({
		initialValues: {
			tenantId: "",
			firstName: "",
			lastName: "",
			idNumber: "",
			sex: "",
			email: "",
			phone: "",
			street: "",
			streetTwo: "",
			city: "",
			province: "",
			postalCode: "",
			allergies: "",
			currentMedication: "",
			emergencyContactFirstName: "",
			emergencyContactLastName: "",
			emergencyContactPhone: "",
			emergencyContactRelationship: "",
			medicalAidName: "",
			membershipNumber: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(20, "Name must be 20 characters or less.")
				.required("First Name is required."),
			lastName: Yup.string()
				.max(20, "Name must be 20 characters or less.")
				.required("Last Name is required."),
			email: Yup.string()
				.email("Invalid email address.")
				.required("E-Mail is required."),
		}),
		onSubmit: (values) => {
			createPatient.mutate(values, {
				onSuccess: () => {
					toast.success("Patient Registered!");
					formik.resetForm();
					setTimeout(onClose, 1000);
				},
				onError: (error) => {
					toast.error(error.message);
				},
			});
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
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Register patient</DialogTitle>
					<DialogDescription>
						Capture the details needed to open a new patient record.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
					<section className="flex flex-col gap-4">
						<SectionHeading>Personal information</SectionHeading>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="firstName">First name</Label>
								<Input
									id="firstName"
									name="firstName"
									value={formik.values.firstName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="John"
									disabled={isLoading}
									aria-invalid={isInvalid("firstName")}
								/>
								{fieldError("firstName")}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="lastName">Last name</Label>
								<Input
									id="lastName"
									name="lastName"
									value={formik.values.lastName}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Doe"
									disabled={isLoading}
									aria-invalid={isInvalid("lastName")}
								/>
								{fieldError("lastName")}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="idNumber">ID number</Label>
								<Input
									id="idNumber"
									name="idNumber"
									value={formik.values.idNumber}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="sex">Sex</Label>
								<Select
									items={{ male: "Male", female: "Female" }}
									value={formik.values.sex}
									onValueChange={(value) => formik.setFieldValue("sex", value ?? "")}
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
									value={formik.values.phone}
									onChange={formik.handleChange}
									placeholder="000 000 0000"
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="johndoe@email.com"
									disabled={isLoading}
									aria-invalid={isInvalid("email")}
								/>
								{fieldError("email")}
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
									value={formik.values.street}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="streetTwo">Street address line 2</Label>
								<Input
									id="streetTwo"
									name="streetTwo"
									value={formik.values.streetTwo}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									name="city"
									value={formik.values.city}
									onChange={formik.handleChange}
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="province">Province</Label>
								<Input
									id="province"
									name="province"
									value={formik.values.province}
									onChange={formik.handleChange}
									disabled={isLoading}
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
									value={formik.values.emergencyContactFirstName}
									onChange={formik.handleChange}
									placeholder="Jane"
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactLastName">Last name</Label>
								<Input
									id="emergencyContactLastName"
									name="emergencyContactLastName"
									value={formik.values.emergencyContactLastName}
									onChange={formik.handleChange}
									placeholder="Doe"
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactRelationship">
									Relationship
								</Label>
								<Input
									id="emergencyContactRelationship"
									name="emergencyContactRelationship"
									value={formik.values.emergencyContactRelationship}
									onChange={formik.handleChange}
									placeholder="Mother"
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="emergencyContactPhone">Contact number</Label>
								<Input
									id="emergencyContactPhone"
									name="emergencyContactPhone"
									type="tel"
									value={formik.values.emergencyContactPhone}
									onChange={formik.handleChange}
									disabled={isLoading}
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
									value={formik.values.medicalAidName}
									onChange={formik.handleChange}
									placeholder="Discovery"
									disabled={isLoading}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="membershipNumber">Membership number</Label>
								<Input
									id="membershipNumber"
									name="membershipNumber"
									value={formik.values.membershipNumber}
									onChange={formik.handleChange}
									placeholder="123456789"
									disabled={isLoading}
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
									value={formik.values.currentMedication}
									onValueChange={(value) =>
										formik.setFieldValue("currentMedication", value ?? "")
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
									required
									id="allergies"
									name="allergies"
									rows={3}
									value={formik.values.allergies}
									onChange={formik.handleChange}
									placeholder="List any known allergies, or note none"
									disabled={isLoading}
								/>
							</div>
						</div>
					</section>

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
									Registering...
								</>
							) : (
								"Register patient"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
