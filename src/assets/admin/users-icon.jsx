import PropTypes from "prop-types";

export function UsersIcon({ fill = "#667085" }) {
	return (
		<svg
			width="20"
			height="18"
			viewBox="0 0 20 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.754 7C13.7205 7 14.504 7.7835 14.504 8.75V13.499C14.504 15.9848 12.4888 18 10.003 18C7.51712 18 5.50193 15.9848 5.50193 13.499V8.75C5.50193 7.7835 6.28543 7 7.25193 7H12.754ZM5.13128 6.99906C4.78183 7.4218 4.55636 7.9508 4.51057 8.5304L4.50193 8.75V13.499C4.50193 14.3456 4.69319 15.1476 5.03487 15.864C4.70577 15.953 4.35899 16 4.00124 16C1.79142 16 0 14.2086 0 11.9988V8.75C0 7.8318 0.70711 7.0788 1.60647 7.0058L1.75 7L5.13128 6.99906ZM14.8747 6.99906L18.25 7C19.2165 7 20 7.7835 20 8.75V12C20 14.2091 18.2091 16 16 16C15.6436 16 15.298 15.9534 14.9691 15.8659C15.2697 15.238 15.4538 14.5452 15.4951 13.8144L15.504 13.499V8.75C15.504 8.0847 15.2678 7.4747 14.8747 6.99906ZM10 0C11.6569 0 13 1.34315 13 3C13 4.65685 11.6569 6 10 6C8.3431 6 7 4.65685 7 3C7 1.34315 8.3431 0 10 0ZM16.5 1C17.8807 1 19 2.11929 19 3.5C19 4.88071 17.8807 6 16.5 6C15.1193 6 14 4.88071 14 3.5C14 2.11929 15.1193 1 16.5 1ZM3.5 1C4.88071 1 6 2.11929 6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1Z"
				fill={fill}
			/>
		</svg>
	);
}

UsersIcon.propTypes = {
	fill: PropTypes.string,
};
