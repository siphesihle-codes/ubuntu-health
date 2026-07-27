import { useState, useSyncExternalStore } from "react";
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
	Users,
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
import PatientForm from "./Forms/PatientForm";
import AppointmentForm from "./Forms/AppointmentForm";

const subscribeToTenantId = () => () => {};
const getTenantId = () => localStorage.getItem("tenantId");
const getServerTenantId = () => null;

const DashboardNav = () => {
	const [activeModal, setActiveModal] = useState("");
	const router = useRouter();
	const tenantId = useSyncExternalStore(
		subscribeToTenantId,
		getTenantId,
		getServerTenantId
	);
	const handleCloseModal = () => setActiveModal("");

	const navItems = [
		{ name: "Dashboard", root: "/dashboard", icon: LayoutDashboard },
		{ name: "Appointments", root: "/appointments", icon: CalendarCheck },
		{ name: "Patients", root: "/patients", icon: Users },
		{ name: "Prescriptions", root: "/prescriptions", icon: PillBottle },
		{ name: "Invoices", root: "/invoices", icon: CreditCard },
	];

	const handleSignOut = () => {
		localStorage.removeItem("tenantId");
		router.push("/login");
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
							<span className="text-xs text-muted-foreground">
								Clinic portal
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
				</SidebarContent>

				<SidebarFooter>
					<SidebarSeparator className="mb-1" />
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton onClick={handleSignOut} tooltip="Sign out">
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
