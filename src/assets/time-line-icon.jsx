import PropTypes from "prop-types";

export function TimeLineIcon({ fill = "#4440FF" }) {
	return (
		<svg
			width="30"
			height="34"
			viewBox="0 0 30 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="8" width="22" height="22" rx="2" fill="#408CFF" />
			<rect y="14" width="21" height="20" rx="2" fill="#04D87F" />
		</svg>
	);
}

TimeLineIcon.propTypes = {
	fill: PropTypes.string,
};
