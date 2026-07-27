import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Activity, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useResetPassword } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";

const ResetPasswordPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const router = useRouter();
	const { userId, token } = router.query as {
		userId?: string;
		token?: string;
	};
	const resetPassword = useResetPassword();
	const isLoading = resetPassword.isPending;

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(12, "Password must be at least 12 characters")
				.required("Password is required"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords do not match")
				.required("Confirm your password"),
		}),
		onSubmit: (values) => {
			if (!userId || !token) {
				toast.error("That reset link is incomplete");
				return;
			}

			resetPassword.mutate(
				{ userId, token, password: values.password },
				{
					onSuccess: () => {
						toast.success("Password updated. Please sign in.");
						router.push("/login");
					},
					onError: (error) => toast.error(error.message),
				}
			);
		},
	});

	const isLinkValid = Boolean(userId && token);

	return (
		<>
			<Head>
				<title>Reset password | Ubuntu Health</title>
				<meta name="description" content="Set a new Ubuntu Health password." />
			</Head>

			<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
				<ThemeToggle className="fixed right-4 top-4 z-50" />
				<div className="w-full max-w-sm">
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
							<CardTitle className="text-xl">Set a new password</CardTitle>
							<CardDescription>
								Choose a password of at least 12 characters.
							</CardDescription>
						</CardHeader>

						<CardContent>
							{!isLinkValid ? (
								<div className="flex flex-col gap-5">
									<p className="text-sm text-destructive">
										This reset link is missing information. Ask your practice
										administrator for a new one.
									</p>
									<Button variant="outline" render={<Link href="/login" />}>
										Back to sign in
									</Button>
								</div>
							) : (
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col gap-5"
								>
									<div className="flex flex-col gap-2">
										<Label htmlFor="password">New password</Label>
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
												aria-invalid={
													Boolean(
														formik.touched.password && formik.errors.password
													) || undefined
												}
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
										{formik.touched.password && formik.errors.password ? (
											<p className="text-xs text-destructive">
												{formik.errors.password}
											</p>
										) : null}
									</div>

									<div className="flex flex-col gap-2">
										<Label htmlFor="confirmPassword">Confirm password</Label>
										<div className="relative">
											<Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
											<Input
												id="confirmPassword"
												name="confirmPassword"
												type={showPassword ? "text" : "password"}
												autoComplete="new-password"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.confirmPassword}
												className="pl-10"
												placeholder="••••••••••••"
												disabled={isLoading}
												aria-invalid={
													Boolean(
														formik.touched.confirmPassword &&
															formik.errors.confirmPassword
													) || undefined
												}
											/>
										</div>
										{formik.touched.confirmPassword &&
										formik.errors.confirmPassword ? (
											<p className="text-xs text-destructive">
												{formik.errors.confirmPassword}
											</p>
										) : null}
									</div>

									<Button type="submit" disabled={isLoading} className="w-full">
										{isLoading ? (
											<>
												<Loader2 className="animate-spin" />
												Updating...
											</>
										) : (
											"Update password"
										)}
									</Button>
								</form>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
};

export default ResetPasswordPage;
