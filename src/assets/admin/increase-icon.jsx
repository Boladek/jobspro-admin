import PropTypes from "prop-types";

export function IncreaseIcon({ fill = "#00DE74" }) {
	return (
		<svg
			width="15"
			height="9"
			viewBox="0 0 15 9"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.25243 8.98144C0.17849 8.98144 -0.39549 7.71654 0.31171 6.90824L5.83349 0.597619C6.53079 -0.199201 7.77029 -0.199211 8.46759 0.597619L13.9894 6.90824C14.6966 7.71654 14.1226 8.98144 13.0487 8.98144H1.25243Z"
				fill={fill}
			/>
		</svg>
	);
}

IncreaseIcon.propTypes = {
	fill: PropTypes.string,
};
