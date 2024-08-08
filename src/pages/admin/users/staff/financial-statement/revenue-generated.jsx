import { IncreaseIcon } from "../../../../../assets/admin/increase-icon";
import { formatNumber, formatDate } from "../../../../../helpers/function";
import chart from "../../../../../assets/admin/chart.png";

export function RevenueGenerated() {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="py-2 px-4 rounded-md border border-[#025949] text-[#025949] text-xs font-bold w-fit">
				Revenue Generated
			</div>
			<div className="flex gap-3 flex-wrap">
				<div
					className="bg-cover bg-center h-[120px] rounded-xl flex flex-col w-full sm:w-1/2"
					style={{
						border: "0.5px solid #1C4486",
					}}
				>
					<div className="p-2 flex justify-between items-center text-tiny">
						<div>
							<div className="text-adminPrimary text-xs">
								Total Earnings by commission
							</div>
							<div className="text-gray-400">{formatDate(new Date())}</div>
						</div>
						<span className="py-1 px-2 bg-[#E5EEFF] rounded-full text-[#1A68FF] font-semibold">
							Globally
						</span>
					</div>
					<div className="flex-1 p-2">
						<div className="flex items-center justify-between">
							<div className="flex gap-2 items-center">
								<div>
									<img src={chart} alt="Chart" className="h-10" />{" "}
								</div>
								<div className="text-lg text-[#1C4486] font-semibold">
									<span className="text-sm">NGN</span> {formatNumber(1000)}
								</div>
							</div>
							<div className="flex flex-col justify-center items-center gap-1">
								<IncreaseIcon />
								<span className="text-xs text-[#00DE74]">1.8%</span>
							</div>
						</div>
					</div>
				</div>
				<div className="grid col-span-1 gap-2 flex-1">
					<p className="text-xs text-[#1C4486]">
						Commissions Breakdown Percentage
					</p>
					<div className="p-2 px-4 bg-[#0FFF9A] text-[#344054] flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">70%</div>
						<div className="text-sm">Sole Proprietorship</div>
					</div>
					<div className="p-2 px-4 bg-[#1A68FF] text-white flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">30%</div>
						<div className="text-sm">Businesses</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-4 overflow-auto">
				<div className="flex flex-col justify-center items-center gap-1">
					<p className="text-xs text-gray-500 font-semibold">Total Completed Gigs</p>
					<div className="h-24 w-24 rounded-full bg-[#1A68FF] flex flex-col items-center justify-center text-white">
						<div className="font-bold">20</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-1">
					<p className="text-xs text-gray-500 font-semibold">Avg Comm Earned</p>
					<div className="h-24 w-24 rounded-full bg-[#664DFF] flex flex-col items-center justify-center text-white">
						<div>
							<span className="text-tiny font-bold">NGN</span> 1000
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-1">
					<p className="text-xs text-gray-500 font-semibold">Top performing industry</p>
					<div className="h-24 w-24 rounded-full bg-[#4B3CFA] flex flex-col items-center justify-center text-white">
						<div className="text-xs font-bold">Education</div>
					</div>
				</div>
			</div>
		</div>
	);
}
