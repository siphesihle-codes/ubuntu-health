"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
	LayoutDashboard,
	CalendarCheck,
	Users,
	PillBottle,
	CreditCard,
	Menu,
	X,
} from "lucide-react";
import PatientForm from "./Forms/PatientForm";
import AppointmentForm from "./Forms/AppointmentForm";

const DashboardNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeModal, setActiveModal] = useState("");
	const [tenantId, setTenantId] = useState<string | null>(null);
	const handleCloseModal = () => setActiveModal("");

	useEffect(() => {
		const storedtenantId = localStorage.getItem("tenantId");
		setTenantId(storedtenantId);
	}, []);

	const navItems = [
		{
			name: "Dashboard",
			href: `/dashboard/${tenantId}`,
			icon: LayoutDashboard,
		},
		{
			name: "Appointments",
			href: `/appointments/${tenantId}`,
			icon: CalendarCheck,
		},
		{
			name: "Patients",
			href: `/patients/${tenantId}`,
			icon: Users,
		},
		{
			name: "Prescriptions",
			href: `/prescriptions/${tenantId}`,
			icon: PillBottle,
		},
		{
			name: "Invoices",
			href: `/invoices/${tenantId}`,
			icon: CreditCard,
		},
	];

	return (
		<>
			<button
				type="button"
				className="md:hidden mb-auto fixed top-4 left-4 z-50 p-2 border border-cyan-400/20
        rounded-full shadow-lg  "
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X className="" /> : <Menu className="" />}
			</button>

			<nav
				className={`bg-inherit text-inherit
                fixed top-0 left-0 h-screen w-64 border-r transform transition-transform
                duration-300 ease-in-out md:relative md:translate-x-0 md:w-full md:max-w-xs 
                ${isOpen ? "translate-x-0 pt-16" : "-translate-x-full"}
                z-40`}
			>
				<div className="flex flex-col h-full">
					<div className="p-6 hidden md:block border-b text-blue-600">
						<h2 className="text-2xl font-semibold">MediSys</h2>
						<p className="text-xs  tracking-wider">CLINIC PORTAL</p>
					</div>

					<ul className="py-4 flex-grow overflow-y-auto">
						{navItems.map((item, index) => {
							const Icon = item.icon;
							return (
								<li key={index} className="group">
									<Link
										href={item.href}
										className="flex items-center px-6 py-3 hover:bg-blue-200 hover:text-blue-600
                    transition-colors duration-300 rounded-lg mx-2"
									>
										<Icon className="mr-4" size={20} />
										<span className="font-medium">{item.name}</span>
									</Link>
								</li>
							);
						})}
					</ul>
					<div className="p-4 border-t text-white">
						<button
							type="button"
							onClick={() => setActiveModal("addPatient")}
							className="w-full bg-blue-600 py-2 rounded-md hover:bg-blue-700 shadow-lg
              transition-all mb-3 font-medium"
						>
							Add New Patient
						</button>

						<button
							type="button"
							onClick={() => setActiveModal("scheduleAppointment")}
							className="w-full bg-blue-600 py-2 rounded-md hover:bg-blue-700 shadow-lg
              transition-all font-medium"
						>
							Schedule Appointment
						</button>
					</div>
				</div>
			</nav>
			{isOpen && (
				<button
					type="button"
					className="fixed inset-0 backdrop-blur-sm z-30 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

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

export default DashboardNav;
