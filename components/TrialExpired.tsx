import React from "react";
import Link from "next/link";
import { Download, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useAuth";
import { useExportPractice } from "@/hooks/useExport";

const TrialExpired = () => {
	const { data: profile } = useCurrentUser();
	const exportPractice = useExportPractice();

	const isAdmin = profile?.roles.includes("admin") ?? false;

	const handleExport = () => {
		exportPractice.mutate(undefined, {
			onSuccess: () => toast.success("Your practice records have been exported"),
			onError: (error) => toast.error(error.message),
		});
	};

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-center gap-2.5">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/15 text-destructive">
					<Lock className="size-4" />
				</span>
				<div className="flex flex-col">
					<span className="text-sm font-medium">Your free trial has ended</span>
					<span className="text-xs text-muted-foreground">
						{isAdmin
							? "Your records stay readable and exportable. Choose a plan to start capturing again."
							: "Your records stay readable. Ask your practice administrator to choose a plan."}
					</span>
				</div>
			</div>

			{isAdmin ? (
				<div className="flex shrink-0 items-center gap-2">
					<Button
						size="sm"
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
					<Button size="sm" render={<Link href={`/billing/${profile?.tenantId}`} />}>
						Choose a plan
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default TrialExpired;
