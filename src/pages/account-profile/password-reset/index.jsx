import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import padlock from "../../../assets/padlock.svg";
import { useState } from "react";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { PasswordReset } from "./password-reset";

const tabs = ["password", "pin"];

export function PasswordResetSection() {
	const { openPassword, handleClosePassword } = UseModal();
	const [activeTab, setActiveTab] = useState(tabs[0]);
	return (
		<SideWrapper
			open={openPassword}
			handleClose={handleClosePassword}
			title="Security Settings"
		>
			<div className="flex items-center gap-4 mb-4">
				<img src={padlock} className="h-20" />
				<div>
					<div className="bg-[#FEDF00] p-1 px-5 rounded-full font-semibold text-sm text-gray-700 w-fit mb-2">
						Password
					</div>
					<p className="text-xs text-gray-500">
						You can update your password easily
					</p>
				</div>
			</div>
			<div className="bg-[#4440FF] p-4 flex justify-evenly rounded-lg text-white">
				{tabs.map((tab) => (
					<div
						key={Math.random()}
						className={`${
							activeTab === tab ? "font-bold" : "text-gray-300"
						} text-sm capitalize flex-1 cursor-pointer`}
						onClick={() => setActiveTab(tab)}
					>
						<p>{tab}</p>
						{activeTab === tab && (
							<div className="w-6">
								<ProgressBar color="#FEDF00" />
							</div>
						)}
					</div>
				))}
			</div>
			{activeTab === tabs[0] && <PasswordReset />}
		</SideWrapper>
	);
}
