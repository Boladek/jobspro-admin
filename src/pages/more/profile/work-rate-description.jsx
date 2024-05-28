import { useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { WorkingRate } from "./working-rate";
import { UseAuth } from "../../../context/auth-context";
import { formatNumber } from "../../../helpers/function";

export function WorkRateDescription() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);
	return (
		<div className="border border-primary rounded-lg p-2">
			<div className="flex justify-between mb-4">
				<p className="text-base">Working Rate</p>
				<span onClick={() => setOpen(true)}>
					<EditIcon size={0.7} />
				</span>
			</div>
			<div className="flex gap-1 items-center">
				<span className="text-xs text-gray-500">NGN</span>
				<span className="text-lg text-primary font-bold">
					{formatNumber(user.workingRateAmount)}
				</span>
				<span className="text-sm">{user.workingRateType}</span>
			</div>

			{open && <WorkingRate open={open} handleClose={() => setOpen(false)} />}
		</div>
	);
}
