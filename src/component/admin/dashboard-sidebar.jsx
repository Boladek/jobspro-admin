import { WalletCard } from "./wallet-card";

export function DashboardSideBar() {
	return (
		<div>
			<div className="mb-8">Widgets Section</div>
			<div className="flex flex-col gap-4">
				<WalletCard
					title="Active Wallet"
					value={1020}
					bg="#E4F7FF"
					fill="#15A3CF"
					cardBg="#CDF0FF"
				/>
				<WalletCard
					title="Wallet Balance"
					value={16020}
					bg="#E5FFE4"
					fill="#00DE74"
					cardBg="#CFFFCE"
				/>
				<WalletCard
					title="Deactivated Wallet"
					value={15000}
					bg="#FFEDE7"
					fill="#FF424D"
					cardBg="#FFD6D8"
				/>
			</div>
		</div>
	);
}
