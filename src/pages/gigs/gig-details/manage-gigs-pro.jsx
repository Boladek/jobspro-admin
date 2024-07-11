import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../helpers/function";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import avatar from "../../../assets/profile-avatar.png";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { CgUnavailable } from "react-icons/cg";
import { GigApplicationComponent } from "./pro/gig-application-component";
import { Paginate } from "../../../component/paginate";

const proTabs = ["Applications", "Hired", "On-going", "Completed", "Cancelled"];

export function ManageGigsPro() {
	const navigate = useNavigate();
	const { role } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);
	const [activeTab, setActiveTab] = useState(proTabs[0]);

	const { data: gigs = [], isLoading } = useQuery({
		queryKey: ["fetch-applied-gigs"],
		queryFn: () => profileAxios.get("/pro-gigs/applied"),
		select: (data) => data.data,
		// staleTime: Infinity,
		retry: 3,
		refetchOnWindowFocus: true,
	});

	const filteredGigData = useMemo(() => {
		if (gigs.length > 0) {
			return gigs.filter((gig) => {
				if (activeTab === proTabs[0]) return gig;
				if (activeTab === proTabs[1]) return gig.gig.statusType === "hired";
				if (activeTab === proTabs[2])
					return gig.gig.statusType === "in-progress";
				if (activeTab === proTabs[3]) return gig.gig.statusType === "completed";
				if (activeTab === proTabs[4]) return gig.gig.statusType === "cancelled";
			});
		}
		return [];
	}, [activeTab, gigs]);

	// console.log({ filteredGigData });

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

	// console.log({ currentItems });

	return (
		<div className="bg-white h-full p-4">
			<div className="text-tiny flex bg-adminPrimary p-2 sm:text-sm text-white w-full justify-evenly rounded-lg max-w-md mb-4 overflow-x-auto gap-4 mx-auto">
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
			{/* <div className="flex justify-center">
			</div> */}

			{isLoading ? (
				<div
					role="status"
					className="absolute top-0 left-0 w-full h-full bg-black/5 flex flex-col justify-center items-center"
				>
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
				</div>
			) : (
				<>
					{currentItems.length > 0 ? (
						<>
							<table className="hidden md:table w-full">
								<thead className="bg-adminPrimary/20 shadow-sm rounded-md">
									<tr>
										<th className="py-4 px-2 text-sm text-left font-bold">
											Owner
										</th>
										<th className="py-4 px-2 text-sm text-left font-bold">
											Title
										</th>
										<th className="py-4 px-2 text-sm text-left font-bold">
											Date
										</th>
										{/* <th className="py-4 px-2 text-sm text-left">Duration</th> */}
										<th className="py-4 px-2 text-sm text-left font-bold">
											Location
										</th>
										{/* <th className="py-4 px-2 text-sm text-left">Budget</th> */}
										<th className="py-4 px-2 text-sm text-left font-bold">
											Status
										</th>
									</tr>
								</thead>
								<tbody className="rounded-xl font-semibold">
									{filteredGigData
										.slice(
											currentPage * itemsPerPage,
											currentPage * itemsPerPage + itemsPerPage
										)
										.map(({ gig, gigStatusType, ...rest }) => (
											<tr
												key={gig.uuid}
												onClick={() => {
													navigate(`/gigs/${role}/details/${gig.uuid}`, {
														state: {
															gigData: { gig, ...rest, gigStatusType },
														},
													});
													// if (gig.statusType !== "in-progress") {
													// }
												}}
												className="cursor-pointer hover:bg-gray-100"
											>
												<td className="py-2 px-2 text-xs text-left">
													<div className="flex gap-1 items-center">
														<img
															src={gig?.user.profilePicture ?? avatar}
															alt="User Avatar"
															className="h-10 w-10 rounded-full"
														/>
														<div>
															<p className="font-bold text-adminPrimary">
																{gig?.user.companyName
																	? gig?.user.companyName
																	: `${gig?.user.firstName} ${gig?.user.lastName}`}
															</p>
															<p style={{ fontSize: ".5rem" }}>
																{gig?.user.finclusionId}
															</p>
														</div>
													</div>
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{gig?.gigInfos[0]?.title}
												</td>
												<td className="py-2 px-2 text-xs text-left">
													{formatDate(gig.gigDate)}
												</td>
												{/* <td className="py-2 px-2 text-xs text-left">
												{getDifferenceInHours(gig.startTime, gig.endTime)}hrs
											</td> */}
												<td className="py-2 px-2 text-xs text-left">
													{gig?.gigAddresses[0].address}
												</td>
												{/* <td className="py-2 px-2 text-xs text-left">
												N{formatNumber(gig.budget)}
											</td> */}
												<td className="py-2 px-2 text-xs text-left capitalize">
													{gig.statusType}
													<ProgressBar
														color={handleProgressColor(gig.statusType)}
														thickness={1.2}
													/>
												</td>
											</tr>
										))}
								</tbody>
							</table>
							<div
								className="md:hidden grid grid-cols-1 gap-4 overflow-y-auto"
								style={{ maxHeight: "80vh" }}
							>
								{filteredGigData.map(({ gig }) => (
									<GigApplicationComponent key={gig.uuid} gig={gig} />
								))}
							</div>
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
							<div className="flex justify-center">
								<CgUnavailable className="text-9xl" />
							</div>
							<p className="font-bold">You have no {activeTab} applications</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}

function handleProgressColor(stat) {
	if (stat === "cancelled") return "red";
	if (stat === "completed") return "green";
	return "orange";
}
