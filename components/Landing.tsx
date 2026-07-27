import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Landing = () => {
	return (
		<section className="relative overflow-hidden border-b bg-muted/30">
			<div
				aria-hidden
				className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
			/>

			<div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
					<Badge variant="secondary" className="mb-6 gap-1.5">
						<ShieldCheck />
						POPIA-conscious records
					</Badge>

					<h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
						Modern EMR built for{" "}
						<span className="text-primary">independent</span> practitioners
					</h1>

					<p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
						Ubuntu Health brings patients, appointments, prescriptions and
						billing into one calm workspace, so you spend less time on admin and
						more with the people in front of you.
					</p>

					<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
						<Button
							size="lg"
							render={
								<Link href={{ pathname: "/signup", query: { plan: "free" } }} />
							}
						>
							Start 30-day free trial
							<ArrowRight data-icon="inline-end" />
						</Button>
						<Button size="lg" variant="outline" render={<Link href="/login" />}>
							Sign in
						</Button>
					</div>

					<p className="mt-4 text-xs text-muted-foreground">
						No credit card required. Cancel anytime.
					</p>
				</div>

				<div className="mt-16 lg:mt-20">
					<div className="relative mx-auto aspect-16/10 w-full max-w-4xl overflow-hidden rounded-4xl bg-card shadow-xl ring-1 ring-foreground/10">
						<Image
							src="/dashboard.png"
							alt="Ubuntu Health EMR dashboard"
							fill
							priority
							className="object-cover object-top"
							sizes="(max-width: 1024px) 100vw, 896px"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
