import PropTypes from "prop-types";

export function ProgressBar({ percent, color, thickness = 1.5, bg = "#fff" }) {
	return (
		<div
			className={`h-${thickness} w-full rounded-md overflow-hidden`}
			style={{
				background: bg,
			}}
		>
			<div
				style={{
					height: "100%",
					width: `${percent}%`,
					backgroundColor: `${color}`,
				}}
			/>
		</div>
	);
}

ProgressBar.propTypes = {
	percent: PropTypes.string,
	color: PropTypes.string,
	thickness: PropTypes.number,
	bg: PropTypes.string,
};
