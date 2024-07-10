import React, { useState } from "react";
import { DashBoardWrapper } from "../../../../component/dashboard-wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { GigDetails } from "../gig-details";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../../helpers/profileAxios";
import { BusinessGigTimeLine } from "./gig-timeline";
import { GigDispute } from "./gig-dispute";
import { GigApplications } from "./gig-applications";

export function GigSummaryBusiness() {
	const navigate = useNavigate();
	const { id, role } = useParams();
	const [activeTab, setActiveTab] = useState("details");

	const {
		data = {},
		isLoading,
		refetch,
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
				<div className="flex bg-adminPrimary p-2 text-sm text-white w-full justify-evenly rounded-lg mb-4 max-w-md">
					<div
						className={`${
							activeTab === "details" ? "border-b-yellow-300 border-b-4" : ""
						} p-0.5 cursor-pointer`}
						onClick={() => setActiveTab("details")}
					>
						Details
					</div>
					<div
						className={`${
							activeTab === "applications"
								? "border-b-yellow-300 border-b-4"
								: ""
						} p-0.5 cursor-pointer`}
						onClick={() => setActiveTab("applications")}
					>
						Applications
					</div>
					{data?.gigApplies?.length > 0 && data.statusType !== "new" && (
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
			<div>
				{isLoading ? (
					<p>Please wait...</p>
				) : (
					<>
						{activeTab === "details" && <GigDetails gig={data} />}
						{activeTab === "timeline" && <BusinessGigTimeLine gig={data} />}
						{activeTab === "dispute" && <GigDispute gig={data} />}
						{activeTab === "applications" && <GigApplications gig={data} refetch={refetch} />}
					</>
				)}
			</div>
		</DashBoardWrapper>
	);
}
