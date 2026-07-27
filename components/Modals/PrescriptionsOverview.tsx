import { Prescription } from "@/types";
import React from "react";
import PrescriptionsTableCard from "../Cards/PrescriptionsTableCard";

interface PrescriptionsOverviewProps {
	prescriptions: Prescription[];
}

const PrescriptionsOverview = ({
	prescriptions,
}: PrescriptionsOverviewProps) => (
	<PrescriptionsTableCard prescriptions={prescriptions} />
);

export default PrescriptionsOverview;
