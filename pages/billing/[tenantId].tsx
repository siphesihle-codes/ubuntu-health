import React from "react";
import { Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import UpgradePlans from "@/components/UpgradePlans";
import { useCurrentUser } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { TRIAL_LENGTH_DAYS } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const BillingBoard = () => {
	const { data: profile } = useCurrentUser();
	const { data: subscription, isPending } = useSubscription();

	const isAdmin = profile?.roles.includes("admin") ?? false;

	if (isPending || !subscription) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center gap-2 py-14 text-sm text-muted-foreground">
					<Loader2 className="size-4 animate-spin" />
					Loading your plan...
				</CardContent>
			</Card>
		);
	}

	const isTrial = subscription.trialEndsAt !== null;

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Current plan</CardTitle>
					<CardDescription>
						{isTrial
							? `Your ${TRIAL_LENGTH_DAYS}-day free trial gives you the full practice workspace.`
							: "Your practice is on a paid plan."}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap items-center gap-6">
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Plan</span>
						<Badge variant="secondary">
							{isTrial ? "Free trial" : subscription.plan}
						</Badge>
					</div>

					{subscription.trialEndsAt ? (
						<>
							<div className="flex flex-col gap-1">
								<span className="text-xs text-muted-foreground">
									{subscription.isTrialExpired ? "Ended on" : "Ends on"}
								</span>
								<span className="text-sm font-medium">
									<ClientDate dateString={subscription.trialEndsAt} />
								</span>
							</div>
							<div className="flex flex-col gap-1">
								<span className="text-xs text-muted-foreground">Remaining</span>
								<span className="text-sm font-medium">
									{subscription.isTrialExpired
										? "Trial ended"
										: `${subscription.trialDaysRemaining} ${
												subscription.trialDaysRemaining === 1 ? "day" : "days"
											}`}
								</span>
							</div>
						</>
					) : null}
				</CardContent>
			</Card>

			<div className="flex flex-col gap-1">
				<h2 className="font-heading text-lg font-medium">
					{isTrial ? "Choose a plan" : "Change your plan"}
				</h2>
				<p className="text-sm text-muted-foreground">
					{isAdmin
						? "Plans take effect immediately and end your free trial."
						: "Only practice administrators can change the plan."}
				</p>
			</div>

			<UpgradePlans currentPlan={subscription.plan} canUpgrade={isAdmin} />
		</div>
	);
};

const BillingPage = () => (
	<Layout title="Billing" description="Your plan and subscription">
		<BillingBoard />
	</Layout>
);

export default BillingPage;
