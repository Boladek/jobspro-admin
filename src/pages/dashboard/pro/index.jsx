// import { WalletIcon } from "../../../assets/admin/wallet-icon";
// import { StarIcon } from "../../../assets/admin/star-icon";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { BestMatches } from "./best-matches";
import { UseAuth } from "../../../context/auth-context";
import disco from "../../../assets/disco-ball.png";
// import { PieChart } from "../../../component/pie-chart";
import { formatNumber } from "../../../helpers/function";
import { UseKyc } from "../../../context/kyc-context";

export function ProDashBoard() {
	const { user, gigStats } = UseAuth();
	const { tier } = UseKyc();

	return (
		<div className="h-full flex gap-2 bg-white">
			<div
				className="w-1/4 p-4 h-full overflow-auto"
				style={{ maxHeight: "90vh" }}
			>
				{/* <div className="mb-4">
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
				</div> */}
				<div className="mb-4">
					<p className="text-sm mb-2 font-bold">Gigs Stat</p>
					<div className="grid grid-cols-2 gap-4">
						<div
							className={`bg-adminPrimary px-4 py-8 border rounded-xl text-center border-[#025949] cursor-pointer hover:shadow-lg transition-all ease-linear 300s`}
						>
							<p className="mb-2">{formatNumber(gigStats?.completedGigs)}</p>
							<div className="mb-2 w-1/2 mx-auto">
								<ProgressBar percent={100} color="#14FF9C" thickness={2} />
							</div>
							<p className="text-xs font-semibold mb-2">Gigs Completed</p>
							<div>
								<span className="cursor-pointer h-8 w-8 bg-[#FEDF00] rounded-full flex items-center justify-center mx-auto transform -rotate-45">
									&rarr;
								</span>
							</div>
						</div>
						<div
							className={`bg-black text-white px-4 py-8 border rounded-xl text-center border-[#025949] cursor-pointer hover:shadow-lg transition-all ease-linear 300s`}
						>
							<p className="mb-2">{formatNumber(gigStats?.cancelledGigs)}</p>
							<div className="mb-2 w-1/2 mx-auto">
								<ProgressBar percent={100} color="#14FF9C" thickness={2} />
							</div>
							<p className="text-xs font-semibold mb-2">Gigs Cancelled</p>
							<div>
								<span className="cursor-pointer h-8 w-8 bg-[#FEDF00] rounded-full flex items-center justify-center mx-auto transform -rotate-45">
									&rarr;
								</span>
							</div>
						</div>
						<div
							className={`bg-white px-4 py-8 border rounded-xl text-center border-[#025949] cursor-pointer hover:shadow-lg transition-all ease-linear 300s`}
						>
							<p className="mb-2">{formatNumber(gigStats?.ongoingGigs)}</p>
							<div className="mb-2 w-1/2 mx-auto">
								<ProgressBar percent={100} color="#14FF9C" thickness={2} />
							</div>
							<p className="text-xs font-semibold mb-2">Ongoing Gigs</p>
							<div>
								<span className="cursor-pointer h-8 w-8 bg-[#FEDF00] rounded-full flex items-center justify-center mx-auto transform -rotate-45">
									&rarr;
								</span>
							</div>
						</div>
						<div
							className={`bg-[#E2FFE2] px-4 py-8 border rounded-xl text-center border-[#025949] cursor-pointer hover:shadow-lg transition-all ease-linear 300s`}
						>
							<p className="mb-2">{formatNumber(gigStats?.approvedGigs)}</p>
							<div className="mb-2 w-1/2 mx-auto">
								<ProgressBar percent={100} color="#14FF9C" thickness={2} />
							</div>
							<p className="text-xs font-semibold mb-2">Approved Gigs</p>
							<div>
								<span className="cursor-pointer h-8 w-8 bg-[#FEDF00] rounded-full flex items-center justify-center mx-auto transform -rotate-45">
									&rarr;
								</span>
							</div>
						</div>
					</div>
				</div>
				{/* <div>
					<div className="mb-4">
						<p className="text-sm mb-2 font-bold">Task done by region</p>
						<div className="flex gap-2 items-center mb-2">
							<div className="bg-[#CFFFCE] p-4 rounded-full">
								<WalletIcon fill="#00DE74" />
							</div>
							<div className="flex-1">
								<div className="flex justify-between text-xs mb-1 items-center">
									<span className="bg-light px-2 py-1 rounded-full">West</span>
									<span className="font-bold">2k</span>
								</div>
								<ProgressBar percent={100} color="#14FF9C" thickness={3.5} />
							</div>
						</div>
						<div className="flex gap-2 items-center mb-2">
							<div className="bg-[#ECFFD4] p-4 rounded-full">
								<WalletIcon fill="#ABFF40" />
							</div>
							<div className="flex-1">
								<div className="flex justify-between text-xs mb-1 items-center">
									<span className="bg-light px-2 py-1 rounded-full">South</span>
									<span className="font-bold">500</span>
								</div>
								<ProgressBar percent={50} color="#14FF9C" thickness={3.5} />
							</div>
						</div>
						<div className="flex gap-2 items-center mb-2">
							<div className="bg-[#E6E2FF] p-4 rounded-full">
								<WalletIcon fill="#3514FF" />
							</div>
							<div className="flex-1">
								<div className="flex justify-between text-xs mb-1 items-center">
									<span className="bg-light px-2 py-1 rounded-full">East</span>
									<span className="font-bold">20</span>
								</div>
								<ProgressBar percent={20} color="#14FF9C" thickness={3.5} />
							</div>
						</div>
					</div>
					<div className="flex justify-center">
						<PieChart
							width="220px"
							height="220px"
							numberStyle={{ fontWeight: 500, fontSize: 48 }}
							// numberCenter={`${numberValue}`}
							textStyle={{ fontWeight: "", fontSize: "1rem" }}
							textCenter="Status"
							colors={["#0FFF9A", "#ABFF40", "#3514FF"]}
							innerRadius={0.5}
						/>
					</div>
				</div> */}
			</div>
			<div className="flex-1 flex">
				<div className="w-2/3">
					<BestMatches />
				</div>
				<div className="p-4">
					<p className="text-sm mb-2 font-bold">Profile Badge</p>
					<div className="p-8 rounded-lg bg-black w-48 text-white text-center">
						<p className="capitalize mb-1 text-sm">Tier {tier}</p>
						<ProgressBar
							percent={user?.profileCompletion}
							color="#14FF9C"
							thickness={1}
						/>
						<p className="mt-2 text-4xl">{user?.profileCompletion}%</p>
						<p className="text-xs">completed</p>
						<div className="flex justify-center p-2">
							<img src={disco} alt="Disco Ball" className="h-8" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
