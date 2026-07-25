import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			display: ["Inter", "system-ui", "sans-serif"],
			body: ["Inter", "system-ui", "sans-serif"],
		},
		safelist: [
			{ pattern: /bg-(green|teal|orange)-900\/30/ },
			{ pattern: /text-(green|teal|orange)-400/ },
		],
	},
	plugins: [],
};
export default config;
