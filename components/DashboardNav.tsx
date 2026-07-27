import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Activity,
	CalendarCheck,
	CreditCard,
	LayoutDashboard,
	LogOut,
	PillBottle,
	Plus,
	ShieldCheck,
	UserCog,
	Users,
	Wallet,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import type { Role } from "@/types";
import PatientForm from "./Forms/PatientForm";
import AppointmentForm from "./Forms/AppointmentForm";

const NAV_ITEMS: {
	name: string;
	root: string;
	icon: typeof LayoutDashboard;
	roles: Role[];
}[] = [
	{
		name: "Dashboard",
		root: "/dashboard",
		icon: LayoutDashboard,
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Appointments",
		root: "/appointments",
		icon: CalendarCheck,
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Patients",
		root: "/patients",
		icon: Users,
		roles: ["admin", "doctor", "nurse", "receptionist"],
	},
	{
		name: "Prescriptions",
		root: "/prescriptions",
		icon: PillBottle,
		roles: ["admin", "doctor", "nurse"],
	},
	{
		name: "Invoices",
		root: "/invoices",
		icon: CreditCard,
		roles: ["admin", "receptionist"],
	},
];

const DashboardNav = () => {
	const [activeModal, setActiveModal] = useState("");
	const router = useRouter();
	const { data: profile } = useCurrentUser();
	const logout = useLogout();

	const tenantId = profile?.tenantId;
	const roles = profile?.roles ?? [];
	const isAdmin = roles.includes("admin");

	const handleCloseModal = () => setActiveModal("");

	const navItems = NAV_ITEMS.filter((item) =>
		item.roles.some((role) => roles.includes(role))
	);

	const handleSignOut = () => {
		logout.mutate(undefined, {
			onSettled: () => router.push("/login"),
		});
	};

	return (
		<>
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<div className="flex items-center gap-2.5 px-2 py-1.5">
						<div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
							<Activity className="size-4.5" />
						</div>
						<div className="flex flex-col group-data-[collapsible=icon]:hidden">
							<span className="font-heading text-sm font-semibold leading-tight">
								Ubuntu Health
							</span>
							<span className="truncate text-xs text-muted-foreground">
								{profile?.practiceName ?? "Clinic portal"}
							</span>
						</div>
					</div>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Practice</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navItems.map((item) => (
									<SidebarMenuItem key={item.root}>
										<SidebarMenuButton
											render={<Link href={`${item.root}/${tenantId}`} />}
											isActive={router.pathname.startsWith(item.root)}
											tooltip={item.name}
										>
											<item.icon />
											<span>{item.name}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>

					{profile?.isTrialExpired ? null : (
						<SidebarGroup className="group-data-[collapsible=icon]:hidden">
							<SidebarGroupLabel>Quick actions</SidebarGroupLabel>
							<SidebarGroupContent className="flex flex-col gap-2 px-2 pt-1">
								<Button
									size="sm"
									className="w-full justify-start"
									onClick={() => setActiveModal("addPatient")}
								>
									<Plus />
									New patient
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="w-full justify-start"
									onClick={() => setActiveModal("scheduleAppointment")}
								>
									<CalendarCheck />
									Schedule visit
								</Button>
							</SidebarGroupContent>
						</SidebarGroup>
					)}
				</SidebarContent>

				<SidebarFooter>
					<SidebarSeparator className="mb-1" />
					<SidebarMenu>
						{isAdmin ? (
							<>
								<SidebarMenuItem>
									<SidebarMenuButton
										render={<Link href={`/admin/${tenantId}`} />}
										isActive={router.pathname.startsWith("/admin")}
										tooltip="Administration"
									>
										<ShieldCheck />
										<span>Administration</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton
										render={<Link href={`/billing/${tenantId}`} />}
										isActive={router.pathname.startsWith("/billing")}
										tooltip="Billing"
									>
										<Wallet />
										<span>Billing</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</>
						) : null}
						<SidebarMenuItem>
							<SidebarMenuButton
								render={<Link href={`/profile/${tenantId}`} />}
								isActive={router.pathname.startsWith("/profile")}
								tooltip="Profile"
							>
								<UserCog />
								<span>Profile</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								onClick={handleSignOut}
								disabled={logout.isPending}
								tooltip="Sign out"
							>
								<LogOut />
								<span>Sign out</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			{activeModal === "addPatient" && (
				<PatientForm onClose={handleCloseModal} />
			)}
			{activeModal === "scheduleAppointment" && (
				<AppointmentForm onClose={handleCloseModal} />
			)}
		</>
	);
};

export default DashboardNav;
