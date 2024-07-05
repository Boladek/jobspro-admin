import { ProgressBar } from "./admin/progress-bar";
import { RewindIcon } from "../assets/rewind-icon";
import { ForwardIcon } from "../assets/forward-icon";

export function Notification() {
	const isEven = Math.floor(Math.random() * 10) % 2 === 0;

	return (
		<div className="p-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer">
			<div className="p-3 rounded-lg bg-[#FEDF00]">
				{isEven ? <RewindIcon fill="#000" /> : <ForwardIcon fill="#000" />}
			</div>
			<div className="flex-1 text-xs">
				<p>
					<span className="text-adminPrimary font-bold">JobsPro</span> |{" "}
					<span className="font-bold">Wallet</span>
				</p>
				<p>Your wallet has been credited with NGN 12,000</p>
			</div>
			<div className="w-1/12">
				<p className="text-tiny mb-0.5 text-gray-600">
					{isEven ? "Read" : "Unread"}
				</p>
				<div className="w-6">
					<ProgressBar color={isEven ? "#14FF9C" : "#FE005B"} thickness={1.2} />
				</div>
			</div>
		</div>
	);
}
