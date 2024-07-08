import React, { useState } from "react";
import { DashBoardWrapper } from "../../../../component/dashboard-wrapper";
import {
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { GigDetails } from "../gig-details";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../../helpers/profileAxios";
import { ProGigTimeLine } from "./gig-timeline";
import { GigDispute } from "./gig-dispute";

export function GigSummaryPro() {
	const navigate = useNavigate();
	const { id, role } = useParams();
	const [activeTab, setActiveTab] = useState("details");

	const {
		data = {},
		isLoading,
		// refetch,
	} = useQuery({
		queryKey: ["gig-details" + id + role, role, id],
		queryFn: () => profileAxios.get(`/gigs/details/${id}`),
		select: (data) => data.data,
		staleTime: Infinity,
		enabled: !!role && !!id,
	});

	return (
		<DashBoardWrapper>
			<div className="flex flex-wrap gap-4 items-center p-2">
				<div className="flex gap-2 justify-between items-center text-xs w-full md:w-36 capitalize">
					<span className="bg-[#FFDE16] py-1 px-2 rounded-lg font-bold text-[#025949]">
						Gig {activeTab}
					</span>
					<span
						className="hover:underline cursor-pointer"
						onClick={() => navigate(-1)}
					>
						Back
					</span>
				</div>
				<div className="flex bg-adminPrimary p-2 text-sm text-white w-full justify-evenly rounded-lg mb-0 md:mb-4 max-w-md">
					<div
						className={`${
							activeTab === "details" ? "border-b-yellow-300 border-b-4" : ""
						} p-0.5 cursor-pointer`}
						onClick={() => setActiveTab("details")}
					>
						Details
					</div>
					{data && data.gigApplies && data.gigApplies.length > 0 && (
						<div
							className={`${
								activeTab === "timeline" ? "border-b-yellow-300 border-b-4" : ""
							} p-0.5 cursor-pointer`}
							onClick={() => setActiveTab("timeline")}
						>
							Timeline
						</div>
					)}
					<div
						className={`${
							activeTab === "dispute" ? "border-b-yellow-300 border-b-4" : ""
						} p-0.5 cursor-pointer`}
						onClick={() => setActiveTab("dispute")}
					>
						Dispute
					</div>
				</div>
			</div>
			<div className="md:border px-2 md:p-8 rounded-md">
				{isLoading ? (
					<p>Fetching details</p>
				) : (
					<>
						{activeTab === "details" && <GigDetails gig={data} />}
						{activeTab === "timeline" && <ProGigTimeLine gig={data} />}
						{activeTab === "dispute" && <GigDispute gig={data} />}
					</>
				)}
			</div>
		</DashBoardWrapper>
	);
}
