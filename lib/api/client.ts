import { API_BASE_URL } from "./config";
import { getApiErrorMessage } from "./errors";

export class ApiError extends Error {
	readonly status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

const parseBody = async (response: Response): Promise<unknown> => {
	const text = await response.text();
	if (!text) return null;

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export async function apiRequest<T>(
	path: string,
	options: RequestInit = {}
): Promise<T> {
	const response = await fetch(`${API_BASE_URL}/api/${path}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	const body = await parseBody(response);

	if (!response.ok) {
		throw new ApiError(
			getApiErrorMessage(body, `Request failed with status ${response.status}`),
			response.status
		);
	}

	return body as T;
}
