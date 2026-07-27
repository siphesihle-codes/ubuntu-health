import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/useAuth";
import DashboardNav from "./DashboardNav";

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
	description?: string;
	actions?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
	children,
	title,
	description,
	actions,
}) => {
	const router = useRouter();
	const { isError } = useCurrentUser();

	useEffect(() => {
		if (isError) router.replace("/login");
	}, [isError, router]);

	return (
		<SidebarProvider>
			<DashboardNav />
			<SidebarInset className="min-w-0">
				<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur-sm md:px-6">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="h-5" />
					<div className="flex min-w-0 flex-1 flex-col justify-center">
						{title ? (
							<h1 className="truncate text-base font-semibold leading-tight">
								{title}
							</h1>
						) : null}
						{description ? (
							<p className="truncate text-xs text-muted-foreground">
								{description}
							</p>
						) : null}
					</div>
					{actions ? (
						<div className="flex shrink-0 items-center gap-2">{actions}</div>
					) : null}
				</header>
				<div className="flex-1 p-4 md:p-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Layout;
