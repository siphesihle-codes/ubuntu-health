import Head from "next/head";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEGAL } from "@/types";

interface LegalProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

const Legal = ({ title, description, children }: LegalProps) => {
	return (
		<>
			<Head>
				<title>{`${title} | Ubuntu Health`}</title>
				<meta name="description" content={description} />
			</Head>

			<Navbar />

			<main className="border-b">
				<div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
					<p className="text-sm font-medium text-primary">Legal</p>
					<h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
					<p className="mt-5 text-base text-muted-foreground">{description}</p>
					<p className="mt-3 text-sm text-muted-foreground">
						Last updated {LEGAL.lastUpdated}
					</p>

					<div className="mt-14 flex flex-col gap-10 text-sm leading-relaxed text-muted-foreground">
						{children}
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export const LegalSection = ({
	heading,
	children,
}: {
	heading: string;
	children: React.ReactNode;
}) => (
	<section className="flex flex-col gap-3">
		<h2 className="font-heading text-lg font-medium text-foreground">
			{heading}
		</h2>
		{children}
	</section>
);

export const LegalList = ({ items }: { items: string[] }) => (
	<ul className="flex list-disc flex-col gap-2 pl-5">
		{items.map((item) => (
			<li key={item}>{item}</li>
		))}
	</ul>
);

export const LegalMail = ({ address }: { address: string }) => (
	<a
		href={`mailto:${address}`}
		className="text-foreground underline-offset-4 hover:underline"
	>
		{address}
	</a>
);

export default Legal;
