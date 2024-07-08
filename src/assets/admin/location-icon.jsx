import PropTypes from "prop-types";

export function LocationIcon({ fill = "#57FFAE" }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.9172 1.63366C16.2904 0.663148 15.3368 -0.290424 14.3663 0.0828447L0.769313 5.31247C-0.317861 5.73061 -0.231763 7.29656 0.894698 7.59296L6.50344 9.06898C6.71264 9.12402 6.87592 9.28738 6.93096 9.4965L8.40698 15.1053C8.70338 16.2317 10.2694 16.3179 10.6875 15.2307L15.9172 1.63366Z"
				fill={fill}
			/>
		</svg>
	);
}

LocationIcon.propTypes = {
	fill: PropTypes.string,
};
