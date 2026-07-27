import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Activity, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import { useRegister } from "@/hooks/useAuth";
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

const MINIMUM_PASSWORD_LENGTH = 12;

const formatSubscriptionPlan = (plan: string) =>
	plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase();

const SignUpForm = ({ plan = "basic" }) => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const register = useRegister();
	const isLoading = register.isPending;

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			practiceName: "",
			practicePhone: "",
			subscriptionPlan: plan,
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			lastName: Yup.string().required("Required"),
			email: Yup.string().email("Invalid email").required("Required"),
			password: Yup.string()
				.min(
					MINIMUM_PASSWORD_LENGTH,
					`Minimum ${MINIMUM_PASSWORD_LENGTH} characters`
				)
				.required("Required"),
			practiceName: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			register.mutate(
				{
					...values,
					subscriptionPlan: formatSubscriptionPlan(values.subscriptionPlan),
					practicePhone: values.practicePhone || undefined,
				},
				{
					onSuccess: () => {
						formik.resetForm();
						toast.success("Practice created! Please sign in.");
						router.push("/login");
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
		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 py-10">
			<div className="w-full max-w-xl">
				<div className="mb-8 flex justify-center">
					<Link
						href="/"
						className="flex size-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground"
						aria-label="Ubuntu Health home"
					>
						<Activity className="size-6" />
					</Link>
				</div>

				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Set up your practice</CardTitle>
						<CardDescription>
							You will be the practice administrator. Invite your team once you
							are signed in.
						</CardDescription>
						<div className="mt-2 flex justify-center">
							<Badge variant="secondary">
								{formatSubscriptionPlan(plan)} plan
							</Badge>
						</div>
					</CardHeader>

					<CardContent>
						<form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
							<section className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<h2 className="text-sm font-medium">Your details</h2>
									<Separator />
								</div>
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

									<div className="flex flex-col gap-2 sm:col-span-2">
										<Label htmlFor="email">Email</Label>
										<div className="relative">
											<Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
											<Input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.email}
												className="pl-10"
												placeholder="you@clinic.co.za"
												disabled={isLoading}
												aria-invalid={isInvalid("email")}
											/>
										</div>
										{fieldError("email")}
									</div>

									<div className="flex flex-col gap-2 sm:col-span-2">
										<Label htmlFor="password">Password</Label>
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
								</div>
							</section>

							<section className="flex flex-col gap-4">
								<div className="flex flex-col gap-1">
									<h2 className="text-sm font-medium">Practice</h2>
									<Separator />
								</div>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<Label htmlFor="practiceName">Practice name</Label>
										<Input
											id="practiceName"
											name="practiceName"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.practiceName}
											disabled={isLoading}
											aria-invalid={isInvalid("practiceName")}
										/>
										{fieldError("practiceName")}
									</div>
									<div className="flex flex-col gap-2">
										<Label htmlFor="practicePhone">
											Phone{" "}
											<span className="text-muted-foreground">(optional)</span>
										</Label>
										<Input
											id="practicePhone"
											name="practicePhone"
											type="tel"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.practicePhone}
											disabled={isLoading}
										/>
									</div>
								</div>
							</section>

							<div className="flex items-start gap-3">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									required
									className="mt-0.5 size-4 shrink-0 rounded-sm accent-primary"
								/>
								<Label
									htmlFor="terms"
									className="text-sm font-normal text-muted-foreground"
								>
									I agree to the{" "}
									<Link
										href="/terms"
										className="text-foreground underline-offset-4 hover:underline"
									>
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href="/policy"
										className="text-foreground underline-offset-4 hover:underline"
									>
										Privacy Policy
									</Link>
								</Label>
							</div>

							<Button type="submit" disabled={isLoading} className="w-full">
								{isLoading ? (
									<>
										<Loader2 className="animate-spin" />
										Creating practice...
									</>
								) : (
									"Create practice"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>

				<p className="mt-6 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-foreground underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

interface SignUpPageProps {
	plan: string;
}

export const getServerSideProps: GetServerSideProps<SignUpPageProps> = async ({
	query,
}) => ({
	props: { plan: typeof query.plan === "string" ? query.plan : "basic" },
});

const SignUpPage = ({ plan }: SignUpPageProps) => <SignUpForm plan={plan} />;

export default SignUpPage;
