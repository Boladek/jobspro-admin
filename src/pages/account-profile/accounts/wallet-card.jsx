import safe from "../../../assets/safe-image.svg";
import { UseAuth } from "../../../context/auth-context";
import { UseModal } from "../../../context/wallet-context";
import { formatNumber } from "../../../helpers/function";

export function WalletCard() {
	const { user } = UseAuth();

	const { handleOpenWallet } = UseModal();
	return (
		<div className="p-4 rounded-lg w-full bg-[#4440FF]">
			<div className="flex items-center justify-between w-full mb-4">
				<span className="font-semibold text-white text-xs">Wallet</span>
				<div
					className="cursor-pointer h-7 w-7 bg-[#664DFF] rounded-full flex items-center justify-center transform -rotate-45 text-yellow-200"
					onClick={handleOpenWallet}
				>
					&rarr;
				</div>
			</div>
			<div className="flex items-center justify-between w-full">
				<img src={safe} alt="Safe Image" className="h-16" />
				<div>
					<p className="text-xs text-gray-400">Current Balance</p>
					<div className="text-white font-extralight">
						NGN{" "}
						<span className="font-semibold">
							{formatNumber(user.walletAmount, 2)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
