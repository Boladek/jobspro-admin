import React from "react";
import { WalletIcon } from "../../../assets/admin/wallet-icon";
import { StarIcon } from "../../../assets/admin/star-icon";
import { ProgressBar } from "../../../component/admin/progress-bar";

const stats = [
	{
		title: "Gigs Completed",
		value: 12,
	},
	{
		title: "Gigs Cancelled",
		value: 12,
	},
	{
		title: "Ongoing Gigs",
		value: 12,
	},
	{
		title: "Upcoming Gigs",
		value: 12,
	},
];

export function ProDashBoard() {
	return (
		<div className="h-full flex gap-2 bg-white">
			<div className="w-1/4 p-4">
				<div className="mb-4">
					<p className="text-sm mb-2 font-bold">Pro Rating</p>
					<div className="px-4 py-8 bg-[#F6FFF4] rounded-xl flex gap-2 items-center border border-[#025949]">
						<div>
							<div className="bg-[#CFFFCE] p-2 rounded-full">
								<WalletIcon fill="#00DE74" />
							</div>
						</div>
						<div className="flex gap-2">
							<div>
								<p className="text-xs">Profile rank</p>
								<p className="text-xs text-[#025949] font-bold">723 / 1000</p>
							</div>
							<div className="border-l-2 border-l-[#025949] pl-2">
								<p className="text-xs">Avg Ratings</p>
								<p className="text-xs text-[#025949] font-bold flex items-center gap-1">
									4.5 <StarIcon filled size={0.75} />
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-sm mb-2 font-bold">Gigs Stat</p>
					<div className="grid grid-cols-2 gap-4">
						{stats.map((stat) => (
							<div
								key={stat.title}
								className="px-4 py-8 border rounded-xl text-center border-[#025949] cursor-pointer hover:shadow-lg transition-all ease-linear 300s"
							>
								<p className="mb-2">{stat.value}</p>
								<div className="mb-2 w-1/2 mx-auto">
									<ProgressBar percent={100} color="#14FF9C" thickness={2} />
								</div>
								<p className="text-xs font-semibold mb-2">{stat.title}</p>
								<div>
									<span className="cursor-pointer h-8 w-8 bg-[#FEDF00] rounded-full flex items-center justify-center mx-auto transform -rotate-45">
										&rarr;
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="flex-1">Gigs</div>
		</div>
	);
}
