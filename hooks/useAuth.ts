import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api/client";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	licenseNumber: string;
	specialty: string;
	practiceName?: string;
	practicePhone?: string;
	subscriptionPlan: string;
	role: string;
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
	return useMutation({
		mutationFn: (credentials: LoginPayload) =>
			apiRequest<AuthResponse>("auth/login", {
				method: "POST",
				body: JSON.stringify(credentials),
			}),
		onSuccess: (data) => {
			localStorage.setItem("tenantId", data.tenantId);
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
