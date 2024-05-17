import PropTypes from "prop-types";

export function TextingIcon({ fill = "#667085" }) {
	return (
		<svg
			width="20"
			height="19"
			viewBox="0 0 20 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3.25 2C3.16827 2 3.08708 2.00231 3.00648 2.00686C3.58328 1.10095 4.59644 0.5 5.74996 0.5H13.75C16.9256 0.5 19.5 3.07436 19.5 6.25V10.25C19.5 11.4035 18.899 12.4166 17.9931 12.9934C17.9977 12.9129 18 12.8317 18 12.75V6.25C18 3.90279 16.0972 2 13.75 2H3.25ZM0 6.25C0 4.45507 1.45507 3 3.25 3H13.75C15.5449 3 17 4.45507 17 6.25V12.75C17 14.5449 15.5449 16 13.75 16H8.7475L4.98989 18.7595C4.16433 19.3657 3 18.7762 3 17.752V15.9905C1.32189 15.8629 0 14.4608 0 12.75V6.25Z"
				fill={fill}
			/>
		</svg>
	);
}

TextingIcon.propTypes = {
	fill: PropTypes.string,
};
