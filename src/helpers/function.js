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
