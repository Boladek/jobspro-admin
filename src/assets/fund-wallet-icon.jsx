import PropTypes from "prop-types";

export function FundWalletIcon({ fill = "#04D87F" }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.25 5C3.45507 5 2 6.45507 2 8.25V9.5H22V8.25C22 6.45507 20.5449 5 18.75 5H5.25ZM2 15.75V11H18.5C16.567 11 15 12.567 15 14.5C15 15.4793 15.4022 16.3647 16.0505 17H15.7727C14.5097 17 13.4433 17.8442 13.1089 19H5.25C3.45507 19 2 17.5449 2 15.75ZM21 14.5C21 15.8807 19.8807 17 18.5 17C17.1193 17 16 15.8807 16 14.5C16 13.1193 17.1193 12 18.5 12C19.8807 12 21 13.1193 21 14.5ZM23 19.875C23 21.4315 21.7143 23 18.5 23C15.2857 23 14 21.4374 14 19.875V19.772C14 18.7929 14.7937 18 15.7727 18H21.2273C22.2063 18 23 18.793 23 19.772V19.875Z"
				fill={fill}
			/>
		</svg>
	);
}

FundWalletIcon.propTypes = {
	fill: PropTypes.string,
};
