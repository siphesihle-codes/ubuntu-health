import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<section className="py-16 bg-blue-600 text-white">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl font-bold mb-6">
					Ready to Transform Your Practice?
				</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Transform your practice with an intuitive, affordable EHR solution
					that saves time and improves patient care.
				</p>
				<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
					<Link
						href={{
							pathname: "/signup",
							query: { plan: "free" },
						}}
						className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md
            hover:bg-white hover:text-blue-600 hover:scale-105 hover:font-medium flex
            items-center transition-transform duration-300"
					>
						Start Free Trial!
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Footer;
