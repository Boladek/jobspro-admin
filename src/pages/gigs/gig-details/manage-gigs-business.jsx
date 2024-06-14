import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	formatDate,
	formatNumber,
	generateArray,
} from "../../../helpers/function";
import ReactPaginate from "react-paginate";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";

const proTabs = ["Posted", "Active", "Archived"];

export function ManageGigsBusiness() {
	const navigate = useNavigate();
	const { role } = useParams();
	const itemsPerPage = 10;
	const items = generateArray(40);
	const [activeTab, setActiveTab] = useState(proTabs[0]);

	const [itemOffset, setItemOffset] = useState(0);

	const { data: gigs = [], isLoading } = useQuery({
		queryKey: ["fetch-gig-business"],
		queryFn: () => profileAxios.get("/gigs/all?page=1&limit=100"),
		select: (data) => data.data.items,
		staleTime: Infinity,
	});

	// console.log({ gigs });

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	const endOffset = itemOffset + itemsPerPage;
	// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const currentItems = gigs.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(gigs.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		// console.log(
		// 	`User requested page number ${event.selected}, which is offset ${newOffset}`
		// );
		setItemOffset(newOffset);
	};

	console.log({ currentItems });

	return (
		<div className="bg-[#f6f7fa] h-full p-4">
			<div className="flex justify-between items-center">
				<p className="text-2xl font-bold mb-2">Manage Gigs</p>
				{role === "pro" ? (
					<span
						className="p-2 border text-sm bg-primary text-white rounded-md hover:opacity-75 cursor-pointer"
						onClick={() => navigate(`/gigs/${role}/find-gigs`)}
					>
						Find Gigs
					</span>
				) : (
					<span
						className="p-2 border text-sm bg-primary text-white rounded-md hover:opacity-75 cursor-pointer"
						onClick={() => navigate(`/gigs/${role}/create-gig`)}
					>
						Create Gig &#43;
					</span>
				)}
			</div>
			<div className="flex bg-[#F3F8FF] rounded-full p-1 overflow-x-auto justify-center mb-4">
				{proTabs.map((item) => (
					<div
						key={item}
						onClick={() => setActiveTab(item)}
						className={`py-2 px-6 text-xs md:text-sm cursor-pointer flex justify-center items-center text-center ${
							item === activeTab
								? "bg-primary text-white rounded-full"
								: "text-[#789DB8]"
						}`}
					>
						{item}
					</div>
				))}
			</div>
			{isLoading && <div className="progress"></div>}
			<div className="flex flex-col w-full gap-2">
				{currentItems?.map((item) => (
					<div
						key={Math.random()}
						className="w-full p-4 shadow-sm rounded-md bg-white flex items-center gap-4 justify-between flex-wrap cursor-pointer hover:shadow-md"
						onClick={() => navigate(`/gigs/${role}/details/${item.uuid}`)}
					>
						<div>
							<p className="text-xs text-gray-400">Gig Title</p>
							<p className="text-sm">{item.gigInfos[0].title}</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">Gig Date</p>
							<p className="text-sm">{formatDate(new Date(item.gigDate))}</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">Gig Duration</p>
							<p className="text-sm">8 hours</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">Gig Location</p>
							<p className="text-sm">{item.gigAddresses[0].address}</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">Budget</p>
							<p className="text-sm">N{formatNumber(item.budget)}</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">No Applied</p>
							<p className="text-sm">{item.gigApplies.length}</p>
						</div>
						<div>
							<p className="text-xs text-gray-400">Hired</p>
							<p className="text-sm">{item.gigAccepted.length}</p>
						</div>
						<div>
							<span className="p-2 rounded-full bg-[#FFA133] text-white text-xs">
								{item.statusType}
							</span>
						</div>
					</div>
				))}
			</div>
			<div>
				<ReactPaginate
					breakLabel="..."
					// nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
					pageCount={pageCount}
					renderOnZeroPageCount={null}
					className="flex p-2 gap-2 justify-center items-center"
					nextLabel={
						<span className="py-1 capitalize px-3 text-xs text-white font-bold border border-primary bg-primary hover:opacity-70 rounded-full select-none">
							&rarr;
						</span>
					}
					previousLabel={
						<span className="py-1 capitalize px-3 text-xs text-white font-bold border border-accent bg-accent hover:opacity-70 rounded-full select-none">
							&larr;
						</span>
					}
					pageLinkClassName="text-sm"
					activeClassName="text-primary text-sm font-bold"
				/>
			</div>
		</div>
	);
}
