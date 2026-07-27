import { Pill } from "lucide-react";
import {
	type Prescription,
	PRESCRIPTION_STATUS,
	PRESCRIPTION_STATUS_COLORS,
} from "@/types";
import ClientDate from "../ClientDate";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface PrescriptionsPageProps {
	prescriptions: Prescription[];
}

const PrescriptionsTableCard = ({ prescriptions }: PrescriptionsPageProps) => {
	if (prescriptions.length === 0) {
		return (
			<Card>
				<div className="flex flex-col items-center px-6 py-14 text-center">
					<span className="flex size-12 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
						<Pill className="size-5" />
					</span>
					<h2 className="mt-4 text-base font-medium">
						No prescriptions found
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Create a new prescription to get started.
					</p>
				</div>
			</Card>
		);
	}

	return (
		<Card className="p-0 [--card-spacing:0px]">
			<div className="max-h-[70vh] overflow-auto">
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-card">
						<TableRow>
							<TableHead className="px-6">Patient ID</TableHead>
							<TableHead className="px-6">Status</TableHead>
							<TableHead className="px-6">Refills</TableHead>
							<TableHead className="px-6">Frequency</TableHead>
							<TableHead className="px-6">Instructions</TableHead>
							<TableHead className="px-6">End date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{prescriptions.map((prescription) => (
							<TableRow key={prescription.id}>
								<TableCell className="px-6 py-3 font-medium tabular-nums">
									{prescription.patientId}
								</TableCell>
								<TableCell className="px-6 py-3">
									<Badge
										className={
											PRESCRIPTION_STATUS_COLORS[prescription.status] ??
											"bg-muted text-muted-foreground"
										}
									>
										{PRESCRIPTION_STATUS[prescription.status] ??
											prescription.status}
									</Badge>
								</TableCell>
								<TableCell className="px-6 py-3 tabular-nums">
									{prescription.refills}
								</TableCell>
								<TableCell className="px-6 py-3 text-muted-foreground">
									{prescription.frequency}
								</TableCell>
								<TableCell className="max-w-xs px-6 py-3">
									<p className="line-clamp-2 text-muted-foreground">
										{prescription.instructions}
									</p>
								</TableCell>
								<TableCell className="px-6 py-3 text-muted-foreground">
									<ClientDate dateString={prescription.endDate} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between border-t px-6 py-3 text-sm text-muted-foreground">
				<span>
					{prescriptions.length} prescription
					{prescriptions.length === 1 ? "" : "s"}
				</span>
			</div>
		</Card>
	);
};

export default PrescriptionsTableCard;
