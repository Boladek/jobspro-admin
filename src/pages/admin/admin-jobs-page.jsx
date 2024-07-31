import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { WalletCard } from "../../component/admin/wallet-card";
import { IoSettingsSharp } from "react-icons/io5";
import { JobsPage } from "./jobs";
import { JobsSettings } from "./jobs/settings";
import { CommissionProvider } from "../../context/commission-context";

function AdminJobsPage() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex gap-4 h-full">
			<div className="w-64 flex flex-col h-full overflow-auto p-4 pr-4">
				<div className="mb-4">
					<div
						className="p-3 bg-[#E9EFF2] rounded-md flex gap-4 items-center mb-8 w-fit text-sm pr-8"
						onClick={() => setOpen(true)}
					>
						<IoSettingsSharp className="text-xl" /> Settings
					</div>
					<WalletCard
						title="Job Applications"
						value={15000}
						bg="#E4F7FF"
						fill="#15A3CF"
						cardBg="#CDF0FF"
					/>
				</div>
				<div>
					<WalletCard
						title="Job Applications"
						value={15000}
						bg="#E5FFE4"
						fill="#00DE74"
						cardBg="#CFFFCE"
					/>
				</div>
			</div>
			<div className="flex-1 overflow-auto">
				{/* <Outlet /> */}
				<JobsPage />
			</div>

			{open && (
				<CommissionProvider>
					<JobsSettings handleClose={() => setOpen(false)} />
				</CommissionProvider>
			)}
		</div>
	);
}

export default AdminJobsPage;
