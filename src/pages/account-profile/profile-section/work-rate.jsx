import { useState } from "react";
import { PenIcon } from "../../../assets/pen-icon";
import { UseAuth } from "../../../context/auth-context";
import { WorkingRate } from "../../more/profile/working-rate";
import { formatNumber } from "../../../helpers/function";

export function WorkRate() {
	const { user } = UseAuth();
	const [open, setOpen] = useState();
	return (
		<div>
			{/* <p className="text-xs font-bold">Working Rate</p> */}
			<div className="py-1 px-6 rounded-full border bg-gray-50 w-fit  text-adminPrimary border-adminPrimary mb-2">
				Working Rate
			</div>
			<div className="p-3 rounded-lg bg-gray-100 text-sm flex gap-1">
				<div className="flex-1">
					NGN <strong>{formatNumber(user?.workingRateAmount ?? 0)}</strong>{" "}
					{user?.workingRateType}
				</div>
				<span onClick={() => setOpen(true)}>
					<PenIcon />
				</span>
			</div>

			{open && <WorkingRate open={open} handleClose={() => setOpen(false)} />}
		</div>
	);
}
