import type { ClinicalNote } from "@/types";
import { Stethoscope } from "lucide-react";
import ClientDate from "../ClientDate";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ClinicalNoteOverviewProps {
	clinicalNotes: ClinicalNote[];
}

const ClinicalNotesOverview = ({
	clinicalNotes,
}: ClinicalNoteOverviewProps) => {
	if (clinicalNotes.length === 0) {
		return (
			<Card>
				<div className="flex flex-col items-center px-6 py-14 text-center">
					<span className="flex size-12 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
						<Stethoscope className="size-5" />
					</span>
					<h2 className="mt-4 text-base font-medium">No visits recorded</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Clinical notes will appear here after the first consultation.
					</p>
				</div>
			</Card>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{clinicalNotes.map((clinicalNote) => (
				<Card key={clinicalNote.id}>
					<CardHeader>
						<CardTitle>
							{clinicalNote.diagnosesCode || "Consultation"}
						</CardTitle>
						<CardDescription>
							Note #{clinicalNote.id} &middot;{" "}
							<ClientDate dateString={clinicalNote.createdAt} />
						</CardDescription>
						{clinicalNote.status ? (
							<CardAction>
								<Badge variant="secondary">{clinicalNote.status}</Badge>
							</CardAction>
						) : null}
					</CardHeader>
					<CardContent>
						<p className="text-sm whitespace-pre-line text-muted-foreground">
							{clinicalNote.notes || "No notes recorded"}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default ClinicalNotesOverview;
