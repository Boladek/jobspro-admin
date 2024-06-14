import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	formatDate,
	formatNumber,
	generateArray,
} from "../../../helpers/function";
import avatar from "../../../assets/profile-avatar.png";
import ReactPaginate from "react-paginate";
import { KycTag } from "../../../component/kyc-tag";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";

const proTabs = ["Applied", "Active", "Archived"];
const busTabs = ["Active", "Archived"];

export function ManageGigsPro() {
	const navigate = useNavigate();
	const { role } = useParams();
	const itemsPerPage = 10;
	const items = generateArray(40);
	let tabs = role === "pro" ? proTabs : busTabs;
	const [activeTab, setActiveTab] = useState(tabs[0]);

	const { data: gigs = [], isLoading } = useQuery({
		queryKey: ["fetch-applied-gigs"],
		queryFn: () => profileAxios.get("/pro-gigs/applied"),
		select: (data) => data.data.data,
		staleTime: Infinity,
		retry: 3,
	});

	const [itemOffset, setItemOffset] = useState(0);

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

	useEffect(() => {
		document.title = "Jobs Pro | Gigs";
	}, []);

	return (
		<div className="bg-[#f6f7fa] h-full p-4">
			<div className="flex justify-between items-center">
				<p className="text-2xl font-bold mb-2">Manage Gigs</p>
				<span
					className="p-2 border text-sm bg-primary text-white rounded-md hover:opacity-75 cursor-pointer"
					onClick={() => navigate(`/gigs/${role}/find-gigs`)}
				>
					Find Gigs
				</span>
			</div>
			<div className="flex bg-[#F3F8FF] rounded-full p-1 overflow-x-auto justify-center mb-4">
				{tabs.map((item) => (
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
			{isLoading ? (
				<div>Getting Applied Gigs</div>
			) : (
				<>
					{currentItems.length > 0 ? (
						<>
							<div className="flex flex-col w-full gap-2">
								{currentItems.map(() => (
									<div
										key={Math.random()}
										className="w-full p-4 shadow-sm rounded-md bg-white flex items-center gap-4 justify-between flex-wrap cursor-pointer hover:shadow-md"
										onClick={() => navigate(`/gigs/${role}/details/gig`)}
									>
										<div className="flex items-center gap-2">
											<img src={avatar} alt="Profile avi" className="h-10" />
											<div>
												<p className="text-xs text-gray-400">Business Name</p>
												<p>Adeola Alero</p>
											</div>
										</div>
										<div className="flex gap-2 items-center">
											<span className="py-1 px-2 bg-[#FF2787] text-xs text-white rounded-full">
												SuperPro
											</span>
											<KycTag text="Tier 1" />
											{/* <span className="py-1 px-2 bg-[#FFEF98] text-xs rounded-full">
								Tier 1
							</span> */}
										</div>
										<div>
											<p className="text-xs text-gray-400">Gig Title</p>
											<p className="text-sm">
												Need servers for a birthday party{" "}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-400">Gig Date</p>
											<p className="text-sm">{formatDate(new Date())}</p>
										</div>
										<div>
											<p className="text-xs text-gray-400">Gig Duration</p>
											<p className="text-sm">8 hours</p>
										</div>
										<div>
											<p className="text-xs text-gray-400">Gig Location</p>
											<p className="text-sm">Opebi, Ikeja</p>
										</div>
										<div>
											<p className="text-xs text-gray-400">Budget</p>
											<p className="text-sm">N{formatNumber(20000)}</p>
										</div>
										<div>
											<span className="p-2 rounded-full bg-[#FFA133] text-white text-xs">
												Applied
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
