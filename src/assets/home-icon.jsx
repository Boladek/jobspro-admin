import PropTypes from "prop-types";

export function HomeIcon({ fill = "#667085" }) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18.8632 6.18626L11.9332 0.646255C10.8632 -0.213745 9.13319 -0.213745 8.07319 0.636256L1.14319 6.18626C0.363195 6.80626 -0.136805 8.11625 0.0331948 9.09626L1.36319 17.0563C1.60319 18.4763 2.96319 19.6263 4.40319 19.6263H15.6032C17.0332 19.6263 18.4032 18.4663 18.6432 17.0563L19.9732 9.09626C20.1332 8.11625 19.6332 6.80626 18.8632 6.18626ZM10.0032 13.3163C8.62319 13.3163 7.50319 12.1963 7.50319 10.8163C7.50319 9.43626 8.62319 8.31626 10.0032 8.31626C11.3832 8.31626 12.5032 9.43626 12.5032 10.8163C12.5032 12.1963 11.3832 13.3163 10.0032 13.3163Z"
				fill={fill}
			/>
			<defs>
				<linearGradient
					id="paint0_linear_2620_5385"
					x1="3.01978"
					y1="-5.99083"
					x2="5.14582"
					y2="23.8663"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={fill} />
					<stop offset="1" stopColor="#0072BB" />
				</linearGradient>
			</defs>
		</svg>
	);
}

HomeIcon.propTypes = {
	fill: PropTypes.string,
};
