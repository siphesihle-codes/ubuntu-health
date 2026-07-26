import React, { useState } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import PatientsTable from "@/components/Tables/PatientsTable";
import PatientForm from "@/components/Forms/PatientForm";

const PatientsPage = () => {
	const [activeModal, setActiveModal] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout>
			<div className="min-h-screen   p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div
						className="flex flex-col md:flex-row justify-between items-start md:items-center
          mb-8"
					>
						<div>
							<h1 className="text-3xl font-bold  ">Patient Registry</h1>
							<p className="  mt-2">
								Manage all patient records and information
							</p>
						</div>
						<div className="flex gap-4 mt-4 md:mt-0">
							<div className="flex items-center relative">
								<Search
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
									size={18}
								/>
								<input
									type="text"
									placeholder="Search patients..."
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									className="pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-white
                  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Patients Table */}
					<PatientsTable searchTerm={searchTerm} />
				</div>
			</div>

			{activeModal && (
				<div>
					{activeModal === "addPatient" && (
						<PatientForm onClose={handleCloseModal} />
					)}
				</div>
			)}
		</Layout>
	);
};

export default PatientsPage;
