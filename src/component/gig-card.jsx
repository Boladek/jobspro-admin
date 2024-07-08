import PropTypes from "prop-types";
import {
	formatDate,
	formatNumber,
	timeAgo,
	getDifferenceInHours,
	getAmPm,
} from "../helpers/function";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../context/auth-context";

export function GigCard({ gig }) {
	const navigate = useNavigate();
	const { user } = UseAuth();

	return (
		<div
			className="bg-[#F8FAFF] border border-adminPrimary p-4 rounded-lg"
			onClick={() =>
				navigate(`/gigs/${user.userType}/details/${gig.uuid}`, {
					state: {
						gigData: gig,
					},
				})
			}
		>
			<div className="w-fit p-3 py-1 border rounded-full text-xs bg-white">
				{gig.gigInfos[0].isExperienced ? "Experienced" : "Beginner"}
			</div>
			<div className="pt-2">
				<p className="font-bold mb-2 text-base text-adminPrimary">
					{gig?.gigInfos[0]?.title}
				</p>
				<p className="text-xs mb-2 text-gray-500">
					{gig?.gigInfos[0]?.description}
				</p>
				<div className="flex items-center flex-wrap mb-4 bg-adminPrimary rounded-lg text-white p-4 text-xs justify-between font-extralight">
					<div>
						<p>
							Duration
							<span className="font-semibold ml-4">
								{getDifferenceInHours(gig.startTime, gig.endTime)}hrs |{" "}
								{getAmPm(gig.startTime)}-{getAmPm(gig.endTime)}
							</span>
						</p>
					</div>
					<div>
						<p>
							Budget
							<span className="font-semibold ml-4">
								N{formatNumber(gig.budget)}
							</span>
						</p>
					</div>
					{/* <div>
							<p className="font-semibold text-xs">{formatDate(gig.gigDate)}</p>
						</div>
						<div>
							<p className="font-semibold text-xs">
								{gig.gigAddresses[0].address}
							</p>
						</div> */}
				</div>
				<div className="flex justify-between text-xs items-center">
					<div className="py-2 px-4 border rounded-lg border-adminPrimary bg-white font-light">
						Start Date
						<span className="font-bold ml-4">{formatDate(gig.createdAt)}</span>
					</div>
					<div>Posted | {timeAgo(gig.createdAt)}</div>
					<div className="flex gap-2 items-center">
						Views | <span className="font-bold">{formatNumber(20)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

GigCard.propTypes = {
	gig: PropTypes.object,
	refetch: PropTypes.func,
};
