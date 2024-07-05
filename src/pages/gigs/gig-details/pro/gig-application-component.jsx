import React from "react";
import { object } from "prop-types";
import avatar from "../../../../assets/profile-avatar.png";
import { formatDate, formatNumber } from "../../../../helpers/function";
import { LocationIcon } from "../../../../assets/admin/location-icon";
import { DateIcon } from "../../../../assets/date-icon";
import { WalletIcon } from "../../../../assets/wallet-icon";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuth } from "../../../../context/auth-context";

export function GigApplicationComponent({ gig }) {
	const { role } = useParams();
	const navigate = useNavigate();
	return (
		<div
			className={`p-3 border rounded-md border-l-8 ${handleBorderLeft(
				gig.statusType
			)}`}
			onClick={() => {
				if (gig.statusType !== "in-progress") {
					navigate(`/gigs/${role}/details/${gig.uuid}`);
				}
			}}
		>
			<div className="flex gap-1 items-center mb-2">
				<img
					src={gig?.user?.profilePicture ?? avatar}
					alt="User Avatar"
					className="h-10 w-10 rounded-full"
				/>
				<div>
					<p className="font-bold text-adminPrimary">
						{gig?.user.companyName
							? gig?.user.companyName
							: `${gig?.user.firstName} ${gig?.user.lastName}`}
					</p>
					<p className="text-xs">{gig?.user.finclusionId}</p>
				</div>
			</div>
			<div className="text-sm font-bold mb-1">{gig?.gigInfos[0]?.title}</div>
			<div className="text-xs mb-2 flex gap-2 items-center">
				<LocationIcon fill="#408CFF" />
				<p>{gig?.gigAddresses[0].address}</p>
			</div>
			<div className="text-xs p-2 border rounded-md justify-between flex items-center">
				<div className="flex gap-2 items-center">
					<DateIcon />
					{formatDate(gig.gigDate)}
				</div>
				<div className="font-bold flex gap-2 items-center">
					<WalletIcon />N {formatNumber(gig.budget)}
				</div>
			</div>
		</div>
	);
}

function handleBorderLeft(stat) {
	if (stat === "completed") return "border-l-green-500";
	if (stat === "cancelled") return "border-l-red-500";
	if (stat === "hired") return "border-l-orange-400";
	if (stat === "in-progress") return "border-l-blue-400";
	if (stat === "new") return "border-l-yellow-300";
	return "border-l-grey-500";
}

GigApplicationComponent.propTypes = {
	gig: object,
};
