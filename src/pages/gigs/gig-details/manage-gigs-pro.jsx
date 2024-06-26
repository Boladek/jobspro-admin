import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	formatDate,
	formatNumber,
	getDifferenceInHours,
} from "../../../helpers/function";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { Paginate } from "../../../component/paginate";

const proTabs = ["Applied", "Active", "On-going", "Cancelled"];

export function ManageGigsPro() {
	const navigate = useNavigate();
	const { role } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeTab, setActiveTab] = useState(proTabs[0]);

	const { data: gigs = [], isLoading } = useQuery({
		queryKey: ["fetch-applied-gigs"],
		queryFn: () => profileAxios.get("/pro-gigs/applied"),
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 3,
	});

	const filteredGigData = useMemo(() => {
		if (gigs.length > 0) {
			return gigs.filter((gig) => {
				if (activeTab === proTabs[0]) return gig;
				if (activeTab === proTabs[1]) return gig.gigStatusType === "hired";
				if (activeTab === proTabs[2])
					return gig.gigStatusType === "in-progress";
				if (activeTab === proTabs[3])
					return gig.gigStatusType === "in-progress";
			});
		}
		return [];
	}, [activeTab, gigs]);

	const [itemOffset, setItemOffset] = useState(0);

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + itemsPerPage;
	// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = filteredGigData.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(filteredGigData.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (value) => {
		setCurrentPage(value);
		const newOffset = (value * itemsPerPage) % filteredGigData.length;
		setItemOffset(newOffset);
	};

	const handleOptions = (event) => {
		setItemsPerPage(event.target.value);
		// setItemOffset(newOffset);
	};

	useEffect(() => {
		document.title = "Jobs Pro | Gigs";
	}, []);

	return (
		<div className="bg-white h-full p-4">
			<div className="flex justify-between items-center">
				<p className="text-2xl font-bold mb-2">Manage Gigs</p>
				<div className="flex bg-adminPrimary p-2 text-sm text-white w-full justify-evenly rounded-lg max-w-md mx-auto mb-4">
					{proTabs.map((tab) => (
						<div
							className={`${
								activeTab === tab ? "border-b-yellow-300 border-b-4" : ""
							} p-0.5 cursor-pointer`}
							key={tab}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</div>
					))}
				</div>
				<span
					className="p-2 border text-sm bg-adminPrimary text-white rounded-md hover:opacity-75 cursor-pointer"
					onClick={() => navigate(`/gigs/${role}/find-gigs`)}
				>
					Find Gigs
				</span>
			</div>

			{isLoading ? (
				<div>Fetching applied gigs...</div>
			) : (
				<>
					{currentItems.length > 0 ? (
						<>
							<table className="w-full">
								<thead className="bg-[#F7F9FF] shadow-sm">
									<tr>
										<th className="py-4 px-2 text-sm text-left">Title</th>
										<th className="py-4 px-2 text-sm text-left">Date</th>
										<th className="py-4 px-2 text-sm text-left">Duration</th>
										<th className="py-4 px-2 text-sm text-left">Location</th>
										<th className="py-4 px-2 text-sm text-left">Budget</th>
										<th className="py-4 px-2 text-sm text-left">Status</th>
									</tr>
								</thead>
								<tbody className="rounded-xl">
									{currentItems.map(({ gig, gigStatusType, ...rest }) => (
										<tr
											key={gig.uuid}
											onClick={() =>
												navigate(`/gigs/${role}/details/gig`, {
													state: {
														gigData: { gig, ...rest, gigStatusType },
													},
												})
											}
											className="cursor-pointer hover:bg-gray-100"
										>
											<td className="py-4 px-2 text-xs text-left">
												{gig?.gigInfos[0]?.title}
											</td>
											<td className="py-4 px-2 text-xs text-left">
												{formatDate(gig.gigDate)}
											</td>
											<td className="py-4 px-2 text-xs text-left">
												{getDifferenceInHours(gig.startTime, gig.endTime)}hrs
											</td>
											<td className="py-4 px-2 text-xs text-left">
												{gig?.gigAddresses[0].address}
											</td>
											<td className="py-4 px-2 text-xs text-left">
												N{formatNumber(gig.budget)}
											</td>
											<td className="py-4 px-2 text-xs text-left capitalize">
												{gigStatusType}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div>
								<Paginate
									total={filteredGigData.length}
									pageCount={pageCount}
									options={[8, 10, 15]}
									handlePageClick={handlePageClick}
									handleOptions={handleOptions}
									perPage={itemsPerPage}
									currentPage={currentPage}
								/>
							</div>
						</>
					) : (
						<div className="flex flex-col items-center p-4">
							<p className="font-bold">You have no applications</p>
							<div
								onClick={() => navigate(`/gigs/${role}/find-gigs`)}
								className="px-4 py-2 bg-primary text-xs text-white cursor-pointer rounded-md hover:bg-secondary mt-2"
							>
								Find gigs
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
