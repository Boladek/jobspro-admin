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
