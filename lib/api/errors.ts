type ApiErrorBody = {
	message?: string;
	title?: string;
	errors?: Record<string, string[]>;
};

export function getApiErrorMessage(data: unknown, fallback: string): string {
	if (typeof data !== "object" || data === null) {
		return fallback;
	}

	const { message, title, errors } = data as ApiErrorBody;

	if (message) {
		return message;
	}

	if (errors) {
		const details = Object.values(errors).flat().filter(Boolean);
		if (details.length > 0) {
			return details.join(" ");
		}
	}

	return title || fallback;
}
