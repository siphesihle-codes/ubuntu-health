import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const cuts = [
	{
		id: "teaser",
		label: "90-second overview",
		description:
			"The short version: sign in, work through a day in the diary, open a patient, write a script, raise the invoice.",
		src: "/video/ubuntu-health-teaser",
	},
	{
		id: "tour",
		label: "Full three-minute tour",
		description:
			"The longer version, covering the patient file in depth, prescriptions and printed scripts, invoicing, staff roles and bringing your existing records across.",
		src: "/video/ubuntu-health-tour",
	},
];

const Demo = () => {
	const [activeCut, setActiveCut] = useState(cuts[0]);

	return (
		<section id="demo" className="border-b bg-muted/30">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">See it working</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						A real walkthrough, not a mockup
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						{activeCut.description}
					</p>
				</div>

				<div className="mt-8 flex flex-wrap justify-center gap-2">
					{cuts.map((cut) => (
						<Button
							key={cut.id}
							size="sm"
							variant={cut.id === activeCut.id ? "default" : "outline"}
							onClick={() => setActiveCut(cut)}
						>
							{cut.label}
						</Button>
					))}
				</div>

				<div className="mx-auto mt-10 w-full max-w-4xl overflow-hidden rounded-md bg-card shadow-xl ring-1 ring-foreground/10">
					<video
						key={activeCut.id}
						className="aspect-16/10 w-full"
						controls
						playsInline
						preload="metadata"
						poster="/screens/dashboard.png"
					>
						<source src={`${activeCut.src}.mp4`} type="video/mp4" />
						<source src={`${activeCut.src}.webm`} type="video/webm" />
						Your browser cannot play this video.
					</video>
				</div>
			</div>
		</section>
	);
};

export default Demo;
