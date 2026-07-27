import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Activity, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useLogin } from "@/hooks/useAuth";
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

const LoginPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const router = useRouter();
	const login = useLogin();
	const isLoading = login.isPending;

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
			password: Yup.string()
				.min(8, "Password must be at least 8 characters")
				.required("Password is required"),
		}),
		onSubmit: (values) => {
			login.mutate(values, {
				onSuccess: (data) => {
					toast.success("Login successful!");
					router.push(`/dashboard/${data.tenantId}`);
				},
				onError: (error) => {
					toast.error(error.message);
				},
			});
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
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
						<CardTitle className="text-xl">Welcome back</CardTitle>
						<CardDescription>
							Sign in to your clinic portal to continue
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email address</Label>
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
										aria-invalid={
											Boolean(formik.touched.email && formik.errors.email) ||
											undefined
										}
									/>
								</div>
								{formik.touched.email && formik.errors.email ? (
									<p className="text-xs text-destructive">
										{formik.errors.email}
									</p>
								) : null}
							</div>

							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<Link
										href="/forgot-password"
										className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
									>
										Forgot password?
									</Link>
								</div>
								<div className="relative">
									<Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										autoComplete="current-password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password}
										className="px-10"
										placeholder="••••••••"
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
										aria-label={showPassword ? "Hide password" : "Show password"}
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

							<Button type="submit" disabled={isLoading} className="w-full">
								{isLoading ? (
									<>
										<Loader2 className="animate-spin" />
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>

				<p className="mt-6 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-foreground underline-offset-4 hover:underline"
					>
						Register now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
