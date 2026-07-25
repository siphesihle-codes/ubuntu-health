import React, { useState } from "react";
import AppointmentsTable from "@/components/Tables/AppointmentsTable";
import AppointmentForm from "@/components/Forms/AppointmentForm";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";

const Page = () => {
	const [activeModal, setActiveModal] = useState("");
	const handleCloseModal = () => setActiveModal("");
	return (
		<Layout>
			<div className="min-h-screen bg-gray-50 p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold text-gray-800">
								Appointments Registry
							</h1>
							<p className="mt-2 text-gray-600">
								Manage all patient appointments and schedules
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
									placeholder="Search appointments..."
									className="pl-10 pr-4 py-2 border border-gray-300 rounded-md
                bg-white focus:outline-none focus:ring-1 focus:ring-blue-500
                focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					<AppointmentsTable />
				</div>

				{activeModal && (
					<div>
						{activeModal === "scheduleAppointment" && (
							<AppointmentForm onClose={handleCloseModal} />
						)}
					</div>
				)}
			</div>
		</Layout>
	);
};

export default Page;
