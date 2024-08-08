import { useState } from "react";
import { BarChart } from "../../../../../component/bar-chart";

const tabs = ["industry", "country"];

export function RevenueBarChart() {
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="flex justify-between items-center">
				<div className="py-2 px-4 rounded-md border border-[#025949] text-[#025949] text-xs font-bold w-fit">
					Revenue Flow
				</div>
				<div className="flex gap-2 items-center text-xs">
					{tabs.map((item) => (
						<div
							key={item}
							className={`${
								activeTab === item
									? "text-[#025949] font-semibold bg-[#FFDE16]"
									: ""
							} px-4 py-1 rounded-full capitalize cursor-pointer`}
							onClick={() => setActiveTab(item)}
						>
							{item}
						</div>
					))}
				</div>
				<select className="text-xs border-0 focus:outline-0">
					<option>All</option>
				</select>
			</div>
			<div className="flex gap-8 items-center text-xs">
				Earnings by gender{" "}
				<div className="flex gap-4 items-center">
					{[
						{ gender: "male", color: "#0FFF9A" },
						{ gender: "female", color: "#F7FFD7" },
					].map((val) => (
						<div
							key={val.gender}
							className="flex gap-1 items-center capitalize text-xs"
						>
							<div
								style={{ background: val.color }}
								className="h-4 w-4 rounded-sm"
							/>{" "}
							{val.gender}
						</div>
					))}
				</div>
			</div>
			<div>
				<BarChart height={250} width="100%" />
			</div>
		</div>
	);
}
