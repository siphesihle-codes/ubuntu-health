import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Activity, Eye, EyeOff, Loader2, Lock, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useAcceptInvitation, useInvitationPreview } from "@/hooks/useAuth";
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const MINIMUM_PASSWORD_LENGTH = 12;

const InvitePage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const token = typeof router.query.token === "string" ? router.query.token : undefined;

	const invitation = useInvitationPreview(token);
	const acceptInvitation = useAcceptInvitation(token);
	const isLoading = acceptInvitation.isPending;

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			password: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			lastName: Yup.string().required("Required"),
			password: Yup.string()
				.min(
					MINIMUM_PASSWORD_LENGTH,
					`Minimum ${MINIMUM_PASSWORD_LENGTH} characters`
				)
				.required("Required"),
		}),
		onSubmit: (values) => {
			acceptInvitation.mutate(values, {
				onSuccess: () => {
					toast.success("Account created! Please sign in.");
					router.push("/login");
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
		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 py-10">
			<div className="w-full max-w-md">
				<div className="mb-8 flex justify-center">
					<Link
						href="/"
						className="flex size-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground"
						aria-label="Ubuntu Health home"
					>
						<Activity className="size-6" />
					</Link>
				</div>

				{invitation.isPending ? (
					<Card>
						<CardContent className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
							<Loader2 className="size-4 animate-spin" />
							Checking your invitation...
						</CardContent>
					</Card>
				) : invitation.isError || !invitation.data ? (
					<Card>
						<CardContent className="flex flex-col items-center px-6 py-14 text-center">
							<span className="flex size-12 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
								<TriangleAlert className="size-5" />
							</span>
							<h2 className="mt-4 text-base font-medium">
								This invitation is not valid
							</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								{invitation.error?.message ??
									"It may have expired or already been used."}
							</p>
							<p className="mt-4 text-sm text-muted-foreground">
								Ask your practice administrator to send a new one.
							</p>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">
								Join {invitation.data.practiceName}
							</CardTitle>
							<CardDescription>
								Setting up an account for {invitation.data.email}
							</CardDescription>
							<div className="mt-2 flex flex-col items-center gap-1.5">
								<Badge variant="secondary">
									{ROLE_LABELS[invitation.data.role]}
								</Badge>
								<span className="text-xs text-muted-foreground">
									{ROLE_DESCRIPTIONS[invitation.data.role]}
								</span>
							</div>
						</CardHeader>

						<CardContent>
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col gap-5"
							>
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
											aria-invalid={isInvalid("firstName")}
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
											aria-invalid={isInvalid("lastName")}
										/>
										{fieldError("lastName")}
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<Label htmlFor="password">Choose a password</Label>
									<div className="relative">
										<Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
										<Input
											id="password"
											name="password"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.password}
											className="px-10"
											placeholder="••••••••••••"
											disabled={isLoading}
											aria-invalid={isInvalid("password")}
										/>
										<button
											type="button"
											className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
											onClick={() => setShowPassword(!showPassword)}
											disabled={isLoading}
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? (
												<EyeOff className="size-4" />
											) : (
												<Eye className="size-4" />
											)}
										</button>
									</div>
									{fieldError("password") ?? (
										<p className="text-xs text-muted-foreground">
											At least {MINIMUM_PASSWORD_LENGTH} characters. A short
											phrase works well.
										</p>
									)}
								</div>

								<Button type="submit" disabled={isLoading} className="w-full">
									{isLoading ? (
										<>
											<Loader2 className="animate-spin" />
											Creating account...
										</>
									) : (
										"Accept invitation"
									)}
								</Button>
							</form>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
};

export default InvitePage;
