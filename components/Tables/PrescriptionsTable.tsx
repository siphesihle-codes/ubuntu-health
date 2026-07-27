import React, { useMemo } from "react";
import PrescriptionsTableCard from "../Cards/PrescriptionsTableCard";
import { usePrescriptions } from "@/hooks/usePrescriptions";
import { PRESCRIPTION_STATUS } from "@/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PrescriptionTableProps {
	searchQuery: string;
}

const PrescriptionsTable = ({ searchQuery }: PrescriptionTableProps) => {
	const { data: prescriptions = [], isLoading, error } = usePrescriptions();

	const filteredPrescriptions = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return prescriptions;

		return prescriptions.filter((prescription) =>
			`${prescription.patientId} ${prescription.frequency ?? ""} ${
				prescription.instructions ?? ""
			} ${PRESCRIPTION_STATUS[prescription.status] ?? ""}`
				.toLowerCase()
				.includes(query)
		);
	}, [prescriptions, searchQuery]);

	if (isLoading) {
		return (
			<Card className="gap-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="flex items-center gap-4 px-6">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="h-4 w-24" />
					</div>
				))}
			</Card>
		);
	}

	if (error) {
		return (
			<Card>
				<div className="px-6 py-12 text-center text-sm text-destructive">
					Error loading prescriptions. Please try again later.
				</div>
			</Card>
		);
	}

	return <PrescriptionsTableCard prescriptions={filteredPrescriptions} />;
};

export default PrescriptionsTable;
