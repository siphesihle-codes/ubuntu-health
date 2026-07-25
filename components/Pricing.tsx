import Link from "next/link";
import React from "react";
import { CircleCheck } from "lucide-react";

const Pricing = () => {
	const plans = [
		{
			name: "Basic",
			price: 499,
			features: ["Patient Management"],
			popular: false,
		},
		{
			name: "Standard",
			price: 999,
			features: [
				"Patient Management",
				"Appointment Scheduling",
				"E-Prescriptions",
			],
			popular: true,
		},
		{
			name: "Premium",
			price: 1499,
			features: [
				"Patient Management",
				"Appointment Scheduling",
				"E-Prescriptions",
				"Invoicing",
				"Secure Communication",
			],
			popular: false,
		},
	];

	return (
		<section id="pricing" className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						Our Pricing Plan
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Unlock the full potential of our EHR SAAS platform with flexible
						pricing plans tailored to your practice&lsquo;s needs.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`border rounded-lg p-6 ${
								plan.popular ? "border-2 border-blue-600" : "border-gray-400"
							}`}
						>
							{plan.popular && (
								<div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl rounded-tr absolute top-0 right-0">
									POPULAR
								</div>
							)}
							<h2 className="text-xl font-semibold text-gray-800 mb-2">
								{plan.name}
							</h2>
							<p className="text-3xl font-bold text-blue-600 mb-4">
								R{plan.price}
								<span className="text-base font-normal text-gray-500">
									/ Month
								</span>
							</p>
							<ul className="space-y-3 mb-6 text-black">
								{plan.features.map((feature) => (
									<li className="flex items-center" key={feature}>
										<CircleCheck className="text-blue-500 h-4 w-4 mr-2" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Link
								href={{
									pathname: "/signup",
									query: { plan: plan.name.toLowerCase() },
								}}
								className={`block w-full py-2 text-center rounded-md ${
									plan.popular
										? "bg-blue-600 text-white hover:bg-blue-700"
										: "border border-blue-600 text-blue-600 hover:bg-blue-50"
								}`}
							>
								Sign Up
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
