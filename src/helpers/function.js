import {
	differenceInDays,
	differenceInHours,
	addHours,
	startOfDay,
} from "date-fns";

export function appendZero(num) {
	if (num < 10 && num > -10) {
		if (num >= 0) {
			return "0" + num;
		} else {
			return "-0" + Math.abs(num);
		}
	} else {
		return num.toString();
	}
}

export function formatNumber(num, decimal = 0) {
	return Intl.NumberFormat("en-US", {
		style: "decimal",
		maximumFractionDigits: decimal,
		minimumFractionDigits: decimal,
	}).format(num);
}

export function handleUserTypes(role) {
	const user = {
		individual: "individual",
		business: "business",
		agent: "agent",
		pro: "pro",
		expert: "expert",
	};
	return user[role];
}

export function formatDate(date) {
	if (!date) return "N/A";
	const newDate = new Date(date);
	const formatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const parts = formatter.formatToParts(newDate);
	const month = parts.find((part) => part.type === "month").value.toUpperCase();
	const day = parts.find((part) => part.type === "day").value;
	const year = parts.find((part) => part.type === "year").value;
	return `${month}-${day}-${year}`;
}

export function isEmpty(obj) {
	if (obj && Object.entries(obj).length === 0) return true;
	return false;
}

export function generateArray(length) {
	if (typeof length !== "number" || length < 0) {
		throw new Error("Length must be a non-negative number");
	}

	return Array.from({ length }, (_, index) => index);
}

export const timeAgo = (date) => {
	const now = new Date();
	const diffDays = differenceInDays(now, date);
	const diffHours = differenceInHours(now, date);

	if (diffDays >= 7) {
		const weeks = Math.floor(diffDays / 7);
		return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
	} else if (diffDays > 0) {
		return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
	} else {
		return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
	}
};

export const getDifferenceInHours = (startTime, endTime) => {
	const start = parseTimeStringToTodayDate(startTime);
	const end = parseTimeStringToTodayDate(endTime);

	return differenceInHours(end, start);
};

export const parseTimeStringToTodayDate = (timeStr) => {
	const [hours, minutes, seconds] = timeStr.split(":").map(Number);
	const todayStart = startOfDay(new Date());
	return addHours(todayStart, hours).setMinutes(minutes, seconds);
};

export const getAmPm = (timeStr) => {
	const [hours, minutes] = timeStr.split(":").map(Number);
	const period = hours < 12 ? "AM" : "PM";

	// Convert hours from 24-hour format to 12-hour format
	const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
	const adjustedTimeStr = `${String(adjustedHours).padStart(2, "0")}:${String(
		minutes
	).padStart(2, "0")}`;

	return `${adjustedTimeStr} ${period}`;
};
