import chart from "../../../assets/admin/chart.png";
import { IncreaseIcon } from "../../../assets/admin/increase-icon.jsx";
import { formatDate, formatNumber } from "../../../helpers/function";

export function GrowthCard() {
	return (
		<div
			className="bg-cover bg-center h-[150px] rounded-xl flex flex-col min-w-48"
			style={{
				border: "0.5px solid #1C4486",
			}}
		>
			<div
				className="p-3 flex justify-between items-center text-xs"
				style={{
					borderBottom: "0.5px solid #1C4486",
				}}
			>
				<span className="font-extralight">Growth Check</span>
				<span className="px-3 py-1 bg-[#E5EEFF] rounded-full text-[#1A68FF] font-semibold">
					Globally
				</span>
			</div>
			<div className="flex-1 p-3">
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<div>
							<img src={chart} alt="Chart" className="h-10" />{" "}
						</div>
						<div>
							<div className="text-xl text-[#1C4486] font-semibold">
								{formatNumber(1000)}
							</div>
							<div className="text-xs text-[#667085]">Users added</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center gap-1">
						<IncreaseIcon />
						<span className="text-xs text-[#00DE74]">1.8%</span>
					</div>
				</div>
				<div className="text-[#667085] font-extralight text-xs py-2">
					{formatDate(new Date())}
				</div>
			</div>
		</div>
	);
}
