import { useState } from "react";
import {
	Search,
	Plus,
	FileText,
	Printer,
	Download,
	Check,
	Clock,
	AlertCircle,
	CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Layout from "@/components/Layout";
import ClientDate from "@/components/ClientDate";
import { useInvoices } from "@/hooks/useInvoices";

const InvoicePage = () => {
	const [filter, setFilter] = useState<
		"all" | "draft" | "sent" | "paid" | "overdue"
	>("all");
	const [searchQuery, setSearchQuery] = useState("");

	const { data: invoices = [] } = useInvoices();

	const term = searchQuery.trim().toLowerCase();

	const filteredInvoices = invoices.filter((invoice) => {
		const matchesFilter = filter === "all" || invoice.status === filter;

		const matchesSearch =
			term === "" ||
			invoice.id.toString().includes(term) ||
			invoice.patientId.toString().includes(term);

		return matchesFilter && matchesSearch;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "sent":
				return "bg-blue-900/30 text-blue-400";
			case "paid":
				return "bg-green-900/30 text-green-400";
			case "overdue":
				return "bg-red-900/30 text-red-400";
			default:
				return "bg-gray-900/10 text-gray-400";
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
		<Layout>
			<div className="min-h-screen p-6">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
						<div>
							<h1 className="text-3xl font-bold  ">Invoices</h1>
							<p className="  mt-2">Manage and track formal patient invoices</p>
						</div>
						<div className="flex gap-4 mt-4 md:mt-0">
							<div className="relative">
								<Search
									className="absolute left-3 top-1/2 -translate-y-1/2  "
									size={18}
								/>
								<input
									type="text"
									placeholder="Search invoices..."
									className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                focus:ring-blue-500"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<Link
								href="/invoices/new"
								className="inline-flex items-center gap-2 px-1.5 py-1.5 bg-blue-600 rounded-md
            	text-white text-sm font-medium hover:bg-blue-700 transition-colors"
							>
								<Plus size={18} />
								New Invoice
							</Link>
						</div>
					</div>

					{/* Stats Cards */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div className="border rounded-lg p-4">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm">Total Invoices</p>
									<p className="text-2xl font-semibold">{invoices.length}</p>
								</div>
								<div className="p-3 rounded-full">
									<FileText size={20} />
								</div>
							</div>
						</div>

						<div className="border rounded-lg p-4">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm">Amount Due</p>
									<p className="text-2xl font-semibold text-yellow-600">
										R
										{invoices
											.filter((i) => i.status !== "paid")
											.reduce((sum, i) => sum + i.totalAmount, 0)
											.toLocaleString()}
									</p>
								</div>
								<div className="p-3 rounded-full text-yellow-400">
									<AlertCircle size={20} />
								</div>
							</div>
						</div>

						<div className="border rounded-lg p-4">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm">Overdue</p>
									<p className="text-2xl font-semibold text-red-400">
										{invoices.filter((i) => i.status === "overdue").length}
									</p>
								</div>
								<div className="p-3 rounded-full text-red-400">
									<Clock size={20} />
								</div>
							</div>
						</div>

						<div className="border rounded-lg p-4">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-sm">Paid</p>
									<p className="text-2xl font-semibold text-green-400">
										R
										{invoices
											.filter((i) => i.status === "paid")
											.reduce((sum, i) => sum + i.totalAmount, 0)
											.toLocaleString()}
									</p>
								</div>
								<div className="p-3 rounded-full text-green-400">
									<CheckCircle size={20} />
								</div>
							</div>
						</div>
					</div>

					{/* Filters */}
					<div className="flex flex-wrap gap-3 mb-6">
						<button
							type="button"
							onClick={() => setFilter("all")}
							className={`px-4 py-2 rounded-md text-sm font-medium border ${
								filter === "all" ? "border-cyan-500/50" : "hover:bg-cyan-900/20"
							}`}
						>
							All Invoices
						</button>
						<button
							type="button"
							onClick={() => setFilter("draft")}
							className={`px-4 py-2 rounded-md text-sm font-medium border ${
								filter === "draft"
									? "border-gray-500/50"
									: "hover:bg-cyan-900/20"
							}`}
						>
							Drafts
						</button>
						<button
							type="button"
							onClick={() => setFilter("sent")}
							className={`px-4 py-2 rounded-md text-sm font-medium border ${
								filter === "sent"
									? "bg-blue-900/30 border-blue-500/50 text-blue-400"
									: "hover:bg-cyan-900/20"
							}`}
						>
							Sent
						</button>
						<button
							type="button"
							onClick={() => setFilter("paid")}
							className={`px-4 py-2 rounded-md text-sm font-medium border ${
								filter === "paid"
									? "bg-green-900/30 border-green-500/50 text-green-400"
									: "hover:bg-cyan-900/20"
							}`}
						>
							Paid
						</button>
						<button
							type="button"
							onClick={() => setFilter("overdue")}
							className={`px-4 py-2 rounded-md text-sm font-medium border ${
								filter === "overdue"
									? "bg-red-900/30 border-red-500/50 text-red-400"
									: "hover:bg-cyan-900/20"
							}`}
						>
							Overdue
						</button>
					</div>

					{/* Invoices Table */}
					<div className="border rounded-lg overflow-hidden shadow-lg">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr>
										<th className="px-6 py-4 text-left">Invoice #</th>
										<th className="px-6 py-4 text-left">Patient ID</th>
										<th className="px-6 py-4 text-left">Amount</th>
										<th className="px-6 py-4 text-left">Status</th>
										<th className="px-6 py-4 text-left">Due Date</th>
										<th className="px-6 py-4 text-left">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-cyan-800/30">
									{filteredInvoices.map((invoice) => (
										<tr
											key={invoice.id}
											className="hover:bg-gray-50 transition-colors"
										>
											<td className="px-6 py-4 font-mono">{invoice.id}</td>
											<td className="px-6 py-4">{invoice.patientId}</td>
											<td className="px-6 py-4">{invoice.appointmentId}</td>
											<td className="px-6 py-4">
												<ClientDate dateString={invoice.createdAt} />
											</td>
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
											<td className="px-6 py-4">{invoice.updatedAt}</td>
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

						{/* Empty State */}
						{filteredInvoices.length === 0 && (
							<div className="p-8 text-center">
								<FileText className="mx-auto" size={48} />
								<h3 className="mt-4 text-lg font-medium">No invoices found</h3>
								<p className="mt-2">
									{searchQuery
										? "Try a different search term"
										: "Create a new invoice to get started"}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default InvoicePage;
