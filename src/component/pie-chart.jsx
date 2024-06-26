import { ResponsivePie } from "@nivo/pie";
import { oneOfType, number, string, object, array, bool } from "prop-types";
// import "../pieChart/PieChart.scss";

export function PieChart({
	// numberCenter,
	textCenter,
	width,
	height,
	textStyle,
	// numberStyle,
	innerRadius,
	data,
	colors,
	isInteractive,
}) {
	const colorMap = data.reduce((acc, item, index) => {
		acc[item.id] = colors[index];
		return acc;
	}, {});

	return (
		<div className="relative" style={{ width, height }}>
			<div className="absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 text-center leading-normal">
				{textCenter && <span style={textStyle}>{textCenter}</span>}
			</div>
			<ResponsivePie
				data={data}
				margin={{
					top: 2,
					right: 2,
					bottom: 2,
					left: 2,
				}}
				valueFormat={`>-.4`}
				innerRadius={innerRadius}
				enableRadialLabels={false} // Disable radial labels
				enableArcLinkLabels={false} // Disable arc link labels
				// enableArcLabels={false}
				arcLabelsSkipAngle={10}
				arcLinkLabelsThickness={0}
				colors={({ id }) => colorMap[id]}
				borderWidth={1}
				borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
				isInteractive={isInteractive}
			/>
		</div>
	);
}

PieChart.propTypes = {
	data: array,
	colors: array,
	numberCenter: number,
	numberStyle: object,
	textCenter: string,
	textStyle: object,
	innerRadius: number,
	width: oneOfType([number, string]),
	height: oneOfType([number, string]),
	isInteractive: bool,
};

PieChart.defaultProps = {
	data: [
		{
			id: "red",
			label: `${30}%`,
			value: 30,
			color: "blue",
		},
		{
			id: "yellow",
			label: `${60}%`,
			value: 60,
			color: "yellow",
		},
		{
			id: "go",
			label: `go ${50}%`,
			value: 50,
			color: "red",
		},
	],
	colors: ["#E14C38", "blue", "#F4DB72"],
	numberCenter: 0,
	numberStyle: { fontWeight: "bold", fontSize: 24 },
	textCenter: "",
	textStyle: {},
	innerRadius: 0.85,
	width: 150,
	height: 150,
	isInteractive: false,
};
