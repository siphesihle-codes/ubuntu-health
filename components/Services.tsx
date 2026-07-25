import React from "react";
import { Stethoscope, Calendar, Pill, FileText } from "lucide-react";

function Services() {
	return (
		<section id="services" className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						What we offer
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Everything you need to run your practice efficiently, all in one
						place
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Patient Management */}
					<div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100
                    hover:shadow-md hover:bg-blue-600 group transition-all duration-400
                    ease-in-out hover:scale-105"
					>
						<div
							className="w-12 h-12 rounded-full flex items-center justify-center mb-4
            group-hover:bg-blue-500"
						>
							<Stethoscope className="text-blue-600 h-5 w-5 group-hover:text-white" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-white">
							Patient Management
						</h2>
						<p className="text-gray-600 group-hover:text-white">
							Comprehensive tools for storing and managing patient demographics,
							medical history, and treatment plans.
						</p>
					</div>

					{/* Appointment Scheduling */}
					<div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100
                    hover:shadow-md hover:bg-blue-600 group transition-all duration-400
                    ease-in-out hover:scale-105"
					>
						<div
							className="w-12 h-12 rounded-full flex items-center justify-center mb-4
            group-hover:bg-blue-500"
						>
							<Calendar className="text-blue-600 h-5 w-5 group-hover:text-white" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-white">
							Appointment Scheduling
						</h2>
						<p className="text-gray-600 group-hover:text-white">
							Flexible scheduling with automated reminders and notifications for
							practitioners and patients.
						</p>
					</div>

					{/* E-Prescriptions */}
					<div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100
                    hover:shadow-md hover:bg-blue-600 group transition-all duration-400
                    ease-in-out hover:scale-105"
					>
						<div
							className="w-12 h-12 rounded-full flex items-center justify-center mb-4
            group-hover:bg-blue-500"
						>
							<Pill className="text-blue-600 h-5 w-5 group-hover:text-white" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-white">
							E-Prescriptions
						</h2>
						<p className="text-gray-600 group-hover:text-white">
							Generate electronic prescriptions with ease, reducing errors and
							improving medication management.
						</p>
					</div>

					{/* Billing and Invoicing */}
					<div
						className="bg-white p-6 rounded-lg shadow-sm border border-gray-100
                    hover:shadow-md hover:bg-blue-600 group transition-all duration-400
                    ease-in-out hover:scale-105"
					>
						<div
							className="w-12 h-12 rounded-full flex items-center justify-center mb-4
            group-hover:bg-blue-500"
						>
							<FileText className="text-blue-600 h-5 w-5 group-hover:text-white" />
						</div>
						<h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-white">
							Invoicing
						</h2>
						<p className="text-gray-600 group-hover:text-white">
							Automate billing processes and generate invoices seamlessly with
							insurance integration.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Services;
