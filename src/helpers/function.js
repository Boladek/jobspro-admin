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
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(newDate);
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
