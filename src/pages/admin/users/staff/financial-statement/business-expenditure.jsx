import { formatNumber, formatDate } from "../../../../../helpers/function";
import chart from "../../../../../assets/admin/chart.png";
import { IncreaseIcon } from "../../../../../assets/admin/increase-icon";

export function BusinessExpenditure() {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="py-2 px-4 rounded-md border border-[#025949] text-[#025949] text-xs font-bold w-fit">
				Revenue Expenditure
			</div>
			<div className="flex gap-4 flex-wrap">
				<div
					className="bg-cover bg-center h-[120px] rounded-xl flex flex-col w-[270px] max-w-[300px]"
					style={{
						border: "0.5px solid #1C4486",
					}}
				>
					<div className="p-2 flex justify-between items-center text-tiny gap-4">
						<div>
							<div className="text-adminPrimary text-xs">Total expenditure</div>
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
				<div className="grid col-span-1 gap-2 w-full max-w-[300px]">
					<p className="text-xs text-[#1C4486]">
						Expenditure based on transaction charges
					</p>
					<div className="p-2 px-4 bg-[#8851FF] text-white flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">70%</div>
						<div className="text-sm">VFD</div>
					</div>
					<div className="p-2 px-4 bg-[#4B3CFA] text-white flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">30%</div>
						<div className="text-sm">Others</div>
					</div>
				</div>
				<div className="grid col-span-1 gap-2 w-full max-w-[300px]">
					<p className="text-xs text-[#1C4486]">
						Expenditure based on virtual accounts opened
					</p>
					<div className="p-2 px-4 bg-[#FF7A00] text-white flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">70%</div>
						<div className="text-sm">VFD</div>
					</div>
					<div className="p-2 px-4 bg-[#4B3CFA] text-white flex gap-2 items-center rounded-sm">
						<div className="text-lg font-bold">30%</div>
						<div className="text-sm">Others</div>
					</div>
				</div>
			</div>
		</div>
	);
}
