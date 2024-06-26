import PropTypes from "prop-types";

export function ProgressBar({ percent, color, thickness = 1, bg = "#fff" }) {
	return (
		<div
			className={`w-full rounded-md overflow-hidden`}
			style={{
				background: bg,
				height: `${thickness * 0.25}rem`,
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
