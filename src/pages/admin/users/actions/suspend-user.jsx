import { useState } from "react";
import { Switch } from "../../../../component/switch";

export function SuspendUser() {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="p-4 rounded-lg bg-[#FFF8CD] text-black/50 select-none">
			<p className="font-semibold text-sm mb-1">Suspend User</p>
			<div className="flex gap-2 justify-between items-center mb-4">
				<p className="text-tiny" onClick={() => setIsExpanded((prev) => !prev)}>
					Click here to suspend user account
				</p>
				<span>
					<Switch handleChecked={() => null} checked />
				</span>
			</div>
			{isExpanded && (
				<div>
					<p className="font-semibold text-xs mb-2 text-black/50">
						Do you want to suspend this user
					</p>
					<div className="flex gap-4 max-w-[300px]">
						<div className="flex-1">
							<button className="border border-black/20 p-2 text-xs w-full rounded-md capitalize">
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
