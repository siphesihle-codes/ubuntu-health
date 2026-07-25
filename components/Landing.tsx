import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Landing = () => {
	return (
		<section className="bg-gradient-to-r from-blue-200 to-gray-50 py-16">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
				<div className="md:w-1/2 mb-10 md:mb-0">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
						Modern EMR Designed for{" "}
						<span className="text-blue-600">Independent</span> Practitioners
					</h1>
					<p className="text-lg text-gray-700 mb-8">
						Streamline your practice with an intuitive, affordable EHR solution
						that saves time and improves patient care.
					</p>
					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
						<Link
							href={{
								pathname: "/signup",
								query: { plan: "free" },
							}}
							className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700
              font-medium flex items-center"
						>
							Start 30-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</div>
				</div>
				<div className="md:w-1/2 flex justify-center">
					<div className="relative w-full max-w-lg h-80 md:h-96">
						<Image
							src="/dashboard.png"
							alt="Ubuntu Health EMR Dashboard"
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
