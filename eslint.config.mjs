import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import pluginQuery from "@tanstack/eslint-plugin-query";

const eslintConfig = [
	...nextCoreWebVitals,
	...pluginQuery.configs["flat/recommended"],
];

export default eslintConfig;
