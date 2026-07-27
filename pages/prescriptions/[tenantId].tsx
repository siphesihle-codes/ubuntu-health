import { useState } from "react";
import { Plus, Search } from "lucide-react";
import Layout from "@/components/Layout";
import PrescriptionsTable from "@/components/Tables/PrescriptionsTable";
import PrescriptionForm from "@/components/Forms/PrescriptionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
	const [activeModal, setActiveModal] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout
			title="Prescriptions"
			description="Manage all patient prescriptions and medications"
			actions={
				<Button size="sm" onClick={() => setActiveModal("addPrescription")}>
					<Plus />
					<span className="hidden sm:inline">New prescription</span>
				</Button>
			}
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				<div className="relative max-w-sm">
					<Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search prescriptions..."
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						className="pl-10"
					/>
				</div>

				<PrescriptionsTable searchQuery={searchQuery} />
			</div>

			{activeModal === "addPrescription" ? (
				<PrescriptionForm onClose={handleCloseModal} />
			) : null}
		</Layout>
	);
};

export default Page;
