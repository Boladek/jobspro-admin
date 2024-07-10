import safe from "../../../assets/safe-image.svg";
import { UseAuth } from "../../../context/auth-context";
import { UseDashboard } from "../../../context/dashboard-context";
import { UseModal } from "../../../context/modal-context";
import { formatNumber } from "../../../helpers/function";

export function WalletCard() {
	const { dashboardStats } = UseDashboard();
	const { handleOpenWallet } = UseModal();
	const { user } = UseAuth();

	return (
		<div
			className="p-4 rounded-lg w-full bg-[#4440FF] min-w-80"
			onClick={handleOpenWallet}
		>
			<div className="flex items-center justify-between w-full mb-4">
				<span className="font-semibold text-white text-xs">Wallet</span>
				<div className="cursor-pointer h-7 w-7 bg-[#664DFF] rounded-full flex items-center justify-center transform -rotate-45 text-yellow-200">
					&rarr;
				</div>
			</div>
			<div className="flex items-center justify-between w-full">
				<img src={safe} alt="Safe Image" className="h-16" />
				<div>
					<p className="text-xs text-gray-400">Current Balance</p>
					<div className="text-white font-extralight">
						{dashboardStats.walletBalanceCurrency}{" "}
						<span className="font-semibold">
							{formatNumber(user.walletAmount)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
