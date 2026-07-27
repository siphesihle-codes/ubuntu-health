import React, { useState } from "react";
import {
	Loader2,
	MailPlus,
	ShieldCheck,
	Stethoscope,
	UserPlus,
	Users,
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import InviteStaffForm from "@/components/Forms/InviteStaffForm";
import { useCurrentUser } from "@/hooks/useAuth";
import {
	useInvitations,
	useRevokeInvitation,
	useStaff,
	useUpdateStaffRole,
	useUpdateStaffStatus,
} from "@/hooks/useStaff";
import { useSubscription } from "@/hooks/useSubscription";
import { ROLE_LABELS } from "@/types";
import type { Role, StaffMember } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const fullName = (staffMember: StaffMember) =>
	[staffMember.firstName, staffMember.lastName].filter(Boolean).join(" ") ||
	staffMember.email;

const AdminBoard = () => {
	const [isInviting, setIsInviting] = useState(false);

	const { data: profile } = useCurrentUser();
	const { data: staff = [], isPending: staffPending } = useStaff();
	const { data: invitations = [] } = useInvitations();
	const { data: subscription } = useSubscription();

	const updateRole = useUpdateStaffRole();
	const updateStatus = useUpdateStaffStatus();
	const revokeInvitation = useRevokeInvitation();

	const isOwner = Boolean(profile?.isOwner);

	const canManage = (staffMember: StaffMember) => {
		if (staffMember.isOwner) return false;
		if (staffMember.id === profile?.id) return false;
		if (staffMember.roles.includes("admin") && !isOwner) return false;
		return true;
	};

	const handleRoleChange = (staffMember: StaffMember, role: Role) => {
		if (staffMember.roles[0] === role) return;

		updateRole.mutate(
			{ id: staffMember.id, role },
			{
				onSuccess: () =>
					toast.success(
						`${fullName(staffMember)} is now a ${ROLE_LABELS[role].toLowerCase()}`
					),
				onError: (error) => toast.error(error.message),
			}
		);
	};

	const handleStatusChange = (staffMember: StaffMember) => {
		const isActive = !staffMember.isActive;

		updateStatus.mutate(
			{ id: staffMember.id, isActive },
			{
				onSuccess: () =>
					toast.success(
						`${fullName(staffMember)} ${isActive ? "reactivated" : "deactivated"}`
					),
				onError: (error) => toast.error(error.message),
			}
		);
	};

	const handleRevoke = (id: number, email: string) => {
		revokeInvitation.mutate(id, {
			onSuccess: () => toast.success(`Invitation for ${email} revoked`),
			onError: (error) => toast.error(error.message),
		});
	};

	const stats = [
		{
			label: "Team members",
			value: staff.length.toLocaleString(),
			icon: Users,
		},
		{
			label: "Active",
			value: staff.filter((member) => member.isActive).length.toLocaleString(),
			icon: ShieldCheck,
		},
		{
			label: "Pending invites",
			value: invitations.length.toLocaleString(),
			icon: MailPlus,
		},
		...(subscription
			? [
					{
						label: "Practitioner seats",
						value: `${subscription.practitionersInUse} of ${subscription.practitionerSeats}`,
						icon: Stethoscope,
					},
				]
			: []),
	];

	return (
		<>
			<div className="flex max-w-7xl flex-col gap-6">
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.label} size="sm">
							<CardContent className="flex items-center justify-between gap-4">
								<div className="flex min-w-0 flex-col gap-1">
									<span className="truncate text-xs text-muted-foreground">
										{stat.label}
									</span>
									<span className="font-heading text-2xl font-semibold tracking-tight">
										{stat.value}
									</span>
								</div>
								<span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted">
									<stat.icon className="size-5" />
								</span>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<h2 className="text-sm font-medium">Team</h2>
						<Button size="sm" onClick={() => setIsInviting(true)}>
							<UserPlus />
							<span className="hidden sm:inline">Invite member</span>
						</Button>
					</div>

					<Card className="p-0 [--card-spacing:0px]">
						{staffPending ? (
							<div className="flex items-center justify-center gap-2 px-6 py-14 text-sm text-muted-foreground">
								<Loader2 className="size-4 animate-spin" />
								Loading your team...
							</div>
						) : (
							<div className="overflow-auto">
								<Table>
									<TableHeader className="sticky top-0 z-10 bg-card">
										<TableRow>
											<TableHead className="px-6">Name</TableHead>
											<TableHead className="px-6">Email</TableHead>
											<TableHead className="px-6">Role</TableHead>
											<TableHead className="px-6">Status</TableHead>
											<TableHead className="px-6 text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{staff.map((staffMember) => (
											<TableRow key={staffMember.id}>
												<TableCell className="px-6 py-3">
													<div className="flex items-center gap-2">
														<span className="font-medium">
															{fullName(staffMember)}
														</span>
														{staffMember.isOwner ? <Badge>Owner</Badge> : null}
														{staffMember.id === profile?.id ? (
															<Badge variant="outline">You</Badge>
														) : null}
													</div>
												</TableCell>
												<TableCell className="px-6 py-3 text-muted-foreground">
													{staffMember.email}
												</TableCell>
												<TableCell className="px-6 py-3">
													{canManage(staffMember) ? (
														<Select
															value={staffMember.roles[0]}
															onValueChange={(value) =>
																handleRoleChange(staffMember, value as Role)
															}
														>
															<SelectTrigger className="w-40">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																{(Object.keys(ROLE_LABELS) as Role[])
																	.filter((role) => role !== "admin" || isOwner)
																	.map((role) => (
																		<SelectItem key={role} value={role}>
																			{ROLE_LABELS[role]}
																		</SelectItem>
																	))}
															</SelectContent>
														</Select>
													) : (
														<Badge variant="secondary">
															{staffMember.roles
																.map((role) => ROLE_LABELS[role])
																.join(", ")}
														</Badge>
													)}
												</TableCell>
												<TableCell className="px-6 py-3">
													<Badge
														variant={
															staffMember.isActive ? "secondary" : "destructive"
														}
													>
														{staffMember.isActive ? "Active" : "Deactivated"}
													</Badge>
												</TableCell>
												<TableCell className="px-6 py-3 text-right">
													{canManage(staffMember) ? (
														<Button
															size="sm"
															variant="outline"
															onClick={() => handleStatusChange(staffMember)}
															disabled={updateStatus.isPending}
														>
															{staffMember.isActive
																? "Deactivate"
																: "Reactivate"}
														</Button>
													) : (
														<span className="text-xs text-muted-foreground">
															{staffMember.isOwner
																? "Practice owner"
																: staffMember.id === profile?.id
																	? "Your account"
																	: "Owner only"}
														</span>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</Card>
				</div>

				<div className="flex flex-col gap-3">
					<h2 className="text-sm font-medium">Pending invitations</h2>

					<Card className="p-0 [--card-spacing:0px]">
						{invitations.length === 0 ? (
							<div className="flex flex-col items-center px-6 py-14 text-center">
								<span className="flex size-12 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
									<MailPlus className="size-5" />
								</span>
								<h3 className="mt-4 text-base font-medium">
									No pending invitations
								</h3>
								<p className="mt-1 text-sm text-muted-foreground">
									Invite a colleague to give them access to the practice
								</p>
							</div>
						) : (
							<div className="overflow-auto">
								<Table>
									<TableHeader className="sticky top-0 z-10 bg-card">
										<TableRow>
											<TableHead className="px-6">Email</TableHead>
											<TableHead className="px-6">Role</TableHead>
											<TableHead className="px-6">Invited by</TableHead>
											<TableHead className="px-6">Expires</TableHead>
											<TableHead className="px-6 text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{invitations.map((invitation) => (
											<TableRow key={invitation.id}>
												<TableCell className="px-6 py-3 font-medium">
													{invitation.email}
												</TableCell>
												<TableCell className="px-6 py-3">
													<Badge variant="secondary">
														{ROLE_LABELS[invitation.role]}
													</Badge>
												</TableCell>
												<TableCell className="px-6 py-3 text-muted-foreground">
													{invitation.invitedByEmail}
												</TableCell>
												<TableCell className="px-6 py-3 text-muted-foreground">
													{invitation.isExpired ? (
														<Badge variant="destructive">Expired</Badge>
													) : (
														<ClientDate dateString={invitation.expiresAt} />
													)}
												</TableCell>
												<TableCell className="px-6 py-3 text-right">
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															handleRevoke(invitation.id, invitation.email)
														}
														disabled={revokeInvitation.isPending}
													>
														Revoke
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</Card>
				</div>
			</div>

			{isInviting ? (
				<InviteStaffForm
					canInviteAdmins={isOwner}
					onClose={() => setIsInviting(false)}
				/>
			) : null}
		</>
	);
};

const AdminPage = () => (
	<Layout
		title="Practice administration"
		description="Manage who can access this practice and what they can do"
	>
		<AdminBoard />
	</Layout>
);

export default AdminPage;
