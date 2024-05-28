import PropTypes from "prop-types";
import {
	CircularProgressbar,
	// CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function SemiCircleProgressBar({ progress, color }) {
	return (
		<div className="relative h-48 w-56">
			<CircularProgressbar
				value={progress}
				text={`${progress}%`}
				circleRatio={0.75}
				styles={buildStyles({
					rotation: 1 / 8 + 1 / 2,
					strokeLinecap: "butt",
					trailColor: "#eee",
					pathColor: color,
					textColor: "black",
					textSize: 15,
				})}
				color="#3CB371"
			/>
		</div>
	);
}

SemiCircleProgressBar.propTypes = {
	progress: PropTypes.number,
	color: PropTypes.string,
};
