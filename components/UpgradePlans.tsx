import React from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useUpgradeSubscription } from "@/hooks/useSubscription";
import { SUBSCRIPTION_PLANS } from "@/types";
import type { SubscriptionPlanName } from "@/types";
import { cn } from "@/lib/utils";

interface UpgradePlansProps {
	currentPlan: string | null | undefined;
	canUpgrade: boolean;
}

const UpgradePlans = ({ currentPlan, canUpgrade }: UpgradePlansProps) => {
	const upgrade = useUpgradeSubscription();

	const handleUpgrade = (plan: SubscriptionPlanName) => {
		upgrade.mutate(plan, {
			onSuccess: () => toast.success(`Your practice is now on the ${plan} plan`),
			onError: (error) => toast.error(error.message),
		});
	};

	return (
		<div className="grid items-start gap-6 md:grid-cols-3">
			{SUBSCRIPTION_PLANS.map((plan) => {
				const isCurrentPlan = currentPlan === plan.name;
				const isUpgrading = upgrade.isPending && upgrade.variables === plan.name;

				return (
					<Card
						key={plan.name}
						className={cn("relative", plan.popular && "ring-2 ring-primary")}
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
									R{plan.price}
								</span>
								<span className="text-sm text-muted-foreground">/ month</span>
							</p>
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
								disabled={!canUpgrade || isCurrentPlan || upgrade.isPending}
								onClick={() => handleUpgrade(plan.name)}
							>
								{isUpgrading ? (
									<>
										<Loader2 className="animate-spin" />
										Activating...
									</>
								) : isCurrentPlan ? (
									"Current plan"
								) : (
									`Choose ${plan.name}`
								)}
							</Button>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
};

export default UpgradePlans;
