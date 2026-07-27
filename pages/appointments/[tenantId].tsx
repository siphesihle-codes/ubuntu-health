import React, { useState } from "react";
import AppointmentsTable from "@/components/Tables/AppointmentsTable";
import AppointmentForm from "@/components/Forms/AppointmentForm";
import Diary from "@/components/Diary";
import Layout from "@/components/Layout";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

const Page = () => {
	const [activeModal, setActiveModal] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<Layout
			title="Appointments"
			description="The shared diary for every practitioner in the practice"
			actions={
				<Button size="sm" onClick={() => setActiveModal("scheduleAppointment")}>
					<Plus />
					<span className="hidden sm:inline">Schedule visit</span>
				</Button>
			}
		>
			<div className="flex max-w-7xl flex-col gap-4">
				<Tabs defaultValue="diary" className="gap-4">
					<TabsList>
						<TabsTrigger value="diary">Diary</TabsTrigger>
						<TabsTrigger value="list">All appointments</TabsTrigger>
					</TabsList>

					<TabsContent value="diary">
						<Diary />
					</TabsContent>

					<TabsContent value="list">
						<div className="flex flex-col gap-4">
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
					</TabsContent>
				</Tabs>
			</div>

			{activeModal === "scheduleAppointment" ? (
				<AppointmentForm onClose={handleCloseModal} />
			) : null}
		</Layout>
	);
};

export default Page;
