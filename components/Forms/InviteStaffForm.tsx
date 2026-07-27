import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateInvitation } from "@/hooks/useStaff";
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/types";
import type { Role } from "@/types";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface InviteStaffFormProps {
	canInviteAdmins: boolean;
	onClose: () => void;
}

const inviteUrl = (token: string) =>
	typeof window === "undefined"
		? `/invite/${token}`
		: `${window.location.origin}/invite/${token}`;

export default function InviteStaffForm({
	canInviteAdmins,
	onClose,
}: InviteStaffFormProps) {
	const [inviteLink, setInviteLink] = useState("");
	const [copied, setCopied] = useState(false);
	const createInvitation = useCreateInvitation();
	const isLoading = createInvitation.isPending;

	const roles = (Object.keys(ROLE_LABELS) as Role[]).filter(
		(role) => role !== "admin" || canInviteAdmins
	);

	const formik = useFormik({
		initialValues: {
			email: "",
			role: "receptionist" as Role,
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email").required("Required"),
			role: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			createInvitation.mutate(values, {
				onSuccess: (invitation) => {
					setInviteLink(inviteUrl(invitation.token));
					toast.success(`Invitation created for ${invitation.email}`);
				},
				onError: (error) => toast.error(error.message),
			});
		},
	});

	const handleCopy = async () => {
		await navigator.clipboard.writeText(inviteLink);
		setCopied(true);
		toast.success("Invite link copied");
	};

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="sm:max-w-lg">
				{inviteLink ? (
					<>
						<DialogHeader>
							<DialogTitle>Invitation ready</DialogTitle>
							<DialogDescription>
								Send this link to {formik.values.email}. It expires in 7 days and
								can only be used once.
							</DialogDescription>
						</DialogHeader>

						<div className="flex flex-col gap-2">
							<Label htmlFor="inviteLink">Invite link</Label>
							<div className="flex gap-2">
								<Input id="inviteLink" readOnly value={inviteLink} />
								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={handleCopy}
									aria-label="Copy invite link"
								>
									{copied ? <Check /> : <Copy />}
								</Button>
							</div>
						</div>

						<DialogFooter>
							<Button type="button" onClick={onClose}>
								Done
							</Button>
						</DialogFooter>
					</>
				) : (
					<form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
						<DialogHeader>
							<DialogTitle>Invite a team member</DialogTitle>
							<DialogDescription>
								They choose their own password. You decide what they can access.
							</DialogDescription>
						</DialogHeader>

						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									placeholder="colleague@clinic.co.za"
									disabled={isLoading}
									aria-invalid={
										Boolean(formik.touched.email && formik.errors.email) ||
										undefined
									}
								/>
								{formik.touched.email && formik.errors.email ? (
									<p className="text-xs text-destructive">
										{formik.errors.email}
									</p>
								) : null}
							</div>

							<div className="flex flex-col gap-2">
								<Label htmlFor="role">Role</Label>
								<Select
									value={formik.values.role}
									onValueChange={(value) =>
										formik.setFieldValue("role", value ?? "")
									}
								>
									<SelectTrigger id="role" className="w-full">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>
									<SelectContent>
										{roles.map((role) => (
											<SelectItem key={role} value={role}>
												{ROLE_LABELS[role]}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="text-xs text-muted-foreground">
									{ROLE_DESCRIPTIONS[formik.values.role]}
								</p>
							</div>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="animate-spin" />
										Creating...
									</>
								) : (
									"Create invitation"
								)}
							</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
