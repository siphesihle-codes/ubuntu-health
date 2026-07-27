import React from "react";

interface Invoice {
	totalAmount: number;
}

interface InvoicesCardProps {
	invoices: Invoice[];
}

const InvoicesCard = ({ invoices }: InvoicesCardProps) => {
	const total = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<span className="text-xs text-muted-foreground">Total invoices</span>
				<span className="font-heading text-2xl font-semibold tracking-tight">
					{invoices.length}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-xs text-muted-foreground">Total revenue</span>
				<span className="font-heading text-2xl font-semibold tracking-tight text-success">
					R{total.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}
				</span>
			</div>
		</div>
	);
};

export default InvoicesCard;
