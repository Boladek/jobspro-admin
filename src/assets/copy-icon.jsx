import PropTypes from "prop-types";

export function CopyIcon({ size = 1 }) {
	return (
		<svg
			width="35"
			height="40"
			viewBox="0 0 35 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="16.2217"
				y="2"
				width="14.1026"
				height="19.3548"
				rx="2"
				fill="#74CD03"
			/>
			<g filter="url(#filter0_d_2725_7076)">
				<path
					d="M10 8.64502C10 7.54045 10.8954 6.64502 12 6.64502H18.1026C21.4163 6.64502 24.1026 9.33131 24.1026 12.645V23.9999C24.1026 25.1044 23.2072 25.9999 22.1026 25.9999H12C10.8954 25.9999 10 25.1044 10 23.9999V8.64502Z"
					fill="#CCFF02"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_2725_7076"
					x="0"
					y="0.64502"
					width="34.1025"
					height="39.355"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_2725_7076"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2725_7076"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
}

CopyIcon.propTypes = {
	size: PropTypes.number,
};
