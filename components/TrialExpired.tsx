import React from "react";
import { Lock } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import UpgradePlans from "./UpgradePlans";

const TrialExpired = () => {
	const { data: profile } = useCurrentUser();
	const { data: subscription } = useSubscription();
	const isAdmin = profile?.roles.includes("admin") ?? false;

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col gap-10 py-6">
			<div className="flex flex-col items-center text-center">
				<span className="flex size-12 items-center justify-center rounded-3xl bg-destructive/10 text-destructive">
					<Lock className="size-5" />
				</span>
				<h2 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
					Your free trial has ended
				</h2>
				<p className="mt-2 max-w-lg text-sm text-muted-foreground">
					{isAdmin
						? "Choose a plan to restore access to patients, appointments, prescriptions and billing. Your practice data is safe and waiting for you."
						: "Ask your practice administrator to choose a plan. Your practice data is safe and waiting."}
				</p>
			</div>

			<UpgradePlans
				currentPlan={subscription?.plan ?? profile?.subscriptionPlan}
				practitionersInUse={subscription?.practitionersInUse ?? 0}
				isTrial
				canUpgrade={isAdmin}
			/>
		</div>
	);
};

export default TrialExpired;
