import type { ClinicalNote } from "@/types";
interface clinicalNoteOverviewProps {
	clinicalNotes: ClinicalNote[];
}

const clinicalNotesOverview = ({
	clinicalNotes,
}: clinicalNoteOverviewProps) => {
	return (
		<div className="space-y-4">
			<h2 className="text-lg font-medium">Visit History</h2>
			{clinicalNotes.map((clinicalNote) => (
				<div
					key={clinicalNote.id}
					className="border rounded-lg p-6 backdrop-blur-sm"
				>
					<div className="flex justify-between mb-4">
						<div>
							<p className="text-xs ">clinicalNote ID: {clinicalNote.id}</p>
							<h3 className="text-lg font-medium">
								{clinicalNote.diagnosesCode}
							</h3>
						</div>
						<span className="text-sm">{clinicalNote.createdAt}</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<p className="text-xs ">Status</p>
							<p>{clinicalNote.status}</p>
						</div>
						<div>
							<p className="text-xs ">Notes</p>
							<p>{clinicalNote.notes}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default clinicalNotesOverview;
