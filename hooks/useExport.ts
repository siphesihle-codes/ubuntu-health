import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";

const downloadJson = (data: unknown, fileName: string) => {
	const url = URL.createObjectURL(
		new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
	);

	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.click();

	URL.revokeObjectURL(url);
};

export function useExportPractice() {
	return useMutation({
		mutationFn: async () => {
			const data = await apiRequest<unknown>("Export");
			const stamp = new Date().toISOString().slice(0, 10);
			downloadJson(data, `ubuntu-health-export-${stamp}.json`);
		},
	});
}
