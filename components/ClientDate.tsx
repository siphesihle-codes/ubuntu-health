import { useMemo, useSyncExternalStore } from "react";

const formatRelativeTime = (date: Date, locale: string): string => {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

	if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
	if (diffInSeconds < 3600)
		return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
	if (diffInSeconds < 86400)
		return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
	if (diffInSeconds < 2592000)
		return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
	if (diffInSeconds < 31536000)
		return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");

	return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
};

interface ClientDateProps {
	dateString: string;
	format?: "date" | "time" | "datetime" | "relative";
	locale?: string;
	timeZone?: string;
}

const subscribeToClient = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

const ClientDate = ({
	dateString,
	format = "date",
	locale = "en-ZA",
	timeZone,
}: ClientDateProps) => {
	const isClient = useSyncExternalStore(
		subscribeToClient,
		getIsClient,
		getIsServer
	);

	const formattedDate = useMemo(() => {
		if (!isClient) {
			return "";
		}

		try {
			const date = new Date(dateString);

			if (isNaN(date.getTime())) {
				throw new Error("Invalid date string");
			}

			const options: Intl.DateTimeFormatOptions = {
				timeZone: timeZone || undefined,
			};

			switch (format) {
				case "date":
					options.year = "numeric";
					options.month = "short";
					options.day = "numeric";
					return date.toLocaleDateString(locale, options);

				case "time":
					options.hour = "2-digit";
					options.minute = "2-digit";
					return date.toLocaleTimeString(locale, options);

				case "datetime":
					options.year = "numeric";
					options.month = "short";
					options.day = "numeric";
					options.hour = "2-digit";
					options.minute = "2-digit";
					return date.toLocaleString(locale, options);

				case "relative":
					return formatRelativeTime(date, locale);

				default:
					return date.toISOString();
			}
		} catch (error) {
			console.error("Error formatting date:", error);
			return "Invalid date";
		}
	}, [isClient, dateString, format, locale, timeZone]);

	return <span>{formattedDate}</span>;
};

export default ClientDate;
