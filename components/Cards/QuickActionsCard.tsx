import React, { useState } from "react";
import PatientForm from "../Forms/PatientForm";
import AppointmentForm from "../Forms/AppointmentForm";

const QuickActionsCard = () => {
	const [activeModal, setActiveModal] = useState("");
	const handleCloseModal = () => setActiveModal("");

	return (
		<>
			<div className="space-y-4">
				<button
					onClick={() => setActiveModal("addPatient")}
					className="w-full bg-gradient-to-r from-cyan-500 to-blue-500  py-2 rounded-md 
                hover:shadow-cyan-500/30 shadow-lg transition-all mb-3 font-medium"
				>
					Add New Patient
				</button>

				<button
					onClick={() => setActiveModal("scheduleAppointment")}
					className="w-full bg-gradient-to-r from-blue-500 to-indigo-500  py-2 rounded-md 
                hover:shadow-blue-500/30 shadow-lg transition-all font-medium"
				>
					Schedule Appointment
				</button>
			</div>
			{/* Modal Overlay */}
			{activeModal && (
				<div>
					{activeModal === "addPatient" && (
						<PatientForm onClose={handleCloseModal} />
					)}
					{activeModal === "scheduleAppointment" && (
						<AppointmentForm onClose={handleCloseModal} />
					)}
				</div>
			)}
		</>
	);
};

export default QuickActionsCard;
