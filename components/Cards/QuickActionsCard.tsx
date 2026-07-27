import React, { useState } from "react";
import { CalendarCheck, Plus } from "lucide-react";
import PatientForm from "../Forms/PatientForm";
import AppointmentForm from "../Forms/AppointmentForm";
import { Button } from "@/components/ui/button";

const QuickActionsCard = () => {
	const [activeModal, setActiveModal] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<>
			<div className="flex flex-col gap-2">
				<Button
					className="w-full justify-start"
					onClick={() => setActiveModal("addPatient")}
				>
					<Plus />
					New patient
				</Button>

				<Button
					variant="outline"
					className="w-full justify-start"
					onClick={() => setActiveModal("scheduleAppointment")}
				>
					<CalendarCheck />
					Schedule visit
				</Button>
			</div>

			{activeModal === "addPatient" ? (
				<PatientForm onClose={handleCloseModal} />
			) : null}
			{activeModal === "scheduleAppointment" ? (
				<AppointmentForm onClose={handleCloseModal} />
			) : null}
		</>
	);
};

export default QuickActionsCard;
