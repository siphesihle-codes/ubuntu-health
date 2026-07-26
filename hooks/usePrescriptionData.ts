import { useMemo } from "react";
import { Prescription } from "@/types";
import useApiData from "./useApiData";

export default function usePrescriptionData(patientId: number) {
	const {
		data: prescriptions,
		isLoading: prescriptionsLoading,
		error: prescriptionsError,
	} = useApiData<Prescription>("Prescriptions");

	// filter by patientId
	const filteredprescriptions = useMemo(() => {
		if (!prescriptions) return [];
		return prescriptions.filter(
			(prescription) => prescription.patientId === patientId
		);
	}, [prescriptions, patientId]);

	return { filteredprescriptions, prescriptionsLoading, prescriptionsError };
}
