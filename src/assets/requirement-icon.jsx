import PropTypes from "prop-types";

export function RequirementsIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.99967 1.33337L14.6663 5.66671M7.99967 1.33337L1.33301 5.66671M7.99967 1.33337V5.66671M14.6663 5.66671V10.3334M14.6663 5.66671L7.99967 10.3334M14.6663 10.3334L7.99967 14.6667M14.6663 10.3334L7.99967 5.66671M7.99967 14.6667L1.33301 10.3334M7.99967 14.6667V10.3334M1.33301 10.3334V5.66671M1.33301 10.3334L7.99967 5.66671M1.33301 5.66671L7.99967 10.3334"
				stroke="#005AAA"
				strokeWidth="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

RequirementsIcon.propTypes = {
	fill: PropTypes.string,
};
