import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
// import avatar from "../../../assets/profile-avatar.png";
import { useNavigate } from "react-router-dom";
// import { KycTag } from "../../../component/kyc-tag";
import { GigSummary } from "./pro/gig-summary";
import { ProGigTimeLine } from "./pro/gig-timeline";
import { useSelector } from "react-redux";
import { BusinessGigTimeLine } from "./business/gig-timeline";
import { GigSummaryBusiness } from "./business/gig-summary";
// import { UseAuth } from "../../../context/auth-context";

const tabs = ["Details", "Timeline", "Chat"];

function GigDetailsSummary() {
	const navigate = useNavigate();
	// const { user: details } = UseAuth();
	const { user } = useSelector((state) => state.auth);
	const [activeTab, setActiveTab] = useState(tabs[0]);

	// console.log({ details });

	return (
		<div className="max-w-screen-xl mx-auto m-2 bg-white rounded-md h-full">
			<div className="block p-4 md:flex justify-between items-center">
				<div className="flex gap-2 items-center md:mb-0 mb-2">
					<div
						className="p-3 rounded-full border flex justify-center items-center hover:text-primary cursor-pointer"
						onClick={() => navigate(-1)}
					>
						<MdArrowBackIos />
					</div>
					{/* <div className="flex gap-2 items-center">
						<img src={avatar} className="h-12" />
						<div>
							<p className="text-sm font-bold">Adeola Alero</p>
							<KycTag text="Tier 1" />
						</div>
					</div> */}
					<div className="block md:hidden ml-auto">
						{/* <span className="p-3 rounded-full bg-primary text-white text-xs">
							IN PROGRESS
						</span> */}
					</div>
				</div>
				<div className="flex bg-[#F3F8FF] rounded-full p-1 mb-4 border gap-1 justify-center">
					{tabs.map((item) => (
						<div
							key={item}
							onClick={() => setActiveTab(item)}
							className={`py-2 px-6 text-xs md:text-sm cursor-pointer flex justify-center items-center text-center rounded-full ${
								item === activeTab
									? "bg-primary text-white "
									: "bg-gray-200 text-dark"
							}`}
						>
							{item}
						</div>
					))}
				</div>
				<div className="hidden md:block">
					<span className="p-3 rounded-full bg-primary text-white text-xs">
						IN PROGRESS
					</span>
				</div>
			</div>
			<hr />
			<div className="p-4">
				{activeTab === tabs[0] && (
					<>
						{user.userType === "pro" ? <GigSummary /> : <GigSummaryBusiness />}
					</>
				)}
			</div>
			<div className="p-4">
				{activeTab === tabs[1] && (
					<>
						{user.userType === "pro" ? (
							<ProGigTimeLine />
						) : (
							<BusinessGigTimeLine />
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default GigDetailsSummary;
