import Head from "next/head";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Mission from "@/components/Mission";
import Demo from "@/components/Demo";
import FeatureTour from "@/components/FeatureTour";
import Services from "@/components/Services";
import Roles from "@/components/Roles";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Head>
				<title>
					Ubuntu Health | Practice management and records for South African
					practices
				</title>
				<meta
					name="description"
					content="Ubuntu Health keeps patient files, the shared diary, clinical notes, prescriptions and invoicing in one workspace built for independent practitioners and small clinics in South Africa."
				/>
			</Head>

			<Navbar />

			<Landing />

			<Mission />

			<Demo />

			<FeatureTour />

			<Services />

			<Roles />

			<Security />

			<Pricing />

			<Faq />

			<Footer />
		</>
	);
}
