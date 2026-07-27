import { useState } from "react";
import Link from "next/link";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const navItems = [
	{ href: "/#about", label: "About" },
	{ href: "/#services", label: "Services" },
	{ href: "/#pricing", label: "Pricing" },
];

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleMenuClose = () => setIsMenuOpen(false);

	return (
		<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link
					href="/"
					className="flex items-center gap-2.5"
					aria-label="Ubuntu Health home"
				>
					<span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
						<Activity className="size-4.5" />
					</span>
					<span className="font-heading text-base font-semibold">
						Ubuntu Health
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="rounded-4xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="hidden items-center gap-2 md:flex">
					<ThemeToggle />
					<Button variant="ghost" size="sm" render={<Link href="/login" />}>
						Sign in
					</Button>
					<Button
						size="sm"
						render={
							<Link href={{ pathname: "/signup", query: { plan: "free" } }} />
						}
					>
						Start free trial
					</Button>
				</div>

				<div className="flex items-center gap-1 md:hidden">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</div>

			{isMenuOpen ? (
				<div className="border-t bg-background px-4 py-4 md:hidden">
					<nav className="flex flex-col gap-1">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={handleMenuClose}
								className="rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								{item.label}
							</Link>
						))}
					</nav>
					<div className="mt-4 flex flex-col gap-2">
						<Button
							variant="outline"
							render={<Link href="/login" onClick={handleMenuClose} />}
						>
							Sign in
						</Button>
						<Button
							render={
								<Link
									href={{ pathname: "/signup", query: { plan: "free" } }}
									onClick={handleMenuClose}
								/>
							}
						>
							Start free trial
						</Button>
					</div>
				</div>
			) : null}
		</header>
	);
};

export default Navbar;
