import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Subscription, SubscriptionPlanName } from "@/types";

export function useSubscription() {
	return useQuery({
		queryKey: queryKeys.subscription.current,
		queryFn: () => apiRequest<Subscription>("Subscription"),
	});
}

export function useUpgradeSubscription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (plan: SubscriptionPlanName) =>
			apiRequest<Subscription>("Subscription/upgrade", {
				method: "POST",
				body: JSON.stringify({ plan }),
			}),
		onSuccess: (data) => {
			queryClient.setQueryData(queryKeys.subscription.current, data);
			queryClient.invalidateQueries();
		},
	});
}
