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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

const PatientPage = () => {
	const { id, tenantId } = useRouter().query as {
		id?: string;
		tenantId?: string;
	};
	const patientId = Number(id);

	const { data: patient, isLoading, error } = usePatient(id);
	const { data: clinicalNotes = [] } = usePatientClinicalNotes(patientId);
	const { data: prescriptions = [] } = usePatientPrescriptions(patientId);

	if (isLoading) {
		return (
			<Layout title="Patient">
				<div className="flex max-w-7xl flex-col gap-4">
					<Skeleton className="h-9 w-64" />
					<Card className="gap-3">
						{Array.from({ length: 5 }).map((_, index) => (
							<Skeleton key={index} className="mx-6 h-4" />
						))}
					</Card>
				</div>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout title="Patient">
				<Card className="mx-auto max-w-7xl">
					<div className="px-6 py-12 text-center text-sm text-destructive">
						Error loading patient data. Please try again later.
					</div>
				</Card>
			</Layout>
		);
	}

	return (
		<Layout
			title={`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`.trim()}
			description={`Patient ID: ${patient?.id ?? ""}`}
			actions={
				<Button
					size="sm"
					render={
						<Link
							href={`/patients/${tenantId}/${patient?.id}/consultation/new`}
						/>
					}
				>
					<PlusCircle />
					<span className="hidden sm:inline">New consultation</span>
				</Button>
			}
		>
			<div className="mx-auto max-w-7xl">
				<Tabs defaultValue="overview" className="gap-6">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="visits">Visit history</TabsTrigger>
						<TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
						<TabsTrigger value="invoices">Invoices</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						{patient ? <PatientOverview patient={patient} /> : null}
					</TabsContent>

					<TabsContent value="visits">
						<VisitsOverview clinicalNotes={clinicalNotes} />
					</TabsContent>

					<TabsContent value="prescriptions">
						<PrescriptionsOverview prescriptions={prescriptions} />
					</TabsContent>

					<TabsContent value="invoices">
						<InvoicesOverview />
					</TabsContent>
				</Tabs>
			</div>
		</Layout>
	);
};

export default PatientPage;
