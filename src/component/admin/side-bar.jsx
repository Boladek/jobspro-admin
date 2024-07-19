import { Switch } from "../switch";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { DashboardSideBar } from "./dashboard-sidebar";

export function SideBar() {
	const [disableWallets, setDisableWallets] = useState(false);
	const [muteNotifications, setMuteNotifications] = useState(false);

	return (
		<div className="flex flex-col h-svh">
			<div className="py-2 px-4">
				<img src={logo} alt="Jobs Pro Logo" className="h-7" />
			</div>

			<>
				<div className="p-4 flex-1">
					<DashboardSideBar />
				</div>
				<div className="px-4 py-4">
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
			</>
		</div>
	);
}
