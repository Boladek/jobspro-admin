import { useState } from "react";
import { UseAdminUsersContext } from "../../context/admin-users-context";
import { generateArray } from "../../helpers/function";
import { GrowthCard } from "../../pages/admin/landing-page/growth-card";
import avatar from "../../assets/profile-avatar.png";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { ProgressBar } from "./progress-bar";
import { IncreaseIcon } from "../../assets/admin/increase-icon";

const topTabs = ["top user", "top earner"];

export function UserSideBar() {
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState(topTabs[0]);
	const { handleTab, activeTab, tabs } = UseAdminUsersContext();
	return (
		<>
			<div className="grid grid-cols-1 gap-2 mb-4">
				{tabs?.map((tab) => (
					<div
						key={tab}
						className={`${
							activeTab === tab
								? "text-adminPrimary font-semibold border-l-yellow-300"
								: "border-l-transparent"
						} text-sm capitalize cursor-pointer py-1 px-2 border-l-4`}
						onClick={() => {
							handleTab(tab);
							navigate("/admin/users");
						}}
					>
						{tab}
					</div>
				))}
			</div>
			<div className="mb-4">
				<select className="rounded-lg bg-gray-50 text-xs w-full p-3 border-gray-100">
					<option>Select Country</option>
				</select>
			</div>
			<div className="mb-4">
				<p className="text-xs">Pro Users :</p>
				<div className="flex items-center gap-2 mb-2">
					<div className="flex">
						{generateArray(3).map((_, index) => (
							<div
								key={Math.random()}
								style={{
									zIndex: 1 - index,
									marginLeft: index > 0 ? "-1rem" : "",
								}}
								className="shadow-sm rounded-full"
							>
								<img src={avatar} className="h-12 w-12 rounded-full" />
							</div>
						))}
					</div>
					<div className="text-xs">
						in <span className="text-2xl">12</span> countries
					</div>
				</div>
			</div>
			<div className="mb-4">
				<GrowthCard />
			</div>
			<div>
				<div className="flex mb-4">
					{topTabs.map((tab) => (
						<div
							key={tab}
							className={`${
								isActive === tab
									? "text-[#025949] bg-[#DEFF16]"
									: "text-gray-400 hover:text-[#025949]"
							} capitalize text-xs flex-1 text-center p-2 rounded-md cursor-pointer`}
							onClick={() => setIsActive(tab)}
						>
							{tab}
						</div>
					))}
				</div>
				<div className="bg-[#3514FF] p-8 rounded-xl text-white mb-4">
					<div className="flex items-center gap-2 mb-4">
						<img src={avatar} className="h-10" />
						<div className="text-xs">
							<p className="font-bold">
								<span className="text-[#FFD700]">Ibrahim</span>Daudu
							</p>
							<div className="flex gap-1 items-center">
								4.1
								<FaStar color="#FFD700" />
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<div>
							<p className="text-xs font-bold mb-1">56 Jobs completed</p>
							<div className="w-14">
								<ProgressBar color="#00E585" />
							</div>
						</div>
						<div className="cursor-pointer h-7 w-7 bg-[#664DFF] rounded-full flex items-center justify-center transform -rotate-45 text-yellow-200">
							&rarr;
						</div>
					</div>
				</div>
				<div className="p-4 rounded-xl border bg-gray-50">
					<div className="flex justify-between text-xs mb-4">
						<p>Efficiency</p>
						<div className="flex flex-col justify-center items-center gap-1">
							<IncreaseIcon fill="#0FFF9A" />
							<p className="font-bold text-[#0FFF9A]">1.8%</p>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex-1">
							<div className="text-tiny">Jobs Completed</div>
							<div className="text-lg font-bold text-[#1C4486]">20,000</div>
						</div>
						<div>
							<div className="w-4 rotate-90">
								<ProgressBar thickness={0.5} color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-right">
							<div className="text-tiny">Users</div>
							<div className="text-lg font-bold text-[#1C4486]">1,000</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</>
	);
}
