import { useNavigate } from "react-router-dom";
import { Actions } from "./actions";
import { WalletCard } from "./wallet-card";
import { WalletHistory } from "./wallet-history";

function EarningsPage() {
	const navigate = useNavigate();
	return (
		<div className="p-4 flex w-full h-full flex-col">
			<div className="flex gap-4 justify-center overflow-x-auto mb-4">
				<WalletCard value={100000} title="Available for Withdrawal" />
				<WalletCard
					value={150000}
					title="Amount in Escrow"
					button={
						<span
							className="text-xs py-1 px-2 rounded-full bg-dark/20 text-gray-200 hover:text-white font-light cursor-pointer"
							style={{ fontSize: ".6rem" }}
							onClick={() => navigate("escrow")}
						>
							Escrow &rarr;
						</span>
					}
				/>
			</div>
			<div className="p-2 mb-4">
				<Actions />
			</div>
			<div className="flex-1 w-full">
				<WalletHistory />
			</div>
		</div>
	);
}

export default EarningsPage;
