export const queryKeys = {
	auth: {
		me: ["auth", "me"] as const,
	},
	staff: {
		all: ["staff"] as const,
		invitations: ["staff", "invitations"] as const,
	},
	invitations: {
		preview: (token: string) => ["invitations", token] as const,
	},
	patients: {
		all: ["patients"] as const,
		detail: (id: string) => ["patients", id] as const,
	},
	appointments: {
		all: ["appointments"] as const,
		list: (page: number, pageSize: number) =>
			["appointments", "list", page, pageSize] as const,
	},
	prescriptions: {
		all: ["prescriptions"] as const,
	},
	invoices: {
		all: ["invoices"] as const,
	},
	clinicalNotes: {
		all: ["clinicalNotes"] as const,
	},
};
