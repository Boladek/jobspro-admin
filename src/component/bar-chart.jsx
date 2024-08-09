import { ResponsiveBar } from "@nivo/bar";
import { array, oneOfType, number, string, func } from "prop-types";

export function BarChart({ data, width, height, keys, indexBy, handleColors }) {
	return (
		<div style={{ width, height }}>
			<ResponsiveBar
				data={data}
				keys={keys}
				indexBy={indexBy}
				margin={{
					top: 2,
					right: 2,
					bottom: 30,
					left: 30,
				}}
				padding={0.3}
				groupMode="grouped"
				valueScale={{ type: "linear" }}
				enableLabel={false}
				colors={handleColors}
				indexScale={{ type: "band", round: true }}
				borderColor={{
					from: "color",
					modifiers: [["darker", 1.6]],
				}}
				axisTop={null}
				axisRight={null}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: "color",
					modifiers: [["darker", 1.6]],
				}}
				barAriaLabel={(e) =>
					e.id + ": " + e.formattedValue + ` in ${indexBy}: ` + e.indexValue
				}
			/>
		</div>
	);
}

BarChart.propTypes = {
	data: array,
	width: oneOfType([number, string]),
	height: oneOfType([number, string]),
	keys: array,
	indexBy: string,
	handleColors: func,
};

// const sample = [
// 	{
// 		country: "AD",
// 		posted: 150,
// 		postedColor: "#F7FFD7",
// 		match: 72,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AE",
// 		posted: 61,
// 		postedColor: "#F7FFD7",
// 		match: 27,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AF",
// 		posted: 150,
// 		postedColor: "#F7FFD7",
// 		match: 50,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AG",
// 		posted: 133,
// 		postedColor: "#F7FFD7",
// 		match: 45,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AI",
// 		posted: 54,
// 		postedColor: "#F7FFD7",
// 		match: 68,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AL",
// 		posted: 170,
// 		postedColor: "#F7FFD7",
// 		match: 22,
// 		matchColor: "#0FFF9A",
// 	},
// 	{
// 		country: "AM",
// 		posted: 162,
// 		postedColor: "#F7FFD7",
// 		match: 70,
// 		matchColor: "#0FFF9A",
// 	},
// ];
