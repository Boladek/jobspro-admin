import React from "react";
import { RequirementsIcon } from "../../../../../assets/requirement-icon";

export function Tier1() {
	return (
		<div>
			<p>Tier 1 Verification</p>
			<div className="p-4 border rounded-md border-adminPrimary flex gap-4 items-center mb-4">
				<div className="p-2 rounded-full bg-primary/30 w-fit">
					<RequirementsIcon />
				</div>
				<div className="flex-1">
					<p className="font-bold text-sm text-adminPrimary">BVN</p>
					<p className="text-xs">Verify your BVN</p>
				</div>
			</div>
			<div className="p-4 border rounded-md border-adminPrimary flex gap-4 items-center">
				<div className="p-2 rounded-full bg-primary/30 w-fit">
					<RequirementsIcon />
				</div>
				<div className="flex-1">
					<p className="font-bold text-sm text-adminPrimary">
						Business Verification
					</p>
					<p className="text-xs">
						Please provide us with your CAC registration number.
					</p>
				</div>
			</div>
		</div>
	);
}
