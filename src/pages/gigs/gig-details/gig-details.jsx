import PropTypes from "prop-types";
import { ExperienceIcon } from "../../../assets/experience-icon";
import {
	formatDate,
	formatNumber,
	getDifferenceInHours,
	getAmPm,
} from "../../../helpers/function";
import { useLocation, useParams } from "react-router-dom";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { FundWalletIcon } from "../../../assets/fund-wallet-icon";
import { LocationIcon } from "../../../assets/admin/location-icon";
import { DateIcon } from "../../../assets/date-icon";
import { PaperPenIcon } from "../../../assets/paper-pen-icon";
import { WalletIcon } from "../../../assets/wallet-icon";
import { TimeIcon } from "../../../assets/time-icon";

export function GigDetails({ gig }) {
	const location = useLocation();
	const { id } = useParams();
	const gigData = location?.state?.gigData;

	return (
		<div>
			<div className="flex gap-4 flex-wrap justify-between items-center mb-4">
				<p className="text-[#0072BB] font-bold">{gig?.gigInfos[0]?.title}</p>
				<div className="px-3 py-1.5 border border-[#0072BB] text-xs rounded-full bg-[#FFF7B2]">
					{gig?.subCategory?.name}
				</div>
				<div className="px-3 py-1.5 border border-[#0072BB] text-gray-700 bg-[#F0FBFF] text-xs rounded-full flex gap-1 items-center font-bold">
					<ExperienceIcon /> Experience Required
				</div>
			</div>

			<div className="p-4 border description rounded-md mb-4">
				<div className="flex items-center gap-2 text-[#4440FF] font-bold text-sm mb-4">
					<FundWalletIcon fill="#4440FF" />
					Description
				</div>
				<p className="text-xs text-gray-700">
					{gig?.gigInfos[0]?.description || "N/A"}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div className="text-xs">
					<div className="flex justify-between mb-1">
						<p className="font-bold">Location</p>
						<p>
							Type: <strong>{gig?.isPhysical ? "On-site" : "Remote"}</strong>
						</p>
					</div>
					<div className="p-4 border border-[#4440FF] flex gap-2 rounded-md items-center">
						<div className="w-6">
							<LocationIcon fill="#4440FF" />
						</div>
						<div className="flex-1 capitalize">
							{gig?.gigAddresses[0]?.address}
						</div>
					</div>
				</div>
				<div className="text-xs">
					<div className="flex justify-between mb-1">
						<p className="font-bold">Date</p>
						<p>
							{/* Type: <strong>{gig?.isPhysical ? "On-site" : "Remote"}</strong> */}
						</p>
					</div>
					<div className="p-4 border border-[#4440FF] flex gap-2 rounded-md items-center">
						<div className="w-6">
							<DateIcon fill="#4440FF" />
						</div>
						<div className="flex-1 capitalize">{formatDate(gig?.gigDate)}</div>
					</div>
				</div>
				<div className="text-xs">
					<div className="flex justify-between mb-1">
						<p className="font-bold">Duration</p>
						<p>
							{getAmPm(gig?.startTime)} - {getAmPm(gig?.endTime)}
						</p>
					</div>
					<div className="p-4 border border-[#4440FF] flex gap-2 rounded-md items-center">
						<div className="w-6">
							<TimeIcon fill="#4440FF" />
						</div>
						<div className="flex-1 capitalize">
							{getDifferenceInHours(gig?.startTime, gig?.endTime)}
							hrs
						</div>
					</div>
				</div>
				<div className="text-xs">
					<div className="flex justify-between mb-1">
						<p className="font-bold">Fee</p>
						{/* <p>
							Type: <strong>{gig?.isPhysical ? "On-site" : "Remote"}</strong>
						</p> */}
					</div>
					<div className="p-4 border border-[#4440FF] flex gap-2 rounded-md items-center">
						<div className="w-6">
							<WalletIcon fill="#4440FF" />
						</div>
						<div className="flex-1 capitalize">
							NGN {formatNumber(gig?.budget)}
						</div>
					</div>
				</div>
			</div>

			<div className="text-xs">
				<div className="font-bold mb-2 flex items-center gap-2">
					<PaperPenIcon /> Other Information
				</div>
				<div className="p-4 bg-gray-100 rounded-lg">
					<div className="mb-4">
						<p className="font-bold text-[#4440FF]">Additional Instructions</p>
						<p>{gig?.gigInfos[0]?.additionalInstruction || "N/A"}</p>
					</div>
					<div className="mb-4">
						<p className="font-bold text-[#4440FF]">Dress Code</p>
						<p>{gig?.gigInfos[0]?.dressCode || "N/A"}</p>
					</div>
				</div>
			</div>

			{/* <div className="block md:flex gap-4">
				<div className="w-full">
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
						<p className="text-sm font-bold"></p>
					</div>
					<hr />

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
			</div> */}
		</div>
	);
}

GigDetails.propTypes = {
	gig: PropTypes.object.isRequired,
};
