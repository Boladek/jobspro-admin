import { useState } from "react";
import { BaseButton } from "../../../component/button";
import { BillingsTable } from "./billings-table";
import { Calendar } from "../../admin/landing-page/calendar";
import { BillingsMethod } from "./billings-method";

export function BillingsPage() {
	const today = new Date();
	today.setMonth(today.getMonth() + 1);
	today.setDate(0);
	const [startDate, setStartDate] = useState(
		new Date(today.getFullYear(), today.getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(new Date(today));

	return (
		<div className="p-2">
			<p className="text-lg font-bold">Billings Information</p>
			<p className="text-xs font-extralight mb-4">
				This information is required in order to confirm if you are a U.S. or
				non-U.S. taxpayer and whether or not Upwork is required to withhold
				taxes from your earnings. Add your tax information now to avoid delays
				in getting paid.
			</p>
			<div className="bg-light p-4 rounded-lg mb-4">
				<BillingsMethod />
			</div>
			<div>
				<div className="flex justify-between items-center mb-4">
					<Calendar
						startDate={startDate}
						endDate={endDate}
						handleEndDate={(val) => setEndDate(val)}
						handleStartDate={(val) => setStartDate(val)}
					/>
					<div>
						<BaseButton size="small">Download &darr;</BaseButton>
					</div>
				</div>
				<div>
					<BillingsTable />
				</div>
			</div>
		</div>
	);
}
