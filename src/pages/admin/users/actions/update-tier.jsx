import { useState } from "react";
// import { UpdateArrowIcon } from "../../../../assets/update-arrow-icon";

export function UpdateTier() {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<div className="p-4 rounded-lg bg-[#E5FFE4] text-black/50">
			<p className="font-semibold text-sm mb-1">Update Tier</p>
			<div className="flex gap-2 justify-between items-center">
				<p className="text-tiny select-none cursor-pointer" onClick={() => setIsExpanded((prev) => !prev)}>
					You can either upgrade or downgrade a user tier
				</p>
				<span>
					{/* <UpdateArrowIcon /> */}
				</span>
			</div>

			{isExpanded && <div>Expanded</div>}
		</div>
	);
}
