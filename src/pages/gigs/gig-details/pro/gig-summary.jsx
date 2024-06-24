import {
	formatDate,
	formatNumber,
	getDifferenceInHours,
} from "../../../../helpers/function";
import { useLocation } from "react-router-dom";

export function GigSummary() {
	const location = useLocation();
	const gigData = location?.state?.gigData;

	return (
		<div>
			{/* <div
				className="flex gap-2 items-center mb-2"
				// onClick={() => setOpen(true)}
			>
				<span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
					Entertainment
				</span>
				<span> &gt; </span>
				<span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
					Acting
				</span>
			</div> */}
			<p className="text-primary text-2xl font-bold mb-4">
				{gigData?.gig?.gigInfos[0]?.title}
			</p>
			<div className="block md:flex gap-4">
				<div className="w-full md:w-1/2">
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Experience</p>
						<div>
							<span className="text-xs w-fit border border-[#FF9533] gap-2 text-[#FF9533] p-2 flex items-center rounded-full">
								<span className="h-2 w-2 rounded-full bg-[#FF9533]" /> Required
							</span>
						</div>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Duration</p>
						<p className="text-sm font-bold">
							{getDifferenceInHours(
								gigData?.gig?.startTime,
								gigData?.gig?.endTime
							)}
							hrs
						</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Time range</p>
						<p className="text-sm font-bold">
							{gigData?.gig?.startTime} - {gigData?.gig?.endTime}
						</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Date</p>
						<p className="text-sm font-bold">
							{formatDate(gigData.gig.gigDate)}
						</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Description</p>
						<p className="text-xs">
							{gigData?.gig?.gigInfos[0]?.description || "N/A"}
						</p>
					</div>

					<hr />
					<div className="my-2 border rounded-lg p-2">
						<p className="text-xs text-gray-500 mb-2">Dress code</p>
						<p className="text-xs">
							{gigData?.gig?.gigInfos[0]?.dressCode || "N/A"}
						</p>
					</div>
					<hr />
					<div className="my-2 border rounded-lg p-2">
						<p className="text-xs text-gray-500 mb-2">
							Additional Instructions
						</p>
						<p className="text-xs">
							{gigData?.gig?.gigInfos[0]?.additionalInstruction || "N/A"}
						</p>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<div className="p-2 border rounded-lg">
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Gig Amount</div>
							<div className="text-primary font-bold">
								N{formatNumber(gigData?.gig?.budget)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div>
								<p className="text-sm text-gray-400">Est. Tip Amount</p>
								<p className="text-xs text-gray-500 italic">
									Not guaranteed, based on performance
								</p>
							</div>
							<div className="text-primary font-bold">
								N{formatNumber(gigData?.gig?.tips)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Total</div>
							<div className="text-primary font-bold">
								N{formatNumber(gigData?.gig?.totalBudget)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">JobsPro Fee</div>
							<div className="text-gray-500 text-sm font-bold">
								N{formatNumber(gigData?.gig?.jobProFee ?? 0)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Escrow Fee</div>
							<div className="text-gray-500 text-sm font-bold">
								N{formatNumber(gigData?.gig?.escrowFee ?? 0)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Estimated Total</div>
							<div className="text-primary font-bold">
								N{formatNumber(gigData?.gig?.totalBudget)}
							</div>
						</div>
					</div>
					{/* <hr /> */}
					{/* <div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Skills Needed</p>
						<div className="flex gap-2 items-center mb-4">
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Entertainment
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
