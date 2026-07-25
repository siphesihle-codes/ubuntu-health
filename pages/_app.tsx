import type { AppProps } from "next/app";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: "400",
});

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<div className={poppins.className}>
			<Head>
				<title>Ubuntu Health</title>
				<meta
					name="description"
					content={`Ubuntu Health is an intuitive Electronic Health Records (EHR) platform designed to simplify
         patient care and practice management for family doctors and small clinics. It offers features
         such as patient management, appointment scheduling, e-prescriptions, billing, and secure
         communication. We aim to optimize workflow efficiency and enhance patient satisfaction.
         Join the waiting list for exclusive updates and early access to this innovative healthcare
         solution.`}
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
	);
};

export default App;
