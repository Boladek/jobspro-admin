import { useState } from "react";
import { ProHeadSection } from "./pro-head-section";
import { IndividualHeadSection } from "./individual-head-section";
import { BusinessHeadSection } from "./business-head-section";
import { useSelector } from "react-redux";
import { ProOverview } from "./pro-overview";
import { UseAuth } from "../../../context/auth-context";

const tabs = ["Overview", "Work History"];

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const { user } = useSelector((state) => state.auth);
	const { user: details } = UseAuth();

	return (
		<div className="">
			<div className="p-4 bg-primary text-white flex justify-end">
				<div>
					<p className="text-xs font-extralight text-right">Finclusion ID</p>
					<div className="text-xs flex gap-4 items-center">
						<span className="py-1 px-2 border border-white rounded-full capitalize">
							{details?.completedTier}
						</span>
						<span className="font-bold">{user?.finclusionId}</span>
					</div>
				</div>
			</div>
			<div>
				{user?.userType === "pro" && <ProHeadSection />}
				{user?.userType === "individual" && <IndividualHeadSection />}
				{user?.userType === "business" && <BusinessHeadSection />}
				<hr />
				<div className="px-4 py-2">
					<div className="flex gap-2">
						{tabs.map((item) => (
							<div
								key={item}
								className={`${
									item === activeTab
										? "border-b-4 border-b-primary text-primary"
										: "text-gray-400"
								} text-sm p-1 cursor-pointer`}
								onClick={() => setActiveTab(item)}
							>
								{item}
							</div>
						))}
					</div>
					<div>
						{activeTab === tabs[0] && (
							<>{user.userType === "pro" && <ProOverview />}</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
