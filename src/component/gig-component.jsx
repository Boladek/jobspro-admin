import PropTypes from "prop-types";
import { useState } from "react";
// import { BiDislike } from "react-icons/bi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BaseButton } from "./button";
import {
	formatDate,
	formatNumber,
	timeAgo,
	getDifferenceInHours,
	getAmPm,
} from "../helpers/function";
import { Modal } from "./modal";
import { BaseTextArea } from "./text-area";
import profileAxios from "../helpers/profileAxios";
import { Overlay } from "./overlay-component";
import { toast } from "react-toastify";
export function GigComponent({ gig, refetch }) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [openComment, setOpenComment] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	const [comments, setCommments] = useState("");

	function applyToGig() {
		setLoading(true);
		profileAxios
			.post("/pro-gigs/apply", {
				gigId: gig.uuid,
				additionalComments: comments,
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	function likeGig() {
		profileAxios
			.post(`/pro-gigs/like-gig/${gig.uuid}`, {})
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	}

	function unLikeGig() {
		profileAxios
			.post(`/pro-gigs/unlike-gig/${gig.uuid}`, {})
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	}

	return (
		<>
			{loading && <Overlay message="Applying for gig" />}
			<div className="bg-white p-3 rounded-xl">
				<div className="flex justify-between mb-2 items-center">
					<div className="p-3 text-xs text-gray-600 border rounded-full">
						Posted {timeAgo(gig.createdAt)}
					</div>
					<div className="flex gap-2 items-end">
						<span>
							{/* {gig.gigFavourites.length > 0 ? (
								<IoIosHeart size={24} color="red" onClick={unLikeGig} />
							) : (
								<IoIosHeartEmpty size={24} color="red" onClick={likeGig} />
							)} */}
						</span>
						{/* <span>
							<BiDislike size={24} />
						</span> */}
					</div>
				</div>
				<hr />
				<div className="pt-2" onClick={() => setOpen(true)}>
					<p className="font-bold mb-2 text-base">{gig?.gigInfos[0]?.title}</p>
					<p className="font-extralight text-xs mb-2">
						{gig?.gigInfos[0]?.description}
					</p>
					<div className="flex gap-2 items-center flex-wrap mb-2">
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-xs">
								{getDifferenceInHours(gig.startTime, gig.endTime)}hrs(
								{getAmPm(gig.startTime)}-{getAmPm(gig.endTime)})
							</p>
							<p className="text-xs font-light text-gray-500">Duration</p>
						</div>
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-xs">{formatDate(gig.gigDate)}</p>
							<p className="text-xs font-light text-gray-500">Date</p>
						</div>
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-xs">
								{gig.gigAddresses[0].address}
							</p>
							<p className="text-xs font-light text-gray-500">location</p>
						</div>
					</div>
					<div className="flex gap-1 items-center mb-2">
						<span className="text-xs text-gray-500 font-semibold">Budget</span>
						<span className="font-bold">N{formatNumber(gig.budget)}</span>
					</div>
					{/* <div className="flex gap-2 flex-wrap">
						{["Total", "Next", "View"].map((item) => (
							<span
								key={item}
								className="text-xs p-2 border rounded-full bg-light"
							>
								{item}
							</span>
						))}
					</div> */}
				</div>
			</div>
			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
					style={{
						zIndex: 20,
					}}
					onClick={() => setOpen(false)}
				>
					<div
						className="bg-white p-2 w-full max-w-lg flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-end">
							<span
								className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
								onClick={() => setOpen(false)}
							>
								&times;
							</span>
						</div>
						<div className="p-2 flex-1 min-h-96 overflow-y-auto">
							<div className="mx-auto w-full max-w-lg px-4">
								{!openReview ? (
									<div>
										<div className="flex justify-between items-center mb-4">
											<p className="text-xs font-bold text-gray-400">
												Posted {timeAgo(gig.createdAt)}
											</p>
											<span>
												<IoIosHeartEmpty size={24} color="red" />
											</span>
										</div>
										<p className="text-primary font-bold mb-2">
											{gig?.gigInfos[0]?.title}
										</p>
										<div className="flex gap-2 items-center mb-4">
											<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
												Entertainment
											</span>
											<span> &gt; </span>
											<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
												Acting
											</span>
										</div>
										<div className="mb-2">
											<p className="text-xs text-gray-500">
												Amount Payable at Completion
											</p>
											<div className="flex gap-1 items-center">
												<span className="text-sm font-semibold">
													N{formatNumber(gig.totalBudget)}
												</span>
												{/* <span className="text-xs text-gray-300">PER DAY</span> */}
											</div>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Experience</p>
											<div>
												<span className="text-xs w-fit border border-[#FF9533] gap-2 text-[#FF9533] p-2 flex items-center rounded-full">
													<span className="h-2 w-2 rounded-full bg-[#FF9533]" />{" "}
													Required
												</span>
											</div>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Duration</p>
											<p className="text-sm font-bold">
												{getDifferenceInHours(gig.startTime, gig.endTime)}hrs
											</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Time range</p>
											<p className="text-sm font-bold">
												{getAmPm(gig.startTime)} - {getAmPm(gig.endTime)}
											</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Date</p>
											<p className="text-sm font-bold">
												{formatDate(gig.gigDate)}
											</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Description</p>
											<p className="text-xs">
												{gig?.gigInfos[0]?.description || "N/A"}
											</p>
										</div>
										{/* <hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">
												Skills Needed
											</p>
											<div className="flex gap-2 items-center mb-4">
												<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
													Entertainment
												</span>
												<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
													Acting
												</span>
												<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
													Acting
												</span>
												<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
													Acting
												</span>
											</div>
										</div> */}
										<hr />
										<div className="my-2 border rounded-lg p-2">
											<p className="text-xs text-gray-500 mb-2">Dress code</p>
											<p className="text-xs">
												{gig?.gigInfos[0]?.dressCode || "N/A"}
											</p>
											{/* <ul className="mb-4 list-disc pl-3">
												<li className="text-xs">
													The theme is Mixing Metals and the images show how
													different items made of different metals can be mixed.
												</li>
												<li className="text-xs">
													Use the images with the model together with the
													product shots, which should be placed on the blue
													background, to create exciting.
												</li>
											</ul> */}
										</div>
										<hr />
										<div className="my-2 border rounded-lg p-2">
											<p className="text-xs text-gray-500 mb-2">
												Additional Instructions
											</p>
											<p className="text-xs">
												{gig?.gigInfos[0]?.additionalInstruction || "N/A"}
											</p>
											{/* <ul className="mb-4 list-disc pl-3">
												<li className="text-xs">
													The theme is Mixing Metals and the images show how
													different items made of different metals can be mixed.
												</li>
												<li className="text-xs">
													Use the images with the model together with the
													product shots, which should be placed on the blue
													background, to create exciting.
												</li>
											</ul> */}
										</div>
										<div className="mt-3">
											<BaseButton onClick={() => setOpenComment(true)}>
												Proceed
											</BaseButton>
										</div>
									</div>
								) : (
									<div>
										<p className="text-xl font-bold">Review</p>
										<p className="text-xs text-gray-400">
											More information should be placed here
										</p>
										<div className="mb-2 mt-8">
											<p className="text-xs text-gray-500 mb-2">
												Additional Comments
											</p>
											<p className="text-xs">{comments || "N/A"}</p>
										</div>
										<div className="p-2 border rounded-lg">
											<div className="flex justify-between items-center mb-2">
												<div className="text-sm text-gray-400">Gig Amount</div>
												<div className="text-primary font-bold">
													N{formatNumber(gig.budget)}
												</div>
											</div>
											<div className="flex justify-between items-center mb-2">
												<div>
													<p className="text-sm text-gray-400">
														Est. Tip Amount
													</p>
													<p className="text-xs text-gray-500 italic">
														Not guaranteed, based on performance
													</p>
												</div>
												<div className="text-primary font-bold">
													N{formatNumber(gig.tips || 0)}
												</div>
											</div>
											<div className="flex justify-between items-center mb-2">
												<div className="text-sm text-gray-400">Total</div>
												<div className="text-primary font-bold">
													N{formatNumber(gig.totalBudget)}
												</div>
											</div>
											<div className="flex justify-between items-center mb-2">
												<div className="text-sm text-gray-400">JobsPro Fee</div>
												<div className="text-gray-500 text-sm font-bold">
													N{formatNumber(gig.jobProFee || 0)}
												</div>
											</div>
											<div className="flex justify-between items-center mb-2">
												<div className="text-sm text-gray-400">Escrow Fee</div>
												<div className="text-gray-500 text-sm font-bold">
													N{formatNumber(gig.escrowFee || 0)}
												</div>
											</div>
											<div className="flex justify-between items-center mb-2">
												<div className="text-sm text-gray-400">
													Estimated Total
												</div>
												<div className="text-primary font-bold">
													N{formatNumber(gig.totalBudget)}
												</div>
											</div>
										</div>
										<div className="mt-12">
											<BaseButton
												type="button"
												onClick={() => {
													setOpenReview(false);
													setOpen(false);
													applyToGig();
												}}
											>
												Apply
											</BaseButton>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{openComment && (
				<Modal
					open={openComment}
					handleClose={() => setOpenComment(false)}
					maxWidth={400}
				>
					<form
						className="py-4 h-full flex flex-col"
						style={{ maxWidth: 500, width: "100%" }}
						// onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex-1 md:flex md:justify-center md:items-center">
							<div>
								<p className={`text-primary text-3xl font-bold`}>
									Additional Comments
								</p>
								<p className="text-xs text-gray-500 mb-4">
									Write down detailed history of your experience and why the
									client should pick you
								</p>

								<div className="mb-2">
									<BaseTextArea
										label="Comment"
										placeholder="I am a ..."
										onChange={(e) => setCommments(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div>
							<BaseButton
								type="button"
								onClick={() => {
									setOpenComment(false);
									setOpenReview(true);
								}}
							>
								Next
							</BaseButton>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
}

GigComponent.propTypes = {
	gig: PropTypes.object,
	refetch: PropTypes.func,
};
