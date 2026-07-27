import React from "react";

const stats = [
	{ value: "5 min", label: "Average setup time" },
	{ value: "100%", label: "Your data, your practice" },
	{ value: "24/7", label: "Access from any device" },
];

const Mission = () => {
	return (
		<section id="about" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">Our mission</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Healthcare software that stays out of the way
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						We empower family doctors, general practitioners and small clinics
						with intuitive, secure record keeping, so they can deliver
						exceptional care without fighting their tools.
					</p>
				</div>

				<dl className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-3">
					{stats.map((stat) => (
						<div key={stat.label} className="flex flex-col items-center gap-1">
							<dt className="font-heading text-3xl font-semibold tracking-tight">
								{stat.value}
							</dt>
							<dd className="text-sm text-muted-foreground">{stat.label}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
};

export default Mission;
