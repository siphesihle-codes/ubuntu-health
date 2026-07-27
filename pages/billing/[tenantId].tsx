import React from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import UpgradePlans from "@/components/UpgradePlans";
import PracticeImport from "@/components/PracticeImport";
import { useCurrentUser } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useExportPractice } from "@/hooks/useExport";
import { SALES_EMAIL, TRIAL_LENGTH_DAYS } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const BillingBoard = () => {
	const { data: profile } = useCurrentUser();
	const { data: subscription, isPending } = useSubscription();
	const exportPractice = useExportPractice();

	const isAdmin = profile?.roles.includes("admin") ?? false;

	const handleExport = () => {
		exportPractice.mutate(undefined, {
			onSuccess: () => toast.success("Your practice records have been exported"),
			onError: (error) => toast.error(error.message),
		});
	};

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
					{isAdmin ? (
						<CardAction>
							<Button
								size="xs"
								variant="outline"
								onClick={handleExport}
								disabled={exportPractice.isPending}
							>
								{exportPractice.isPending ? (
									<>
										<Loader2 className="animate-spin" />
										Exporting...
									</>
								) : (
									<>
										<Download />
										Export records
									</>
								)}
							</Button>
						</CardAction>
					) : null}
					<CardDescription>
						{isTrial
							? `You are on a ${TRIAL_LENGTH_DAYS}-day free trial. Confirm a plan before it ends to keep access.`
							: "Your practice is on a paid plan."}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap items-center gap-6">
					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">Plan</span>
						<div className="flex items-center gap-2">
							<Badge variant="secondary">{subscription.plan}</Badge>
							{isTrial ? <Badge variant="outline">Free trial</Badge> : null}
						</div>
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

					<div className="flex flex-col gap-1">
						<span className="text-xs text-muted-foreground">
							Practitioner seats
						</span>
						<span className="text-sm font-medium">
							{subscription.practitionersInUse} of{" "}
							{subscription.practitionerSeats} used
						</span>
					</div>
				</CardContent>
			</Card>

			<div className="flex flex-col gap-1">
				<h2 className="font-heading text-lg font-medium">
					{isTrial ? "Choose a plan" : "Change your plan"}
				</h2>
				<p className="text-sm text-muted-foreground">
					{isAdmin
						? "Doctors and practice owners use a practitioner seat. Reception and nursing staff are unlimited on every plan."
						: "Only practice administrators can change the plan."}
				</p>
			</div>

			<UpgradePlans
				currentPlan={subscription.plan}
				practitionersInUse={subscription.practitionersInUse}
				isTrial={isTrial}
				canUpgrade={isAdmin}
			/>

			{isAdmin ? <PracticeImport /> : null}

			<p className="text-sm text-muted-foreground">
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
	);
};

const BillingPage = () => (
	<Layout title="Billing" description="Your plan and subscription">
		<BillingBoard />
	</Layout>
);

export default BillingPage;
