import React, { useRef } from "react";
import { Printer } from "lucide-react";
import { useCurrentUser } from "@/hooks/useAuth";
import { PRESCRIPTION_STATUS } from "@/types";
import type { Patient, Prescription } from "@/types";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface PrescriptionScriptProps {
	prescription: Prescription;
	patient?: Patient;
	onClose: () => void;
}

const SCRIPT_STYLES = `
.script { color: #111; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 13px; line-height: 1.5; background: #fff; padding: 24px; }
.script h1 { font-size: 18px; font-weight: 600; margin: 0; }
.script h2 { font-size: 13px; font-weight: 600; margin: 20px 0 8px; text-transform: uppercase; letter-spacing: 0.06em; }
.script-head { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #111; padding-bottom: 12px; }
.script-meta { text-align: right; font-size: 12px; }
.script-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 24px; font-size: 12px; }
.script-label { color: #555; }
.script-med { border: 1px solid #ddd; border-radius: 6px; padding: 10px 12px; margin-bottom: 8px; }
.script-med-name { font-weight: 600; font-size: 14px; }
.script-med-detail { font-size: 12px; color: #444; }
.script-sign { margin-top: 40px; display: flex; justify-content: space-between; gap: 32px; font-size: 12px; }
.script-sign div { flex: 1; border-top: 1px solid #111; padding-top: 6px; }
.script-note { margin-top: 24px; font-size: 11px; color: #666; }
@media print { @page { margin: 16mm; } }
`;

const formatDate = (value: string) =>
	new Date(value).toLocaleDateString("en-ZA", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

const PrescriptionScript = ({
	prescription,
	patient,
	onClose,
}: PrescriptionScriptProps) => {
	const { data: profile } = useCurrentUser();
	const scriptRef = useRef<HTMLDivElement>(null);

	const handlePrint = () => {
		const markup = scriptRef.current?.outerHTML;
		if (!markup) return;

		const frame = document.createElement("iframe");
		frame.style.position = "fixed";
		frame.style.right = "0";
		frame.style.bottom = "0";
		frame.style.width = "0";
		frame.style.height = "0";
		frame.style.border = "0";
		document.body.appendChild(frame);

		const frameDocument = frame.contentWindow?.document;
		if (!frameDocument) {
			document.body.removeChild(frame);
			return;
		}

		frameDocument.open();
		frameDocument.write(
			`<!doctype html><html><head><title>Prescription ${prescription.id}</title><style>${SCRIPT_STYLES}</style></head><body>${markup}</body></html>`
		);
		frameDocument.close();

		frame.contentWindow?.focus();
		frame.contentWindow?.print();

		window.setTimeout(() => document.body.removeChild(frame), 1000);
	};

	const patientName = patient
		? `${patient.firstName} ${patient.lastName}`
		: `Patient #${prescription.patientId}`;

	return (
		<Dialog
			open
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Prescription</DialogTitle>
					<DialogDescription>
						Check the details, then print and sign the script.
					</DialogDescription>
				</DialogHeader>

				<style>{SCRIPT_STYLES}</style>

				<div ref={scriptRef} className="script rounded-2xl ring-1 ring-border">
					<div className="script-head">
						<div>
							<h1>{profile?.practiceName || "Practice"}</h1>
							<div className="script-label">Prescription</div>
						</div>
						<div className="script-meta">
							<div>Script #{prescription.id}</div>
							<div>{formatDate(prescription.createdAt)}</div>
						</div>
					</div>

					<h2>Patient</h2>
					<div className="script-grid">
						<div>
							<span className="script-label">Name: </span>
							{patientName}
						</div>
						<div>
							<span className="script-label">ID number: </span>
							{patient?.idNumber || "Not recorded"}
						</div>
						<div>
							<span className="script-label">Phone: </span>
							{patient?.phone || "Not recorded"}
						</div>
						<div>
							<span className="script-label">Allergies: </span>
							{patient?.allergies || "None recorded"}
						</div>
					</div>

					<h2>Rx</h2>
					{prescription.medications.length === 0 ? (
						<div className="script-med-detail">
							No medications recorded on this prescription.
						</div>
					) : (
						prescription.medications.map((medication, index) => (
							<div className="script-med" key={`${medication.name}-${index}`}>
								<div className="script-med-name">
									{medication.name} {medication.dosage}
								</div>
								<div className="script-med-detail">
									{prescription.frequency}
									{medication.instructions
										? ` . ${medication.instructions}`
										: ""}
								</div>
							</div>
						))
					)}

					<div className="script-grid">
						<div>
							<span className="script-label">Repeats: </span>
							{prescription.refills}
						</div>
						<div>
							<span className="script-label">Valid until: </span>
							{prescription.endDate || "Not specified"}
						</div>
						<div>
							<span className="script-label">Status: </span>
							{PRESCRIPTION_STATUS[prescription.status] ?? prescription.status}
						</div>
					</div>

					{prescription.instructions ? (
						<>
							<h2>Instructions</h2>
							<div className="script-med-detail">
								{prescription.instructions}
							</div>
						</>
					) : null}

					<div className="script-sign">
						<div>
							{prescription.prescriberName || "Prescriber"}
							<br />
							HPCSA {prescription.prescriberLicenseNumber || "not recorded"}
						</div>
						<div>Signature and practice stamp</div>
					</div>

					<div className="script-note">
						This script is only valid once signed by the prescribing
						practitioner.
					</div>
				</div>

				<DialogFooter>
					<Button type="button" variant="outline" onClick={onClose}>
						Close
					</Button>
					<Button type="button" onClick={handlePrint}>
						<Printer />
						Print script
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PrescriptionScript;
