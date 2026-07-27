import React, { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useImportPractice } from "@/hooks/useImport";
import { parseImportFile } from "@/lib/importFile";
import type { ImportSummary } from "@/types";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const summaryLines = (summary: ImportSummary) =>
	[
		["Patients created", summary.patientsCreated],
		["Patients already on file", summary.patientsMatched],
		["Appointments", summary.appointmentsCreated],
		["Clinical notes", summary.clinicalNotesCreated],
		["Prescriptions", summary.prescriptionsCreated],
		["Invoices", summary.invoicesCreated],
	] as const;

const PracticeImport = () => {
	const fileInput = useRef<HTMLInputElement>(null);
	const [summary, setSummary] = useState<ImportSummary | null>(null);
	const importPractice = useImportPractice();

	const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;

		setSummary(null);

		let payload;
		try {
			payload = await parseImportFile(file);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "That file could not be read"
			);
			return;
		}

		importPractice.mutate(payload, {
			onSuccess: (result) => {
				setSummary(result);
				toast.success("Import finished");
			},
			onError: (error) => toast.error(error.message),
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Import records</CardTitle>
				<CardDescription>
					Bring patients across from your previous system. We accept a CSV of
					patients, or a JSON file exported from Ubuntu Health.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-4">
				<input
					ref={fileInput}
					type="file"
					accept=".csv,.json,application/json,text/csv"
					onChange={handleFile}
					className="hidden"
				/>

				<div className="flex flex-wrap items-center gap-3">
					<Button
						size="sm"
						variant="outline"
						onClick={() => fileInput.current?.click()}
						disabled={importPractice.isPending}
					>
						{importPractice.isPending ? (
							<>
								<Loader2 className="animate-spin" />
								Importing...
							</>
						) : (
							<>
								<Upload />
								Choose a file
							</>
						)}
					</Button>
					<span className="text-xs text-muted-foreground">
						CSV columns we recognise include first name, last name, ID number,
						sex, email, phone, address, medical aid and membership number.
					</span>
				</div>

				<p className="text-xs text-muted-foreground">
					Patients already on file with the same ID number are matched rather
					than duplicated. Nothing is overwritten.
				</p>

				{summary ? (
					<div className="flex flex-col gap-3 rounded-2xl bg-muted/60 p-4">
						<div className="grid gap-2 sm:grid-cols-2">
							{summaryLines(summary).map(([label, value]) => (
								<div key={label} className="flex justify-between gap-4 text-sm">
									<span className="text-muted-foreground">{label}</span>
									<span className="font-medium tabular-nums">{value}</span>
								</div>
							))}
						</div>

						{summary.skipped.length > 0 ? (
							<div className="flex flex-col gap-1">
								<span className="text-xs font-medium">
									Skipped {summary.skipped.length} row
									{summary.skipped.length === 1 ? "" : "s"}
								</span>
								<ul className="flex list-disc flex-col gap-1 pl-5 text-xs text-muted-foreground">
									{summary.skipped.slice(0, 10).map((reason, index) => (
										<li key={`${reason}-${index}`}>{reason}</li>
									))}
								</ul>
								{summary.skipped.length > 10 ? (
									<span className="text-xs text-muted-foreground">
										and {summary.skipped.length - 10} more
									</span>
								) : null}
							</div>
						) : null}
					</div>
				) : null}
			</CardContent>
		</Card>
	);
};

export default PracticeImport;
