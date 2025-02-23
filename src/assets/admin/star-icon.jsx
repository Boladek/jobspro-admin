import PropTypes from "prop-types";

export function StarIcon({ size = 1, filled = false }) {
	return (
		<svg
			width={size * 20}
			height={size * 20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.7878 1.10215C9.283 0.0987682 10.7138 0.0987582 11.209 1.10215L13.567 5.87987L18.8395 6.64601C19.9468 6.80691 20.3889 8.1677 19.5877 8.9487L15.7724 12.6676L16.6731 17.9189C16.8622 19.0217 15.7047 19.8627 14.7143 19.342L9.9984 16.8627L5.28252 19.342C4.29213 19.8627 3.13459 19.0217 3.32374 17.9189L4.2244 12.6676L0.40916 8.9487C-0.39209 8.1677 0.0500505 6.80691 1.15735 6.64601L6.42988 5.87987L8.7878 1.10215Z"
				fill={filled ? "#FFD700" : "#FFFFFF"}
				stroke="#FFD700"
				strokeWidth="1"
			/>
		</svg>
	);
}

StarIcon.propTypes = {
	size: PropTypes.number,
	filled: PropTypes.bool,
};
