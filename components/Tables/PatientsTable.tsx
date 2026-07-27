import React, { useMemo } from "react";
import PatientsTableCard from "../Cards/PatientsTableCard";
import { usePatients } from "@/hooks/usePatients";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PatientsTableProps {
	searchTerm?: string;
}

const PatientsTable = ({ searchTerm = "" }: PatientsTableProps) => {
	const { data: patients = [], isLoading, error } = usePatients();

	const filteredPatients = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();
		if (!query) return patients;

		return patients.filter((patient) =>
			`${patient.firstName} ${patient.lastName} ${patient.email ?? ""} ${
				patient.phone ?? ""
			}`
				.toLowerCase()
				.includes(query)
		);
	}, [patients, searchTerm]);

	if (isLoading) {
		return (
			<Card className="gap-3">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="flex items-center gap-4 px-6">
						<Skeleton className="size-9 rounded-full" />
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
					Error loading patients data. Please try again later.
				</div>
			</Card>
		);
	}

	return <PatientsTableCard patients={filteredPatients} />;
};

export default PatientsTable;
