import PropTypes from "prop-types";

export function ExportIcon({ fill = "#667085" }) {
	return (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.5 22.75C6.57 22.75 1.75 17.93 1.75 12C1.75 6.07 6.57 1.25 12.5 1.25C12.91 1.25 13.25 1.59 13.25 2C13.25 2.41 12.91 2.75 12.5 2.75C7.4 2.75 3.25 6.9 3.25 12C3.25 17.1 7.4 21.25 12.5 21.25C17.6 21.25 21.75 17.1 21.75 12C21.75 11.59 22.09 11.25 22.5 11.25C22.91 11.25 23.25 11.59 23.25 12C23.25 17.93 18.43 22.75 12.5 22.75Z"
				fill="#08489E"
			/>
			<path
				d="M13.4975 11.7502C13.3075 11.7502 13.1175 11.6802 12.9675 11.5302C12.6775 11.2402 12.6775 10.7602 12.9675 10.4702L21.1675 2.27023C21.4575 1.98023 21.9375 1.98023 22.2275 2.27023C22.5175 2.56023 22.5175 3.04023 22.2275 3.33023L14.0275 11.5302C13.8775 11.6802 13.6875 11.7502 13.4975 11.7502Z"
				fill="#08489E"
			/>
			<path
				d="M22.5019 7.58C22.0919 7.58 21.7519 7.24 21.7519 6.83V2.75H17.6719C17.2619 2.75 16.9219 2.41 16.9219 2C16.9219 1.59 17.2619 1.25 17.6719 1.25H22.5019C22.9119 1.25 23.2519 1.59 23.2519 2V6.83C23.2519 7.24 22.9119 7.58 22.5019 7.58Z"
				fill="#08489E"
			/>
		</svg>
	);
}

ExportIcon.propTypes = {
	fill: PropTypes.string,
};
