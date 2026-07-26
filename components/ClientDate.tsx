import { useEffect, useState } from "react";

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

const ClientDate = ({
	dateString,
	format = "date",
	locale = "en-ZA",
	timeZone,
}: ClientDateProps) => {
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		try {
			const date = new Date(dateString);

			if (isNaN(date.getTime())) {
				throw new Error("Invalid date string");
			}

			let formatted;
			const options: Intl.DateTimeFormatOptions = {
				timeZone: timeZone || undefined,
			};

			switch (format) {
				case "date":
					options.year = "numeric";
					options.month = "short";
					options.day = "numeric";
					formatted = date.toLocaleDateString(locale, options);
					break;

				case "time":
					options.hour = "2-digit";
					options.minute = "2-digit";
					formatted = date.toLocaleTimeString(locale, options);
					break;

				case "datetime":
					options.year = "numeric";
					options.month = "short";
					options.day = "numeric";
					options.hour = "2-digit";
					options.minute = "2-digit";
					formatted = date.toLocaleString(locale, options);
					break;

				case "relative":
					formatted = formatRelativeTime(date, locale);
					break;

				default:
					formatted = date.toISOString();
			}

			setFormattedDate(formatted);
		} catch (error) {
			console.error("Error formatting date:", error);
			setFormattedDate("Invalid date");
		}
	}, [dateString, format, locale, timeZone]);

	return <span>{formattedDate}</span>;
};

export default ClientDate;
