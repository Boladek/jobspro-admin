import { useState } from "react";
import { Calendar } from "./calendar";
import { JobPostedCard } from "./job-posted-card";
import { formatNumber, generateArray } from "../../../helpers/function";

export function JobsPosted() {
	const today = new Date();
	today.setMonth(today.getMonth() + 1);
	today.setDate(0);
	const [startDate, setStartDate] = useState(
		new Date(today.getFullYear(), today.getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(new Date(today));

	return (
		<div>
			<div className="flex gap-4 items-center mb-4">
				<span className="text-sm text-gray-400">Jobs</span>
				<div className="">
					<Calendar
						startDate={startDate}
						endDate={endDate}
						handleStartDate={(val) => setStartDate(val)}
						handleEndDate={(val) => setEndDate(val)}
					/>
				</div>
			</div>
			<div className="mb-4 flex justify-between text-xs items-center">
				<span className="p-2 bg-[#ECFFE7] rounded-lg text-xs font-bold">
					{formatNumber(12345)} posted today
				</span>
				<span className="hover:underline cursor-pointer text-gray-500">
					See all
				</span>
			</div>
			<div className="flex flex-col gap-2">
				{generateArray(3).map(() => (
					<JobPostedCard key={Math.random()} />
				))}
			</div>
		</div>
	);
}
