import PropTypes from "prop-types";

export function MailIcon({ fill = "#4440FF" }) {
	return (
		<svg
			width="16"
			height="12"
			viewBox="0 0 16 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.5 3.456V9.5625C15.5 10.8623 14.4826 11.9244 13.2008 11.9962L13.0625 12H2.9375C1.63773 12 0.575563 10.9826 0.503855 9.7008L0.5 9.5625V3.456L7.739 7.2483C7.9025 7.33388 8.0975 7.33388 8.261 7.2483L15.5 3.456ZM2.9375 0H13.0625C14.326 0 15.3651 0.961433 15.4879 2.19266L8 6.11497L0.512143 2.19266C0.630395 1.00703 1.59824 0.0715875 2.79807 0.00392246L2.9375 0Z"
				fill={fill}
			/>
		</svg>
	);
}

MailIcon.propTypes = {
	fill: PropTypes.string,
};
