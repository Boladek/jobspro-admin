import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	formatDate,
	formatNumber,
	generateArray,
	getDifferenceInHours,
} from "../../../helpers/function";
// import ReactPaginate from "react-paginate";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { Paginate } from "../../../component/paginate";

const proTabs = ["Posted", "Active", "Archived"];

export function ManageGigsBusiness() {
	const navigate = useNavigate();
	const { role } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);
	const [activeTab, setActiveTab] = useState(proTabs[0]);

	// const [itemOffset, setItemOffset] = useState(0);

	const { data: gigs = [], isLoading } = useQuery({
		queryKey: ["fetch-gig-business"],
		queryFn: () => profileAxios.get("/gigs/all?page=1&limit=100"),
		select: (data) => data.data.items,
		// staleTime: Infinity,
		refetchOnWindowFocus: true,
	});

	// const endOffset = itemOffset + itemsPerPage;

	const filteredGigData = useMemo(() => {
		if (gigs.length > 0) {
			return gigs.filter((gig) => {
				if (activeTab === proTabs[0]) return gig;
				if (activeTab === proTabs[1]) return gig.statusType === "hired";
				if (activeTab === proTabs[2]) return gig.statusType === "completed";
			});
		}
		return [];
	}, [activeTab, gigs]);

	// console.log({ filteredGigData });

	// const currentItems = filteredGigData.slice(itemOffset, endOffset);
	// const pageCount = Math.ceil(filteredGigData.length / itemsPerPage);

	// // Invoke when user click to request another page.
	// const handlePageClick = (event) => {
	// 	const newOffset = (event.selected * itemsPerPage) % items.length;
	// 	// console.log(
	// 	// 	`User requested page number ${event.selected}, which is offset ${newOffset}`
	// 	// );
	// 	setItemOffset(newOffset);
	// };

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

	return (
		<div className="bg-white h-full p-4 flex flex-col">
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
				{/* <span
					className="p-2 border text-sm bg-adminPrimary text-white rounded-md hover:opacity-75 cursor-pointer"
					onClick={() => navigate(`/gigs/${role}/create-gig`)}
				>
					Create Gig &#43;
				</span> */}
			</div>

			{isLoading && <div className="progress"></div>}
			<div>
				<>
					{filteredGigData.length > 0 ? (
						<>
							<table className="w-full">
								<thead className="bg-[#F7F9FF] shadow-sm">
									<tr>
										<th className="py-4 px-2 text-sm text-left">Title</th>
										<th className="py-4 px-2 text-sm text-left">Date</th>
										<th className="py-4 px-2 text-sm text-left">Duration</th>
										<th className="py-4 px-2 text-sm text-left">Location</th>
										<th className="py-4 px-2 text-sm text-left">Budget</th>
										<th className="py-4 px-2 text-sm text-left">No Applied</th>
										<th className="py-4 px-2 text-sm text-left">Hired</th>
										<th className="py-4 px-2 text-sm text-left">Status</th>
									</tr>
								</thead>
								<tbody className="rounded-xl">
									{filteredGigData
										.slice(
											currentPage * itemsPerPage,
											currentPage * itemsPerPage + itemsPerPage
										)
										.map((item) => (
											<tr
												key={item.uuid}
												onClick={() => {
													// if (
													// 	item.statusType === "hired" ||
													// 	item.statusType === "completed"
													// ) {
													// }
													navigate(`/gigs/${role}/details/${item.uuid}`, {
														state: {
															gigData: item,
														},
													});
												}}
												className="cursor-pointer hover:bg-gray-100"
											>
												<td className="py-2 px-2 text-xs text-left">
													{item?.gigInfos[0]?.title}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{formatDate(item.gigDate)}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{getDifferenceInHours(item.startTime, item.endTime)}
													hrs
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{item?.gigAddresses[0].address}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													N{formatNumber(item.budget)}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{item.gigApplies.length}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{item.gigAccepted.length}
												</td>
												<td className="py-2 px-2 text-xs text-left capitalize">
													{item.statusType}
													<ProgressBar
														color={handleProgressColor(item.statusType)}
														thickness={1.2}
													/>
													{/* <span className={handleStatusColor(item.statusType)}>
												</span> */}
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
						<p>No gigs match this criteria</p>
					)}
				</>
			</div>
		</div>
	);
}

function handleProgressColor(stat) {
	if (stat === "hired") return "#206DB0";
	if (stat === "completed") return "green";
	return "orange";
}
