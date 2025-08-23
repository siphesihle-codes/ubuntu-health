import React from "react";
import { Invoice } from "@/types";
// import InvoiceData from "@/hooks/useInvoiceData";
import { useParams } from "next/navigation";
import useInvoiceData from "@/hooks/useInvoiceData";
import {
	AlertCircle,
	Check,
	Clock,
	Download,
	FileText,
	Printer,
} from "lucide-react";
import ClientDate from "../ClientDate";

interface InvoicesOverviewProps {
	invoices: Invoice;
}

const InvoicesOverview = ({ invoices }: InvoicesOverviewProps) => {
	const { id: patientIdparam } = useParams() as { id: string };
	const patientId = parseInt(patientIdparam, 10);

	const { filteredInvoices, invoicesLoading, invoicesError } =
		useInvoiceData(patientId);

	if (invoicesLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading invoices data...
			</div>
		);
	}

	if (invoicesError) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-600 ">
				Error loading invoices data.
			</div>
		);
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "draft":
				return "   ";
			case "sent":
				return "bg-blue-900/30 text-blue-400";
			case "paid":
				return "bg-green-900/30 text-green-400";
			case "overdue":
				return "bg-red-900/30 text-red-400";
			default:
				return "   ";
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "paid":
				return <Check size={16} />;
			case "overdue":
				return <AlertCircle size={16} />;
			case "sent":
				return <Clock size={16} />;
			default:
				return <FileText size={16} />;
		}
	};

	return (
		<div className="max-h-[45rem] bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
			<table className="w-full text-sm table-auto text-left">
				<thead>
					<tr>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Invoice #
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Patient ID
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Amount
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Status
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Due Date
						</th>
						<th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 font-medium text-gray-700">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-cyan-800/30">
					{filteredInvoices.map((invoice) => (
						<tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
							<td className="px-6 py-4 font-mono">{invoice.id}</td>
							<td className="px-6 py-4">{invoice.patientId}</td>
							<td className="px-6 py-4 font-medium">
								R{invoice.totalAmount.toLocaleString()}
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center gap-2">
									<span
										className={`p-1.5 rounded-full ${getStatusColor(
											invoice.status
										)}`}
									>
										{getStatusIcon(invoice.status)}
									</span>
									<span className="capitalize">{invoice.status}</span>
								</div>
							</td>
							<td className="px-6 py-4 font-medium">
								<ClientDate dateString={invoice.createdAt} />
							</td>
							<td className="px-6 py-4">
								<div className="flex gap-4">
									<button
										type="button"
										className="hover:text-cyan-300 transition-colors"
										title="View"
									>
										<FileText size={18} />
									</button>
									<button
										type="button"
										className="hover:text-cyan-300 transition-colors"
										title="Print"
									>
										<Printer size={18} />
									</button>
									<button
										type="button"
										className="hover:text-cyan-300 transition-colors"
										title="Download"
									>
										<Download size={18} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default InvoicesOverview;
