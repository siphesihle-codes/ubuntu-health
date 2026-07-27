import React, { useState } from "react";
import AppointmentsTable from "@/components/Tables/AppointmentsTable";
import AppointmentForm from "@/components/Forms/AppointmentForm";
import Layout from "@/components/Layout";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
	const [activeModal, setActiveModal] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout
			title="Appointments"
			description="Manage all patient appointments and schedules"
			actions={
				<Button
					size="sm"
					onClick={() => setActiveModal("scheduleAppointment")}
				>
					<Plus />
					<span className="hidden sm:inline">Schedule visit</span>
				</Button>
			}
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-4">
				<div className="relative max-w-sm">
					<Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search appointments..."
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						className="pl-10"
					/>
				</div>

				<AppointmentsTable searchTerm={searchTerm} />
			</div>

			{activeModal === "scheduleAppointment" ? (
				<AppointmentForm onClose={handleCloseModal} />
			) : null}
		</Layout>
	);
};

export default Page;
