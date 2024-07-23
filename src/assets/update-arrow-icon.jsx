import PropTypes from "prop-types";

export function UpdateArrowIcon({ fill = "#4440FF" }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.8325 0.0122312C19.0745 -0.125769 20.1239 0.923661 19.9859 2.16565L18.6457 14.2273C18.4652 15.8524 16.485 16.547 15.3288 15.3908L14.0617 14.1236L8.758 19.4273C7.99647 20.1888 6.7618 20.1888 6.00027 19.4273L0.57114 13.9982C-0.19038 13.2366 -0.19038 12.002 0.57114 11.2404L5.87481 5.93678L4.60738 4.66934C3.4512 3.51317 4.1458 1.53298 5.77089 1.35241L17.8325 0.0122312Z"
				fill="#212121"
			/>
		</svg>
	);
}

UpdateArrowIcon.propTypes = {
	fill: PropTypes.string,
};
