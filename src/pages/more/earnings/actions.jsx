import { useState } from "react";
import { FundWallet } from "../../../component/fund-wallet";
import { AnalyticsIcon } from "../../../assets/analytics-icon";
import { ExportIcon } from "../../../assets/export-icon";
import { PlusIcon } from "../../../assets/add-icon";

export function Actions() {
	const [openFund, setOpenFund] = useState(false);
	return (
		<>
			<div className="w-full max-w-sm mx-auto flex gap-3">
				<div className="flex flex-col justify-center items-center w-1/3">
					<div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#D4E6FF] cursor-pointer">
						<ExportIcon />
					</div>
					<span className="text-xs text-gray-400">Withdraw</span>
				</div>

				<div className="flex flex-col justify-center items-center w-1/3">
					<div
						className="h-12 w-12 rounded-full flex justify-center items-center bg-[#00A82F] cursor-pointer"
						onClick={() => setOpenFund(true)}
					>
						<PlusIcon />
					</div>
					<span className="text-xs text-gray-400">Fund Wallet</span>
				</div>

				<div className="flex flex-col justify-center items-center w-1/3">
					<div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#D4E6FF] cursor-pointer">
						<AnalyticsIcon />
					</div>
					<span className="text-xs text-gray-400">Analytics</span>
				</div>
			</div>
			{openFund && (
				<FundWallet open={openFund} handleClose={() => setOpenFund(false)} />
			)}
		</>
	);
}
