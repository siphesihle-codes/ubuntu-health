import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themeOptions = [
	{ value: "light", label: "Light", icon: Sun },
	{ value: "dark", label: "Dark", icon: Moon },
	{ value: "system", label: "System", icon: Monitor },
];

const ThemeToggle = ({ className }: { className?: string }) => {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Change theme"
				className={cn(
					buttonVariants({ variant: "ghost", size: "icon" }),
					className
				)}
			>
				<Sun className="dark:hidden" />
				<Moon className="hidden dark:block" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40 min-w-40">
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => setTheme(value as string)}
				>
					{themeOptions.map((option) => (
						<DropdownMenuRadioItem key={option.value} value={option.value}>
							<option.icon />
							{option.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeToggle;
