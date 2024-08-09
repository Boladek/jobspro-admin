import { useEffect, useState } from "react";
import { Switch } from "../../component/switch";
import { WalletCard } from "../../component/admin/wallet-card";
import { Outlet, useNavigate } from "react-router-dom";
import { ProgressBar } from "../../component/admin/progress-bar";
import { UseAdminDashboardContext } from "../../context/admin-dashboard-context";

function AdminLandingPage() {
	const { walletStats } = UseAdminDashboardContext();
	const navigate = useNavigate();
	const [disableWallets, setDisableWallets] = useState(false);
	const [muteNotifications, setMuteNotifications] = useState(false);

	useEffect(() => {
		document.title = "Jobs Pro | Admin Dashboard";
	}, []);

	return (
		<div className="h-full flex">
			<div className="w-64 flex flex-col h-full">
				<div className="pr-4 flex-1">
					<div className="flex flex-col gap-4">
						<WalletCard
							title="Active Wallets"
							value={walletStats?.activeWallets}
							bg="#E4F7FF"
							fill="#15A3CF"
							cardBg="#CDF0FF"
						/>
						<WalletCard
							title="Total Wallet Balance"
							value={walletStats?.totalWalletBalance}
							bg="#E5FFE4"
							fill="#00DE74"
							cardBg="#CFFFCE"
						/>
						<WalletCard
							title="Deactivated Wallets"
							value={walletStats?.deactivatedWallets}
							bg="#FFEDE7"
							fill="#FF424D"
							cardBg="#FFD6D8"
						/>
					</div>
				</div>
				<div className="px-4 py-4 flex flex-col justify-end">
					<div
						className="mb-4 p-4 rounded-md bg-[#1C4486] flex justify-between items-center"
						onClick={() => navigate("logs")}
					>
						<div className="w-20">
							<ProgressBar color="#0FFF9A" />
						</div>{" "}
						<div className="text-white text-xs">View Logs</div>
					</div>
					<div className="flex items-center justify-between my-4">
						<span className="text-sm text-gray-400 w-4/6">
							Disable all wallets
						</span>
						<span className="w-1/6">
							<Switch
								checked={disableWallets}
								handleChecked={() => setDisableWallets((prev) => !prev)}
							/>
						</span>
						<span className="text-sm font-bold w-1/6">
							{disableWallets ? "ON" : "OFF"}
						</span>
					</div>
					<div className="flex items-center justify-between my-4">
						<span className="text-sm text-gray-400 w-4/6">
							Mute Notifications
						</span>
						<span className="w-1/6">
							<Switch
								checked={muteNotifications}
								handleChecked={() => setMuteNotifications((prev) => !prev)}
							/>
						</span>
						<span className="text-sm font-bold w-1/6">
							{muteNotifications ? "ON" : "OFF"}
						</span>
					</div>
				</div>
			</div>
			<div className="flex-1">
				<Outlet />
			</div>
		</div>
	);
}

export default AdminLandingPage;
