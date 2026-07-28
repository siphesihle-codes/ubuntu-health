import React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useAuth";
import ClientDate from "./ClientDate";

const TrialBanner = () => {
	const { data: profile } = useCurrentUser();

	if (!profile?.trialEndsAt || profile.isTrialExpired) return null;

	const daysRemaining = profile.trialDaysRemaining;

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 rounded-md border border-warning bg-warning px-4 py-3 text-warning-foreground">
			<div className="flex items-center gap-2.5">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-warning-foreground/15 text-warning-foreground">
					<Clock className="size-4" />
				</span>
				<div className="flex flex-col">
					<span className="text-sm font-medium">
						{daysRemaining} {daysRemaining === 1 ? "day" : "days"} left in your
						free trial
					</span>
					<span className="text-xs text-warning-foreground/80">
						Access ends on <ClientDate dateString={profile.trialEndsAt} />
					</span>
				</div>
			</div>

			<Button size="sm" render={<Link href={`/billing/${profile.tenantId}`} />}>
				Upgrade
			</Button>
		</div>
	);
};

export default TrialBanner;
