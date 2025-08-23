"use client";
import React from "react";
import {
	Search,
	FileText,
	CreditCard,
	Calendar,
	User,
	Pill,
	Clock,
	Check,
	AlertCircle,
	Plus,
	ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Layout from "../../components/Layout";
import ClientDate from "../../components/ClientDate";
import useApiData from "@/hooks/useApiData";
import {
	Appointment,
	Invoice,
	Patient,
	Prescription,
	STATUS_LABELS,
} from "@/types";

interface DashboardPageProps {
	params: { tenantId: string };
}

const DashboardPage = ({ params }: DashboardPageProps) => {
	const tenantId = params.tenantId;

	const {
		data: patients,
		isLoading: patientsLoading,
		error: patientsError,
	} = useApiData<Patient>("Patients");

	const {
		data: prescriptions,
		isLoading: prescriptionsLoading,
		error: prescriptionsError,
	} = useApiData<Prescription>("Prescriptions");

	const {
		data: appointments,
		isLoading: appointmentsLoading,
		error: appointmentsError,
	} = useApiData<Appointment>("Appointments");

	const {
		data: invoices,
		isLoading: invoicesLoading,
		error: invoicesError,
	} = useApiData<Invoice>("Invoices");

	const stats = {
		patients: patients.length,
		appointments: appointments.length,
		prescriptions: prescriptions.length,
		invoices: 15,
		revenue: 58250,
		pendingPayments: 12750,
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "paid":
				return "bg-green-900/30 text-green-400";
			case "sent":
				return "bg-blue-900/30 text-blue-400";
			case "overdue":
				return "bg-red-900/30 text-red-400";
			default:
				return "text-blue-400";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "paid":
				return <Check size={16} />;
			case "overdue":
				return <AlertCircle size={16} />;
			case "sent":
				return <Clock size={16} />;
			default:
				return <FileText size={16} />;
		}
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
							<p className="mt-2 text-gray-600">
								Overview of your medical practice
							</p>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{/* Patients Card */}
						<Link href="/patients">
							<div
								className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50
              transition-colors cursor-pointer shadow-sm"
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">Total Patients</p>
										<p className="text-2xl font-semibold text-gray-800">
											{stats.patients}
										</p>
									</div>
									<div className="p-3 rounded-full bg-blue-50 text-blue-600">
										<User size={20} />
									</div>
								</div>
							</div>
						</Link>

						{/* Appointments Card */}
						<Link href="/appointments">
							<div
								className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50
              transition-colors cursor-pointer shadow-sm"
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">
											Today&lsquo;s Appointments
										</p>
										<p className="text-2xl font-semibold text-blue-600">
											{stats.appointments}
										</p>
									</div>
									<div className="p-3 rounded-full bg-blue-50 text-blue-600">
										<Calendar size={20} />
									</div>
								</div>
							</div>
						</Link>

						{/* Prescriptions Card */}
						<Link href="/prescriptions">
							<div
								className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50
              transition-colors cursor-pointer shadow-sm"
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">
											Active Prescriptions
										</p>
										<p className="text-2xl font-semibold text-purple-600">
											{stats.prescriptions}
										</p>
									</div>
									<div className="p-3 rounded-full bg-purple-50 text-purple-600">
										<Pill size={20} />
									</div>
								</div>
							</div>
						</Link>

						{/* Revenue Card */}
						<Link href="/invoices">
							<div
								className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50
              transition-colors cursor-pointer shadow-sm"
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="text-sm text-gray-500">Monthly Revenue</p>
										<p className="text-2xl font-semibold text-green-600">
											R{stats.revenue.toLocaleString()}
										</p>
									</div>
									<div className="p-3 rounded-full bg-green-50 text-green-600">
										<CreditCard size={20} />
									</div>
								</div>
							</div>
						</Link>
					</div>

					{/* Main Content */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
						{/* Recent Patients */}
						<div
							className="bg-white border border-gray-200 rounded-lg p-6 max-h-[29em]
              shadow-sm overflow-auto lg:col-span-1"
						>
							<div className="flex justify-between items-center mb-4 bg-white">
								<h2 className="text-xl font-semibold text-gray-800">
									Recent Patients
								</h2>
								<Link
									href={`/patients/${tenantId}`}
									className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
								>
									View all <ChevronRight size={16} />
								</Link>
							</div>
							<div className="space-y-1">
								{patients.reverse().map((patient) => (
									<div
										key={patient.id}
										className="p-3 hover:bg-gray-50 rounded-lg
                    transition-colors"
									>
										<div>
											<p className="font-medium text-gray-800">
												{patient.firstName} {patient.lastName}
											</p>
											<p className="text-sm text-gray-500 flex justify-between">
												Medical Aid:
												<span>{patient.medicalAidName}</span>
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Upcoming Appointments */}
						<div
							className="bg-white border border-gray-200 rounded-lg p-6 max-h-[29em]
              shadow-sm overflow-auto lg:col-span-1"
						>
							<div className="flex justify-between items-center mb-4 ">
								<h2 className="text-xl font-semibold text-gray-800">
									Upcoming Appointments
								</h2>
								<Link
									href={`/appointments/${tenantId}`}
									className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
								>
									View all <ChevronRight size={16} />
								</Link>
							</div>
							<div className="space-y-4">
								{appointments.map((appointment) => (
									<div
										key={appointment.id}
										className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<div className="flex justify-between items-start">
											<div>
												<p className="font-medium text-gray-800">
													{appointment.patientFirstName}{" "}
													{appointment.patientLastName}
												</p>
												<p className="text-sm text-gray-500">
													{STATUS_LABELS[appointment.status].toUpperCase()}
												</p>
											</div>
											<div className="text-right">
												<p className="text-gray-800">
													<ClientDate
														dateString={appointment.appointmentDate}
													/>
												</p>
												<p className="text-gray-700">
													<ClientDate
														dateString={appointment.appointmentDate}
														format="time"
													/>
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Recent Invoices */}
						<div
							className="bg-white border border-gray-200 rounded-lg p-6 max-h-[29em]
              shadow-sm overflow-auto lg:col-span-1"
						>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold text-gray-800">
									Recent Invoices
								</h2>
								<Link
									href={`/invoices/${tenantId}`}
									className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
								>
									View all <ChevronRight size={16} />
								</Link>
							</div>
							<div className="space-y-4">
								{invoices.map((invoice) => (
									<div
										key={invoice.id}
										className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
									>
										<div className="flex justify-between items-center">
											<div>
												<p className="font-medium text-gray-800">
													PATIENT ID: {invoice.patientId}
												</p>
												<p className="text-sm text-gray-500">
													<ClientDate dateString={invoice.createdAt ?? ""} />
												</p>
											</div>
											<div className="text-right">
												<p className="font-medium text-gray-800">
													R{invoice.totalAmount}
												</p>
												<div className="flex items-center justify-end gap-1">
													<span
														className={`p-1 rounded-full ${getStatusColor(
															invoice.status
														)}`}
													>
														{getStatusIcon(invoice.status)}
													</span>
													<span className="text-sm capitalize text-gray-500">
														{invoice.status}
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="mt-4">
								<Link
									href="/invoices/new"
									className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600
                  rounded-md text-white text-sm font-medium hover:bg-blue-700 transition-colors"
								>
									<Plus size={18} />
									Create New Invoice
								</Link>
							</div>
						</div>
					</div>

					{/* Financial Overview */}
					<div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
						<h2 className="text-xl font-semibold text-gray-800 mb-4">
							Financial Overview
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between items-center mb-2">
									<p className="text-sm text-gray-500">Total Revenue</p>
									<CreditCard size={18} className="text-green-600" />
								</div>
								<p className="text-2xl font-semibold text-green-600">
									R{stats.revenue.toLocaleString()}
								</p>
							</div>
							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between items-center mb-2">
									<p className="text-sm text-gray-500">Pending Payments</p>
									<Clock size={18} className="text-yellow-600" />
								</div>
								<p className="text-2xl font-semibold text-yellow-600">
									R{stats.pendingPayments.toLocaleString()}
								</p>
							</div>
							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between items-center mb-2">
									<p className="text-sm text-gray-500">Outstanding Invoices</p>
									<AlertCircle size={18} className="text-red-600" />
								</div>
								<p className="text-2xl font-semibold text-red-600">
									{invoices.filter((i) => i.status !== "paid").length}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default DashboardPage;
