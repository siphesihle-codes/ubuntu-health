import React from "react";

interface Invoice {
	totalAmount: number;
}

interface InvoicesCardProps {
	invoices: Invoice[];
}

const InvoicesCard = ({ invoices }: InvoicesCardProps) => {
	return (
		<div className="space-y-2">
			<p className="text-gray-600">Total Invoices: {invoices.length}</p>
			<p className="text-gray-600">
				Total Revenue: R
				{invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)}
			</p>
		</div>
	);
};

export default InvoicesCard;
