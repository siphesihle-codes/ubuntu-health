import { useState } from "react";
import Link from "next/link";
import PatientOverview from "@/components/Modals/PatientOverview";
import VisitsOverview from "@/components/Modals/Visits";
import PrescriptionsOverview from "@/components/Modals/PrescriptionsOverview";
import Layout from "@/components/Layout";
import { PlusCircle } from "lucide-react";
import InvoicesOverview from "@/components/Modals/InvoicesOverview";
import { useRouter } from "next/router";
import { usePatient } from "@/hooks/usePatients";
import { usePatientClinicalNotes } from "@/hooks/useClinicalNotes";
import { usePatientPrescriptions } from "@/hooks/usePrescriptions";

const PatientPage = () => {
	const { id } = useRouter().query as { id?: string };
	const [activeTab, setActiveTab] = useState<string>("overview");
	const patientId = Number(id);

	const { data: patient, isLoading, error } = usePatient(id);
	const { data: clinicalNotes = [] } = usePatientClinicalNotes(patientId);
	const { data: prescriptions = [] } = usePatientPrescriptions(patientId);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className=" ">Loading patient data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-600">
				Error loading patient data. Please try again later.
			</div>
		);
	}

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 p-6">
				{/* Header */}
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<p className="text-xs tracking-wider">
								Patient ID: {patient?.id}
							</p>
							<h1 className="text-2xl font-semibold">{`${patient?.firstName} ${patient?.lastName}`}</h1>
						</div>
						<div className="flex items-center gap-4">
							{/* <span className="mx-4 mt-3 px-4 py-1 rounded-full border border-cyan-400/20 text-xs">
								{patient?.activeConditions.length > 0
									? "Active Conditions"
									: "No Active Conditions"}
							</span> */}
							<Link
								href={`/patients/${patient?.id}/consultation/new`}
								className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md
                text-white text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								<PlusCircle size={18} />
								New Consultation
							</Link>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<main className="max-w-7xl mx-auto p-4">
					{/* Tabs */}
					<div className="flex gap-6 mb-6 border-b">
						<button
							type="button"
							onClick={() => setActiveTab("overview")}
							className={`pb-4 px-2 relative ${
								activeTab === "overview" ? " " : "  hover: "
							}`}
						>
							Overview
							{activeTab === "overview" && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
							)}
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("visits")}
							className={`pb-4 px-2 relative ${
								activeTab === "visits" ? " " : "  hover: "
							}`}
						>
							Visit History
							{activeTab === "visits" && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
							)}
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("prescriptions")}
							className={`pb-4 px-2 relative ${
								activeTab === "prescriptions" ? " " : "  hover: "
							}`}
						>
							Prescriptions
							{activeTab === "prescriptions" && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
							)}
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("invoices")}
							className={`pb-4 px-2 relative ${
								activeTab === "invoices" ? " " : " hover: "
							}`}
						>
							Invoices & Appointments
							{activeTab === "invoices" && (
								<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700"></span>
							)}
						</button>
					</div>

					{/* Tab Content */}
					<div className="space-y-8">
						{/* Overview Tab */}
						{activeTab === "overview" && patient && (
							<PatientOverview patient={patient} />
						)}

						{/* Visit History Tab */}
						{activeTab === "visits" && clinicalNotes.length > 0 && (
							<VisitsOverview clinicalNotes={clinicalNotes} />
						)}

						{/* Prescriptions Tab */}
						{activeTab === "prescriptions" && (
							<PrescriptionsOverview prescriptions={prescriptions} />
						)}

						{activeTab === "invoices" && <InvoicesOverview />}
					</div>
				</main>
			</div>
		</Layout>
	);
};

export default PatientPage;
