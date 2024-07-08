import PropTypes from "prop-types";

export function ExperienceIcon({ fill = "#667085" }) {
	return (
		<svg
			width="17"
			height="17"
			viewBox="0 0 17 17"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.90675 1.32758C8.53535 0.575047 7.46225 0.575054 7.09085 1.32758L5.32241 4.91088L1.36801 5.48548C0.537538 5.60616 0.205933 6.62677 0.80687 7.21252L3.6683 10.0017L2.99281 13.9401C2.85094 14.7673 3.7191 15.398 4.46189 15.0075L7.43105 13.4465C7.31308 13.0264 7.25 12.5834 7.25 12.1256C7.25 9.43319 9.43258 7.25062 12.125 7.25062C12.9922 7.25062 13.8066 7.47704 14.5121 7.87402L15.1908 7.21252C15.7917 6.62677 15.4601 5.60616 14.6296 5.48548L10.6753 4.91088L8.90675 1.32758ZM16.25 12.1252C16.25 14.4034 14.4032 16.2502 12.125 16.2502C9.8468 16.2502 8 14.4034 8 12.1252C8 9.84704 9.8468 8.00024 12.125 8.00024C14.4032 8.00024 16.25 9.84704 16.25 12.1252ZM14.6402 10.36C14.4937 10.2136 14.2563 10.2136 14.1098 10.36L11.375 13.0949L10.1402 11.86C9.99372 11.7136 9.75628 11.7136 9.6098 11.86C9.4634 12.0065 9.4634 12.244 9.6098 12.3904L11.1098 13.8904C11.2563 14.0368 11.4937 14.0368 11.6402 13.8904L14.6402 10.8904C14.7866 10.744 14.7866 10.5065 14.6402 10.36Z"
				fill="#0FC5FF"
			/>
		</svg>
	);
}

ExperienceIcon.propTypes = {
	fill: PropTypes.string,
};
