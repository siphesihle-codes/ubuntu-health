import Head from "next/head";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Head>
				<title>
					Ubuntu Health | Streamlined EMR for Independent Practitioners
				</title>
				<meta
					name="description"
					content="Comprehensive EMR/EHR solution designed specifically for independent
          practitioners and small clinics"
				/>
			</Head>

			{/* Header */}
			<Navbar />

			{/* Hero Section */}
			<Landing />

			{/* Mission Section */}
			<Mission />

			{/* Features Section */}
			<Services />

			{/* Pricing Section */}
			<Pricing />

			<Footer />
		</>
	);
}
