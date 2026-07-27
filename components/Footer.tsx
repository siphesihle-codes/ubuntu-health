import Link from "next/link";
import React from "react";
import { Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
	return (
		<footer className="border-t bg-muted/40">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-semibold sm:text-4xl">
						Ready to transform your practice?
					</h2>
					<p className="mt-4 text-base text-muted-foreground">
						An intuitive, affordable EHR that saves time and improves patient
						care. No card required to start.
					</p>
					<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Button
							size="lg"
							render={
								<Link href={{ pathname: "/signup", query: { plan: "free" } }} />
							}
						>
							Start free trial
							<ArrowRight data-icon="inline-end" />
						</Button>
						<Button size="lg" variant="outline" render={<Link href="/login" />}>
							Sign in
						</Button>
					</div>
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
					<div className="flex items-center gap-2.5">
						<span className="flex size-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
							<Activity className="size-4" />
						</span>
						<span className="font-heading text-sm font-semibold">
							Ubuntu Health
						</span>
					</div>
					<nav className="flex items-center gap-5">
						<Link
							href="/terms"
							className="text-xs text-muted-foreground transition-colors hover:text-foreground"
						>
							Terms of Service
						</Link>
						<Link
							href="/policy"
							className="text-xs text-muted-foreground transition-colors hover:text-foreground"
						>
							Privacy Policy
						</Link>
					</nav>

					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} Ubuntu Health. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
