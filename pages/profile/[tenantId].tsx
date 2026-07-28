import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useAuth";
import { MEDICAL_SPECIALTIES, ROLE_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const toTitleCase = (value: string) =>
	value.charAt(0).toUpperCase() + value.slice(1);

const specialtyItems = MEDICAL_SPECIALTIES.map((specialty) => ({
	label: toTitleCase(specialty),
	value: specialty,
}));

const ProfileForm = () => {
	const { data: profile } = useCurrentUser();
	const updateProfile = useUpdateProfile();
	const isLoading = updateProfile.isPending;

	const prescribes = Boolean(
		profile?.roles.some((role) => role === "admin" || role === "doctor")
	);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: profile?.firstName ?? "",
			lastName: profile?.lastName ?? "",
			phone: profile?.phone ?? "",
			licenseNumber: profile?.licenseNumber ?? "",
			specialty: profile?.specialty ?? "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			lastName: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			updateProfile.mutate(
				{
					...values,
					phone: values.phone || undefined,
					licenseNumber: values.licenseNumber || undefined,
					specialty: values.specialty || undefined,
				},
				{
					onSuccess: () => toast.success("Profile updated"),
					onError: (error) => toast.error(error.message),
				}
			);
		},
	});

	const fieldError = (field: keyof typeof formik.values) =>
		formik.touched[field] && formik.errors[field] ? (
			<p className="text-xs text-destructive">{formik.errors[field]}</p>
		) : null;

	if (!profile) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
					<Loader2 className="size-4 animate-spin" />
					Loading your profile...
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="mx-auto flex max-w-3xl flex-col gap-6">
			{profile.requiresProfessionalDetails ? (
				<Card size="sm" className="border-warning/40 bg-warning/5">
					<CardContent className="flex items-start gap-3">
						<TriangleAlert className="mt-0.5 size-5 shrink-0 text-warning" />
						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium">
								Add your medical license number
							</p>
							<p className="text-sm text-muted-foreground">
								Prescriptions cannot be issued until your license number is on
								file.
							</p>
						</div>
					</CardContent>
				</Card>
			) : null}

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Account</CardTitle>
					<CardDescription>
						Your sign-in address and access level are managed by your practice
						administrator
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Email</span>
						<span className="text-sm">{profile.email}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Practice</span>
						<span className="text-sm">{profile.practiceName ?? "Not set"}</span>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Access</span>
						<div className="flex flex-wrap items-center gap-1.5">
							{profile.roles.map((role) => (
								<Badge key={role} variant="secondary">
									{ROLE_LABELS[role]}
								</Badge>
							))}
							{profile.isOwner ? <Badge>Owner</Badge> : null}
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Plan</span>
						<span className="text-sm">
							{profile.subscriptionPlan ?? "Not set"}
						</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Your details</CardTitle>
					<CardDescription>
						{prescribes
							? "Your license number and specialty appear on prescriptions you issue"
							: "How your name appears to the rest of the practice"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="flex flex-col gap-2">
								<Label htmlFor="firstName">First name</Label>
								<Input
									id="firstName"
									name="firstName"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
									disabled={isLoading}
								/>
								{fieldError("firstName")}
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="lastName">Last name</Label>
								<Input
									id="lastName"
									name="lastName"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.lastName}
									disabled={isLoading}
								/>
								{fieldError("lastName")}
							</div>
							<div className="flex flex-col gap-2 sm:col-span-2">
								<Label htmlFor="phone">
									Phone <span className="text-muted-foreground">(optional)</span>
								</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phone}
									disabled={isLoading}
								/>
							</div>
						</div>

						{prescribes ? (
							<>
								<div className="flex flex-col gap-1">
									<h3 className="text-sm font-medium">Professional details</h3>
									<Separator />
								</div>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<Label htmlFor="licenseNumber">
											Medical license number
										</Label>
										<Input
											id="licenseNumber"
											name="licenseNumber"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.licenseNumber}
											disabled={isLoading}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Label htmlFor="specialty">Specialty</Label>
										<Select
											items={specialtyItems}
											value={formik.values.specialty}
											onValueChange={(value) =>
												formik.setFieldValue("specialty", value ?? "")
											}
										>
											<SelectTrigger id="specialty" className="w-full">
												<SelectValue placeholder="Select your specialty" />
											</SelectTrigger>
											<SelectContent>
												{MEDICAL_SPECIALTIES.map((specialty) => (
													<SelectItem key={specialty} value={specialty}>
														{toTitleCase(specialty)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</>
						) : null}

						<div className="flex justify-end">
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="animate-spin" />
										Saving...
									</>
								) : (
									"Save changes"
								)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

const ProfilePage = () => (
	<Layout title="Profile" description="Your account and professional details">
		<ProfileForm />
	</Layout>
);

export default ProfilePage;
