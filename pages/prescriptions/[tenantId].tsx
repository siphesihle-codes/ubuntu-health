import { useState } from "react";
import { Search, PlusCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PrescriptionsTable from "@/components/Tables/PrescriptionsTable";
import PrescriptionForm from "@/components/Forms/PrescriptionForm";

const Page = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeModal, setActiveModal] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout>
			<div className="min-h-screen p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold">Prescriptions Registry</h1>
							<p className="mt-2">
								Manage all patient prescriptions and medications
							</p>
						</div>
						<div className="flex gap-4 mt-4 md:mt-0">
							<div className="relative">
								<Search
									className="absolute left-3 top-1/2 -translate-y-1/2"
									size={18}
								/>
								<input
									type="text"
									placeholder="Search ..."
									className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2
                  focus:ring-cyan-500/50"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<button
								type="button"
								onClick={() => setActiveModal("addPrescription")}
								className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md
                text-white text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								<PlusCircle size={18} />
								Add Prescription
							</button>
						</div>
					</div>

					<PrescriptionsTable searchQuery={searchQuery} />
				</div>
			</div>

			{isOpen && (
				<button
					type="button"
					className="fixed inset-0 backdrop-blur-sm z-30 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{activeModal && (
				<div>
					{activeModal === "addPrescription" && (
						<PrescriptionForm onClose={handleCloseModal} />
					)}
				</div>
			)}
		</Layout>
	);
};

export default Page;
