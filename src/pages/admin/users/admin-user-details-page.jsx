import { useState } from "react";
import { UserDetailsSection } from "./user-details-section";
import { UserActions } from "./actions";
import { JobsSection } from "./jobs";
import { Transactions } from "./transactions";

const tabs = ["Jobs", "Transactions", "Actions"];

function AdminUserDetailsPage() {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	return (
		<div className="flex w-full gap-2 h-full">
			<div className="w-2/5 h-full overflow-auto">
				<UserDetailsSection />
			</div>
			<div className="w-3/5 p-4 h-full flex flex-col">
				<div className="flex justify-between items-center">
					<div className="flex gap-4">
						{tabs.map((tab) => (
							<div
								className={`${
									activeTab === tab
										? "text-[#3514FF] border-b-2 border-b-[#3514FF]"
										: ""
								} text-xs font-bold cursor-pointer px-2 py-1`}
								key={tab}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</div>
						))}
					</div>
					{activeTab === tabs[0] && (
						<div className="flex gap-4 items-center pr-4">
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Jobs Done
								<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#0FFF9A] font-bold z-10">
									2
								</span>
							</div>
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Jobs Ongoing
								<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#FFDE16] font-bold z-10">
									2
								</span>
							</div>
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Dispute
								<span className="absolute -top-3 -right-1 p-1 px-2 text-white rounded-sm text-tiny bg-[#FF5C00] font-bold z-10">
									2
								</span>
							</div>
						</div>
					)}
					{activeTab === tabs[1] && (
						<div className="flex gap-4 items-center pr-4">
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Inflow
								<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#0FFF9A] font-bold z-10">
									2
								</span>
							</div>
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Outflow
								<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#FFDE16] font-bold z-10">
									2
								</span>
							</div>
							<div className="border p-1.5 px-3 rounded-md text-xs relative font-bold">
								Dispute
								<span className="absolute -top-3 -right-1 p-1 px-2 text-white rounded-sm text-tiny bg-[#FF5C00] font-bold z-10">
									2
								</span>
							</div>
						</div>
					)}
				</div>
				<div className="flex-1 overflow-auto">
					{activeTab === tabs[1] && <Transactions />}
					{activeTab === tabs[2] && <UserActions />}
					{activeTab === tabs[0] && <JobsSection />}
				</div>
			</div>
		</div>
	);
}

export default AdminUserDetailsPage;
