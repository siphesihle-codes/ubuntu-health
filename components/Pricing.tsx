import Link from "next/link";
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SALES_EMAIL, SUBSCRIPTION_PLANS, TRIAL_LENGTH_DAYS } from "@/types";
import { cn } from "@/lib/utils";

const rand = (amount: number) => `R${amount.toLocaleString("en-ZA")}`;

const Pricing = () => {
	return (
		<section id="pricing" className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-medium text-primary">Pricing</p>
					<h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
						Plans that scale with your practice
					</h2>
					<p className="mt-5 text-base text-muted-foreground">
						Priced per practitioner. Reception and nursing staff are unlimited on
						every plan, and every plan starts with a {TRIAL_LENGTH_DAYS}-day
						free trial.
					</p>
				</div>

				<div className="mt-14 grid items-start gap-6 md:grid-cols-3">
					{SUBSCRIPTION_PLANS.map((plan) => (
						<Card
							key={plan.name}
							className={cn(
								"relative",
								plan.popular && "ring-2 ring-primary md:-mt-4"
							)}
						>
							{plan.popular ? (
								<Badge className="absolute top-6 right-6">Most popular</Badge>
							) : null}

							<CardHeader>
								<h3 className="font-heading text-lg font-medium">{plan.name}</h3>
								<p className="text-sm text-muted-foreground">
									{plan.description}
								</p>
								<p className="mt-4 flex items-baseline gap-1">
									<span className="font-heading text-4xl font-semibold tracking-tight">
										{rand(plan.price)}
									</span>
									<span className="text-sm text-muted-foreground">/ month</span>
								</p>
								{plan.practitioners > 1 ? (
									<p className="text-xs text-muted-foreground">
										{rand(Math.round(plan.price / plan.practitioners))} per
										practitioner
									</p>
								) : null}
							</CardHeader>

							<CardContent>
								<ul className="flex flex-col gap-3">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start gap-2.5">
											<span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
												<Check className="size-3" />
											</span>
											<span className="text-sm">{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>

							<CardFooter>
								<Button
									className="w-full"
									variant={plan.popular ? "default" : "outline"}
									render={
										<Link
											href={{
												pathname: "/signup",
												query: { plan: plan.name.toLowerCase() },
											}}
										/>
									}
								>
									Get started
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				<p className="mt-10 text-center text-sm text-muted-foreground">
					Larger practice?{" "}
					<a
						href={`mailto:${SALES_EMAIL}`}
						className="text-foreground underline-offset-4 hover:underline"
					>
						Talk to us
					</a>{" "}
					about a plan sized for your team.
				</p>
			</div>
		</section>
	);
};

export default Pricing;
