import { Prescription } from "@/types";
import { Pill, Calendar, Pencil, Trash2 } from "lucide-react";
import React from "react";
import ClientDate from "../ClientDate";

interface PrescriptionsOverviewProps {
	prescriptions: Prescription[];
}

const PrescriptionsOverview = ({
	prescriptions,
}: PrescriptionsOverviewProps) => {
	return (
		<div>
			{prescriptions.length === 0 ? (
				<div className="bg-white border border-gray-200 rounded-xl p-8 text-center mt-8 shadow-sm">
					<Pill className="mx-auto text-gray-400" size={48} />
					<h2 className="mt-4 text-lg font-bold text-gray-800">
						No prescriptions found
					</h2>
					<p className="mt-2 text-gray-600">Create a new prescription.</p>
				</div>
			) : (
				<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-700">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 font-medium text-gray-700">
										Patient ID
									</th>
									<th className="px-6 py-3 font-medium text-gray-700">
										Refills
									</th>
									<th className="px-6 py-3 font-medium text-gray-700">
										Frequency
									</th>
									<th className="px-6 py-3 font-medium text-gray-700">
										Instructions
									</th>
									<th className="px-6 py-3 font-medium text-gray-700">
										End Date
									</th>
									<th className="px-6 py-3 font-medium text-gray-700">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{prescriptions.map((prescription) => (
									<tr
										key={prescription.id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="px-6 py-4 font-mono text-gray-900">
											{prescription.patientId}
										</td>
										<td className="px-6 py-4">
											<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
												{prescription.refills}
											</span>
										</td>
										<td className="px-6 py-4">
											<span className="text-gray-900">
												{prescription.frequency}
											</span>
										</td>
										<td className="px-6 py-4 max-w-xs">
											<p className="text-gray-500 text-sm line-clamp-2">
												{prescription.instructions}
											</p>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2 text-gray-500">
												<Calendar size={14} />
												<ClientDate dateString={prescription.endDate} />
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex gap-4">
												<button
													type="button"
													className="text-blue-600 hover:text-blue-800 transition-colors">
													<Pencil size={18} />
												</button>
												<button
													type="button"
													className="text-red-600 hover:text-red-800 transition-colors">
													<Trash2 size={18} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex justify-between items-center m-3 text-sm text-gray-600">
						<div>
							Showing 1-{prescriptions.length} of {prescriptions.length}{" "}
							appointments
						</div>
						<div className="flex gap-2">
							<button
								type="button"
								className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
							>
								Previous
							</button>
							<button
								type="button"
								className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
							>
								Next
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PrescriptionsOverview;
