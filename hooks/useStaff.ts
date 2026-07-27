import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { Invitation, Role, StaffMember } from "@/types";

export interface InvitationPayload {
	email: string;
	role: Role;
}

export interface CreatedInvitation {
	id: number;
	email: string;
	role: Role;
	expiresAt: string;
	token: string;
}

export function useStaff() {
	return useQuery({
		queryKey: queryKeys.staff.all,
		queryFn: () => apiRequest<StaffMember[]>("Staff"),
	});
}

export function useUpdateStaffRole() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, role }: { id: string; role: Role }) =>
			apiRequest<StaffMember>(`Staff/${id}/role`, {
				method: "PUT",
				body: JSON.stringify({ role }),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.staff.all }),
	});
}

export function useUpdateStaffStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
			apiRequest<StaffMember>(`Staff/${id}/status`, {
				method: "PUT",
				body: JSON.stringify({ isActive }),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.staff.all }),
	});
}

export function useInvitations() {
	return useQuery({
		queryKey: queryKeys.staff.invitations,
		queryFn: () => apiRequest<Invitation[]>("Staff/invitations"),
	});
}

export function useCreateInvitation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (invitation: InvitationPayload) =>
			apiRequest<CreatedInvitation>("Staff/invitations", {
				method: "POST",
				body: JSON.stringify(invitation),
			}),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.staff.invitations }),
	});
}

export function useRevokeInvitation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) =>
			apiRequest<void>(`Staff/invitations/${id}`, { method: "DELETE" }),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.staff.invitations }),
	});
}
