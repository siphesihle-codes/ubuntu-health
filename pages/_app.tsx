import type { AppProps } from "next/app";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "next/dist/server/api-utils";

const poppins = Poppins({
	subsets: ["latin"],
	weight: "400",
});

const App = ({ Component, pageProps }: AppProps) => {
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				retry: (failureCount, error) =>
					error instanceof ApiError && error.statusCode < 500 ? false : failureCount < 3, // Retry up to 3 times for server errors (5xx), but not for client errors (4xx)
				refetchOnWindowFocus: false,
			},
		},
	}));

	return (
		<QueryClientProvider client={queryClient}>
			<div className={poppins.className}>
					<Head>
						<title>Ubuntu Health</title>
						<meta
						name="description"
						content={`Ubuntu Health is an intuitive Electronic Health Records (EHR) platform designed to simplify
					patient care and practice management for family doctors and small clinics. It offers features
					such as patient management, appointment scheduling, e-prescriptions, billing, and secure
					communication. We aim to optimize workflow efficiency and enhance patient satisfaction.`}
					/>
				</Head>
				<Component {...pageProps} />
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>
		</QueryClientProvider>
	);
};

export default App;
