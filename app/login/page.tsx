"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/app/api/config";
import { getApiErrorMessage } from "@/app/api/errors";

const LoginPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();

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
		onSubmit: async (values) => {
			setIsLoading(true);
			try {
				const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				});

				const data = await response.json();

				if (!response.ok) {
					toast.error(getApiErrorMessage(data, "Login failed"));
					return;
				}

				localStorage.setItem("token", data.token);
				localStorage.setItem("tenantId", data.tenantId);

				toast.success("Login successful!");
				router.push(`/dashboard/${data.tenantId}`);
			} catch (err) {
				console.error(`Error logging in: ${err}`);
				toast.error("An unexpected error occurred");
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
				<div className="text-center mb-8">
					<div
						className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center
          justify-center mb-4"
					>
						<Lock className="text-blue-600" size={24} />
					</div>
					<h1 className="text-2xl font-semibold text-gray-800">
						Medical Portal Login
					</h1>
					<p className="text-gray-600 mt-2">Access your EMR system</p>
				</div>

				<form onSubmit={formik.handleSubmit} className="space-y-6">
					{/* Email Field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email Address *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="text-gray-400" size={16} />
							</div>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500
                focus:border-blue-500"
								placeholder="your@email.com"
								disabled={isLoading}
							/>
						</div>
						{formik.touched.email && formik.errors.email ? (
							<p className="text-red-600 text-xs mt-1">{formik.errors.email}</p>
						) : null}
					</div>

					{/* Password Field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Password *
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="text-gray-400" size={16} />
							</div>
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
								className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md
                text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500
                focus:border-blue-500"
								placeholder="••••••••••••••••"
								disabled={isLoading}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
								disabled={isLoading}
							>
								{showPassword ? (
									<Eye
										className="text-gray-400 hover:text-gray-500"
										size={16}
									/>
								) : (
									<EyeOff
										className="text-gray-400 hover:text-gray-500"
										size={16}
									/>
								)}
							</button>
						</div>
						{formik.touched.password && formik.errors.password ? (
							<p className="text-red-600 text-xs mt-1">
								{formik.errors.password}
							</p>
						) : null}
					</div>

					{/* Forgot Password */}
					<div className="flex justify-end">
						<Link
							href="/forgot-password"
							className="text-sm text-blue-600 hover:underline"
						>
							Forgot password?
						</Link>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className={`w-full text-white py-2 px-4 border border-transparent rounded-md
              shadow-sm text-sm font-medium  bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
								isLoading ? "opacity-70 cursor-not-allowed" : ""
							}`}
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-4 w-4 "
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<title>Loading</title>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0
                    3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Signing in...
							</span>
						) : (
							"Sign In"
						)}
					</button>

					{/* Sign Up Link */}
					<div className="text-center text-sm text-gray-600">
						Don&lsquo;t have an account?{" "}
						<Link href="/signup" className="text-blue-600 hover:underline">
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
