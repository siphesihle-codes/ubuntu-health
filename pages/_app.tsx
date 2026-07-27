import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiError } from "@/lib/api/client";
import "@/styles/globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const App = ({ Component, pageProps }: AppProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5,
						retry: (failureCount, error) =>
							error instanceof ApiError && error.status < 500
								? false
								: failureCount < 3,
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: false,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<TooltipProvider delay={200}>
					<Head>
						<title>Ubuntu Health</title>
						<meta
							name="description"
							content={`Ubuntu Health is an intuitive Electronic Health Records (EHR) platform designed to simplify
						patient care and practice management for family doctors and small clinics. It offers features
						such as patient management, appointment scheduling, e-prescriptions, billing, and secure
						communication. We aim to optimize workflow efficiency and enhance patient satisfaction.`}
						/>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
					</Head>
					<div className={`${inter.variable} font-sans`}>
						<Component {...pageProps} />
					</div>
					<Toaster position="top-right" richColors closeButton />
				</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
