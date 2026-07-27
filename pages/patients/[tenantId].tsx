import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import Layout from "@/components/Layout";
import PatientsTable from "@/components/Tables/PatientsTable";
import PatientForm from "@/components/Forms/PatientForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PatientsPage = () => {
	const [activeModal, setActiveModal] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout
			title="Patient registry"
			description="Manage all patient records and information"
			actions={
				<Button size="sm" onClick={() => setActiveModal("addPatient")}>
					<Plus />
					<span className="hidden sm:inline">New patient</span>
				</Button>
			}
		>
			<div className="flex max-w-7xl flex-col gap-4">
				<div className="relative max-w-sm">
					<Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search patients..."
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						className="pl-10"
					/>
				</div>

				<PatientsTable searchTerm={searchTerm} />
			</div>

			{activeModal === "addPatient" ? (
				<PatientForm onClose={handleCloseModal} />
			) : null}
		</Layout>
	);
};

export default PatientsPage;
