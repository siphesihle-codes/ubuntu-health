import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Activity, KeyRound } from "lucide-react";
import { SUPPORT_EMAIL } from "@/types";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";

const ForgotPasswordPage = () => (
	<>
		<Head>
			<title>Forgot password | Ubuntu Health</title>
			<meta
				name="description"
				content="How to reset your Ubuntu Health password."
			/>
		</Head>

		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
			<ThemeToggle className="fixed right-4 top-4 z-50" />
			<div className="w-full max-w-sm">
				<div className="mb-8 flex justify-center">
					<Link
						href="/"
						className="flex size-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground"
						aria-label="Ubuntu Health home"
					>
						<Activity className="size-6" />
					</Link>
				</div>

				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Forgot your password?</CardTitle>
						<CardDescription>
							Your practice administrator can reset it for you.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-5">
						<div className="flex gap-3 rounded-2xl bg-muted/60 p-4">
							<span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-background text-muted-foreground">
								<KeyRound className="size-4" />
							</span>
							<div className="flex flex-col gap-2 text-sm text-muted-foreground">
								<p>
									Ask an administrator at your practice to open{" "}
									<span className="text-foreground">
										Practice administration
									</span>
									, find your name and choose{" "}
									<span className="text-foreground">Reset password</span>.
								</p>
								<p>
									They will get a single-use link to send you. It works for 24
									hours and lets you set a new password.
								</p>
							</div>
						</div>

						<p className="text-sm text-muted-foreground">
							If you are the only administrator at your practice, contact us at{" "}
							<a
								href={`mailto:${SUPPORT_EMAIL}`}
								className="text-foreground underline-offset-4 hover:underline"
							>
								{SUPPORT_EMAIL}
							</a>
							.
						</p>

						<Button variant="outline" render={<Link href="/login" />}>
							Back to sign in
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	</>
);

export default ForgotPasswordPage;
