import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/queryKeys";
import type { InvitationPreview, UserProfile } from "@/types";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	practiceName: string;
	practicePhone?: string;
	subscriptionPlan: string;
}

export interface ProfilePayload {
	firstName: string;
	lastName: string;
	phone?: string;
	licenseNumber?: string;
	specialty?: string;
}

export interface AcceptInvitationPayload {
	firstName: string;
	lastName: string;
	password: string;
}

export interface AuthResponse {
	isSuccess: boolean;
	refreshToken: string | null;
	message: string;
	email: string;
	tenantId: string;
	roles: string[];
}

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials: LoginPayload) =>
			apiRequest<AuthResponse>("auth/login", {
				method: "POST",
				body: JSON.stringify(credentials),
			}),
		onSuccess: (data) => {
			localStorage.setItem("tenantId", data.tenantId);
			queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => apiRequest<AuthResponse>("auth/logout", { method: "POST" }),
		onSettled: () => {
			localStorage.removeItem("tenantId");
			queryClient.clear();
		},
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: (registration: RegisterPayload) =>
			apiRequest<AuthResponse>("auth/register", {
				method: "POST",
				body: JSON.stringify(registration),
			}),
	});
}

export function useCurrentUser() {
	return useQuery({
		queryKey: queryKeys.auth.me,
		queryFn: () => apiRequest<UserProfile>("auth/me"),
		retry: false,
	});
}

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (profile: ProfilePayload) =>
			apiRequest<UserProfile>("auth/me", {
				method: "PUT",
				body: JSON.stringify(profile),
			}),
		onSuccess: (data) => queryClient.setQueryData(queryKeys.auth.me, data),
	});
}

export function useInvitationPreview(token: string | undefined) {
	return useQuery({
		queryKey: queryKeys.invitations.preview(token ?? ""),
		queryFn: () => apiRequest<InvitationPreview>(`Invitations/${token}`),
		enabled: Boolean(token),
		retry: false,
	});
}

export function useAcceptInvitation(token: string | undefined) {
	return useMutation({
		mutationFn: (acceptance: AcceptInvitationPayload) =>
			apiRequest<AuthResponse>(`Invitations/${token}/accept`, {
				method: "POST",
				body: JSON.stringify(acceptance),
			}),
	});
}
