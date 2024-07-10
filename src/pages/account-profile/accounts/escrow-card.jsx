import { CopyIcon } from "../../../assets/copy-icon";
import pattern from "../../../assets/escrow-pattern.png";
import { UseAuth } from "../../../context/auth-context";
import { UseDashboard } from "../../../context/dashboard-context";
import { UseModal } from "../../../context/modal-context";
import { formatNumber } from "../../../helpers/function";

export function EscrowCard() {
	const { handleOpenEscrow } = UseModal();
	const { dashboardStats } = UseDashboard();
	const { user } = UseAuth();

	return (
		<div
			className="p-4 rounded-lg w-full bg-[#7107f6] relative text-white min-w-80"
			onClick={handleOpenEscrow}
		>
			<img src={pattern} className="absolute top-0 left-0 h-full" />
			<div className="flex mb-4 justify-between">
				<div>
					<p className="text-xs">Jobs</p>
					<div className="p-2 py-1 rounded-md border border-white bg-[#4440FF] font-semibold text-sm opacity-100 z-30">
						{dashboardStats?.numberOfGigsCompleted}
					</div>
				</div>
				<div>
					<CopyIcon />
				</div>
			</div>
			<div className="flex justify-between items-center py-1">
				<span className="text-xs font-extralight">powered by</span>
				<div className="px-2 py-1 border border-white rounded-full text-xs">
					Sure Escrow
				</div>
				<div>
					<p className="text-xs text-gray-400">Escrow Balance</p>
					<div className="text-white font-extralight">
						{dashboardStats.balanceEscrowCurrency}{" "}
						<span className="font-semibold">
							{formatNumber(user?.escrowBalance)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
