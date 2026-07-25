"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, Lock, Mail, BriefcaseMedical, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/api/config";

const SignUpForm = ({ plan = "basic" }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading] = useState(false);
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			licenseNumber: "",
			specialty: "",
			practiceName: "",
			practicePhone: "",
			subscriptionPlan: plan,
			role: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required("Required"),
			lastName: Yup.string().required("Required"),
			email: Yup.string().email("Invalid email").required("Required"),
			password: Yup.string()
				.min(8, "Minimum 8 characters")
				.required("Required"),
			licenseNumber: Yup.string().required("Medical license required"),
			specialty: Yup.string().required("Specialty required"),
		}),
		onSubmit: async (values) => {
			try {
				const response = await fetch(
					`${API_BASE_URL}/api/auth/register`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(values),
					}
				);

				const data = await response.json();

				if (!response.ok) {
					toast.error(`Registration failed: ${data.message}`);
					return;
				}

				localStorage.setItem("token", data.token);
				localStorage.setItem("tenantId", data.tenantId);

				formik.resetForm();
				toast.success("Registration successful!");
				router.push(`/dashboard/${data.tenantId}`);
			} catch (err) {
				console.error(`Error registering user: ${err}`);
				toast.error("An unexpected error occurred");
			}
		},
	});

	const medicalSpecialties = [
		"family medicine",
		"pediatrics",
		"internal medicine",
		"cardiology",
		"dermatology",
		"neurology",
		"ob/gyn",
		"ophthalmology",
		"orthopedics",
		"psychiatry",
	];

	const roles = ["admin", "doctor", "nurse", "receptionist"];

	return (
		<Suspense fallback={<div>Loading</div>}>
			<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl w-full">
					<div className="text-center mb-8">
						<div
							className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center
          justify-center mb-4"
						>
							<BriefcaseMedical className="text-blue-600" size={24} />
						</div>
						<h1 className="text-2xl font-semibold text-gray-800">
							Register for{" "}
							<span className="font-bold text-blue-600">
								{plan.toLocaleUpperCase()}
							</span>{" "}
							plan
						</h1>
						<p className="text-gray-600 mt-2">
							Register to access the EMR system
						</p>
					</div>

					<form
						onSubmit={formik.handleSubmit}
						className="grid md:grid-cols-2 gap-6"
					>
						{/* Personal Information */}
						<div className="md:col-span-2">
							<h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
								<User className="mr-2 text-gray-500" size={16} />
								Personal Information
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="firstName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										First Name *
									</label>
									<input
										id="firstName"
										name="firstName"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.firstName}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
									{formik.touched.firstName && formik.errors.firstName && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.firstName}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="lastName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Last Name *
									</label>
									<input
										id="lastName"
										name="lastName"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.lastName}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
									{formik.touched.lastName && formik.errors.lastName && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.lastName}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Credentials */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email *
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="text-gray-400" size={16} />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md
                text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500
                focus:border-blue-500"
								/>
							</div>
							{formik.touched.email && formik.errors.email && (
								<p className="text-red-600 text-xs mt-1">
									{formik.errors.email}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="role"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Role
							</label>
							<select
								id="role"
								name="role"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.role}
								className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">Select your role</option>
								{roles.map((role) => (
									<option key={role} value={role}>
										{role.toUpperCase()}
									</option>
								))}
							</select>
							{formik.touched.role && formik.errors.role && (
								<p className="text-red-600 text-xs mt-1">
									{formik.errors.role}
								</p>
							)}
						</div>

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
							{formik.touched.password && formik.errors.password && (
								<p className="text-red-600 text-xs mt-1">
									{formik.errors.password}
								</p>
							)}
						</div>

						{/* Professional Information */}
						<div className="md:col-span-2">
							<h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
								<BriefcaseMedical className="mr-2 text-gray-500" size={16} />
								Professional Information
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="licenseNumber"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Medical License Number *
									</label>
									<input
										id="licenseNumber"
										name="licenseNumber"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.licenseNumber}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
									{formik.touched.licenseNumber &&
										formik.errors.licenseNumber && (
											<p className="text-red-600 text-xs mt-1">
												{formik.errors.licenseNumber}
											</p>
										)}
								</div>
								<div>
									<label
										htmlFor="specialty"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Specialty *
									</label>
									<select
										id="specialty"
										name="specialty"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.specialty}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="">Select your specialty</option>
										{medicalSpecialties.map((specialty) => (
											<option key={specialty} value={specialty}>
												{specialty.toUpperCase()}
											</option>
										))}
									</select>
									{formik.touched.specialty && formik.errors.specialty && (
										<p className="text-red-600 text-xs mt-1">
											{formik.errors.specialty}
										</p>
									)}
								</div>
							</div>
						</div>

						{/* Practice Information */}
						<div className="md:col-span-2">
							<h2 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
								<MapPin className="mr-2 text-gray-500" size={16} />
								Practice Information
							</h2>
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="practiceName"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Practice/Hospital Name
									</label>
									<input
										id="practiceName"
										name="practiceName"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.practiceName}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="practicePhone"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Phone Number
									</label>
									<input
										id="practicePhone"
										name="practicePhone"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.practicePhone}
										className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									/>
									<input
										type="hidden"
										name="subscriptionPlan"
										value={plan || ""}
									/>
								</div>
							</div>
						</div>

						{/* Terms and Submit */}
						<div className="md:col-span-2 flex items-start">
							<div className="flex items-center h-5">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
									required
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="terms" className="text-gray-700">
									I agree to the{" "}
									<Link href="terms" className="text-blue-600 hover:underline">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="policy" className="text-blue-600 hover:underline">
										Privacy Policy
									</Link>
								</label>
							</div>
						</div>

						<div className="md:col-span-2">
							<button
								type="submit"
								className="w-full text-white py-2 px-4 border border-transparent rounded-md
              shadow-sm text-sm font-medium  bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Register Account
							</button>
						</div>

						<div className="md:col-span-2 text-center text-sm text-gray-600">
							Already have an account?{" "}
							<Link href="/login" className="text-blue-600 hover:underline">
								Sign in
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Suspense>
	);
};

const MedicalSignUpPage = () => {
	const [mounted, setMounted] = useState(false);

	// Only render client component after mounting
	useEffect(() => {
		setMounted(true);
	}, []);

	// Client component for handling the query parameters
	const ClientFormWrapper = () => {
		const { useSearchParams } = require("next/navigation");
		const searchParams = useSearchParams();
		const plan = searchParams.get("plan") || "basic";

		return <SignUpForm plan={plan} />;
	};

	if (!mounted) {
		return <div>Loading...</div>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ClientFormWrapper />
		</Suspense>
	);
};

export default MedicalSignUpPage;
