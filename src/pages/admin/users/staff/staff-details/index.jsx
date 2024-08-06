import PropTypes from "prop-types";
import { SideWrapper } from "../../../../../component/side-wrapper";
import avatar from "../../../../../assets/profile-avatar.png";
import { useState } from "react";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { TiDelete } from "react-icons/ti";
import { UserSummary } from "./user-summary";
import { Department } from "./department";
import { Salary } from "./salary";

const tabs = ["Bio", "Department", "Salary"];

export function StaffDetails({ handleClose }) {
	const [step, setStep] = useState(1);
	const [activeTab, setActiveTab] = useState(tabs[0]);
	return (
		<SideWrapper title="Staff Details" handleClose={handleClose}>
			<div className="h-full flex flex-col w-[400px]">
				<div className="flex items-center justify-between">
					<div className="flex gap-2 items-center">
						<img src={avatar} className="h-10 w-10" />
						<div className="text-xs">
							<p className="text-[#3514FF] font-bold">Uzomaka Omotola</p>
							<p className="text-gray-600">Finance Director</p>
						</div>
					</div>
					<div className="bg-[#00E585] text-white text-xs uppercase p-2 rounded-full">
						Admin
					</div>
				</div>
				<div className="flex-1 flex flex-col pt-4">
					{step === 1 && (
						<div className="grid grid-cols-1 gap-4">
							<div className="flex justify-between mb-4">
								<div className="flex-1">
									<p className="text-tiny text-gray-400">Finclusion ID</p>
									<p className="text-xs font-bold">NG21-08912456789</p>
								</div>
								<div className="flex-1">
									<p className="text-tiny text-gray-400">Email</p>
									<p className="text-xs font-bold">NG21-08912456789</p>
								</div>
								<div className="flex-1">
									<p className="text-tiny text-gray-400">Phone</p>
									<p className="text-xs font-bold">NG21-08912456789</p>
								</div>
							</div>

							<div className="flex items-end w-full gap-4">
								<div className="border p-3 px-4 rounded-md border-[#3514FF]">
									<p className="text-xs text-[#3514FF]">Salary</p>
									<div className="w-6">
										<ProgressBar color="#0FFF9A" />
									</div>
									<div>
										<span className="text-xs">NGN</span>{" "}
										<span className="text-lg text-[#3514FF] font-bold">
											400,000
										</span>
									</div>
								</div>
								<div
									className="p-3 px-6 rounded-md text-xs text-[#3514FF] bg-[#F0F5FF] font-bold cursor-pointer hover:opacity-80"
									onClick={() => setStep(2)}
								>
									Edit User
								</div>
								<div className="p-3 px-6 rounded-md text-xs text-[#3514FF] bg-[#E9E5FF] font-bold cursor-pointer hover:opacity-80">
									Message
								</div>
							</div>

							<div className="py-4 border-t grid grid-cols-1 gap-4 text-xs">
								<div className="flex gap-2 items-center font-bold text-gray-500">
									Department{" "}
									<span className="px-4 py-1 rounded-md bg-[#E5EEFF] text-[#0030DC] font-normal">
										Finance
									</span>
								</div>
								<div>
									<p className="font-bold text-gray-500 mb-1">Privileges</p>
									<div className="p-4 rounded-lg bg-[#F3F0FF] border border-[#8851FF] text-[#3F0799] flex gap-4 flex-wrap">
										<div className="flex gap-0.5 items-center border rounded-full p-2 border-[#3F0799] w-fit text-xs font-semibold">
											Financial All Access
											<TiDelete className="text-gray-400 text-xl" />
										</div>
										<div className="flex gap-0.5 items-center border rounded-full p-2 border-[#3F0799] w-fit text-xs font-semibold">
											Safe Guarder
											<TiDelete className="text-gray-400 text-xl" />
										</div>
									</div>
								</div>
								<div>
									<p className="font-bold text-gray-500 mb-1">Actions</p>
									<div className="flex gap-2 items-center">
										<div className="text-[#FF424D] p-2 px-4 rounded-md bg-[#FFEEE5] font-bold cursor-pointer">
											Suspend User
										</div>
										<div className="p-2 px-4 rounded-md bg-gray-200 font-bold cursor-pointer">
											Deactivate User
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{step === 2 && (
						<div>
							<div className="flex justify-between py-2 items-center">
								{tabs.map((tab) => (
									<div
										key={tab}
										className={`${
											tab === activeTab
												? "text-[#0030DC] bg-[#E5EEFF] font-bold"
												: ""
										} cursor-pointer text-xs rounded-full px-6 py-2`}
										onClick={() => setActiveTab(tab)}
									>
										{tab}
									</div>
								))}
							</div>
							<div>
								{activeTab === tabs[0] && (
									<UserSummary goBack={() => setStep(1)} />
								)}
								{activeTab === tabs[1] && (
									<Department goBack={() => setStep(1)} />
								)}
								{activeTab === tabs[2] && <Salary goBack={() => setStep(1)} />}
							</div>
						</div>
					)}
				</div>
			</div>
		</SideWrapper>
	);
}

StaffDetails.propTypes = {
	handleClose: PropTypes.func,
};
