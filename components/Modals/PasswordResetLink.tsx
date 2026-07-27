import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import type { PasswordResetLink as ResetLink } from "@/hooks/useStaff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface PasswordResetLinkProps {
	reset: ResetLink;
	onClose: () => void;
}

const resetUrl = (reset: ResetLink) => {
	const path = `/reset-password?userId=${encodeURIComponent(
		reset.userId
	)}&token=${encodeURIComponent(reset.token)}`;

	return typeof window === "undefined"
		? path
		: `${window.location.origin}${path}`;
};

const PasswordResetLink = ({ reset, onClose }: PasswordResetLinkProps) => {
	const [copied, setCopied] = useState(false);
	const link = resetUrl(reset);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(link);
		setCopied(true);
		toast.success("Reset link copied");
	};

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Password reset link</DialogTitle>
					<DialogDescription>
						Give this link to {reset.email} directly. It works once and expires
						in 24 hours.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col gap-2">
					<Label htmlFor="resetLink">Reset link</Label>
					<div className="flex gap-2">
						<Input id="resetLink" readOnly value={link} />
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={handleCopy}
							aria-label="Copy reset link"
						>
							{copied ? <Check /> : <Copy />}
						</Button>
					</div>
					<p className="text-xs text-muted-foreground">
						Anyone holding this link can set that person&apos;s password. Do not
						post it in a shared channel.
					</p>
				</div>

				<DialogFooter>
					<Button type="button" onClick={onClose}>
						Done
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PasswordResetLink;
