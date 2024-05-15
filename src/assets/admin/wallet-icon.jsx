import PropTypes from "prop-types";

export function WalletIcon({ fill = "#667085" }) {
	return (
		<svg
			width="20"
			height="18"
			viewBox="0 0 20 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 5V3.25C0 1.45507 1.45507 0 3.25 0H6.12868C6.72542 0 7.29771 0.23705 7.71967 0.65901L9.25 2.18934L6.65901 4.78033C6.51836 4.92098 6.32759 5 6.12868 5H0ZM0 6.5V14.75C0 16.5449 1.45507 18 3.25 18H16.75C18.5449 18 20 16.5449 20 14.75V5.75C20 3.95507 18.5449 2.5 16.75 2.5H11.0607L7.71967 5.84099C7.29771 6.26295 6.72542 6.5 6.12868 6.5H0Z"
				fill={fill}
			/>
		</svg>
	);
}

WalletIcon.propTypes = {
	fill: PropTypes.string,
};
