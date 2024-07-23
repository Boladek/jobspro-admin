import { useState } from "react";
import { DeactivateIcon } from "../../../../assets/deactivate-icon";

export function DeactivateUser() {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="p-4 rounded-lg bg-[#FFF2EF] text-black/50 select-none">
			<p className="font-semibold text-sm mb-1 text-[#FF1E0F]">
				Deactivate User
			</p>
			<div
				className="flex gap-2 justify-between items-center mb-4"
				onClick={() => setIsExpanded((prev) => !prev)}
			>
				<p className="text-tiny">
					Click here to deactivate/activate user account
				</p>
				<span>
					<DeactivateIcon />
				</span>
			</div>
			{isExpanded && (
				<div>
					<p className="font-semibold text-xs mb-2 text-black/50">
						Do you want to deactivte this user
					</p>
					<div className="flex gap-4 max-w-[300px]">
						<div className="flex-1">
							<button className="border border-black/20 p-2 text-xs w-full rounded-md capitalize bg-[#FFD2D2]">
								yes
							</button>
						</div>
						<div className="flex-1">
							<button className="border border-black/20 p-2 text-xs w-full rounded-md capitalize bg-white">
								no
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
