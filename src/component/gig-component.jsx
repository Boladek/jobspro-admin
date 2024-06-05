import React, { useState } from "react";
// import { DislikeIcon } from "../assets/dislike-icon";
import { BiDislike } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { BaseButton } from "./button";
import { formatDate, formatNumber } from "../helpers/function";
import { Modal } from "./modal";
import { BaseTextArea } from "./text-area";

// import { IoIosHeart } from "react-icons/io";

export function GigComponent() {
	const [open, setOpen] = useState(false);
	const [openComment, setOpenComment] = useState(false);
	const [comment] = useState("");

	return (
		<>
			<div className="bg-white p-3 rounded-xl" onClick={() => setOpen(true)}>
				<div className="flex justify-between mb-2 items-center">
					<div className="p-3 text-xs text-gray-600 border rounded-full">
						Posted 3hr ago
					</div>
					<div className="flex gap-2 items-end">
						<span>
							<IoIosHeartEmpty size={24} color="red" />
						</span>
						<span>
							<BiDislike size={24} />
						</span>
					</div>
				</div>
				<hr />
				<div className="pt-2">
					<p className="font-bold mb-2 text-base">
						Need servers for a birthday party{" "}
					</p>
					<p className="font-extralight text-xs mb-2">
						We are seeking a highly skilled UI/UX Designer with expertise in
						Figma to join our team as a Template Editing and Maintenance
						Specialist.{" "}
					</p>
					<div className="flex gap-2 items-center flex-wrap mb-2">
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-sm">8Hrs(9am-5pm WAT)</p>
							<p className="text-xs font-light text-gray-500">Duration</p>
						</div>
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-sm">8Hrs(9am-5pm WAT)</p>
							<p className="text-xs font-light text-gray-500">Duration</p>
						</div>
						<div className="p-2 rounded-lg border">
							<p className="font-semibold text-sm">8Hrs(9am-5pm WAT)</p>
							<p className="text-xs font-light text-gray-500">Duration</p>
						</div>
					</div>
					<div className="flex gap-1 items-center mb-2">
						<span className="text-xs text-gray-500 font-semibold">Budget</span>
						<span className="font-bold">N20,000</span>
					</div>
					<div className="flex gap-2 flex-wrap">
						{["Total", "Next", "View"].map((item) => (
							<span
								key={item}
								className="text-xs p-2 border rounded-full bg-light"
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</div>
			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
					style={{
						zIndex: 20,
					}}
				>
					<div className="bg-white p-2 w-full max-w-lg flex flex-col">
						<div className="flex justify-end">
							<span
								className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
								onClick={() => setOpen(false)}
							>
								&times;
							</span>
						</div>
						{
							<div className="p-2 flex-1 min-h-96 overflow-y-auto">
								<div className="mx-auto w-full max-w-lg px-4">
									<div className="flex justify-between items-center mb-4">
										<p className="text-xs font-bold text-gray-400">
											Posted 3 hours ago
										</p>
										<span>
											<IoIosHeartEmpty size={24} color="red" />
										</span>
									</div>
									<div>
										<p className="text-primary font-bold mb-2">
											Need servers for a birthday party
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
													N{formatNumber(10000)}
												</span>
												<span className="text-xs text-gray-300">PER DAY</span>
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
											<p className="text-sm font-bold">8hrs</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Time range</p>
											<p className="text-sm font-bold">
												9:00am - 4:00pm(GMT+1)
											</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Date</p>
											<p className="text-sm font-bold">
												{formatDate(new Date())}
											</p>
										</div>
										<hr />
										<div className="my-2">
											<p className="text-xs text-gray-500 mb-2">Description</p>
											<p className="text-xs">
												This brief is to create posts under the "Summer Trends"
												concept. The theme is Mixing Metals and the images show
												how different items made of different metals can be
												mixed.   Use the images with the model together with the
												product shots, which should be placed on the blue
												background, to create exciting, dynamic and eyecatching
												posts and stories.
											</p>
										</div>
										<hr />
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
										</div>
										<hr />
										<div className="my-2 border rounded-lg p-2">
											<p className="text-xs text-gray-500 mb-2">Dress code</p>
											<ul className="mb-4 list-disc pl-3">
												<li className="text-xs">
													The theme is Mixing Metals and the images show how
													different items made of different metals can be mixed.
												</li>
												<li className="text-xs">
													Use the images with the model together with the
													product shots, which should be placed on the blue
													background, to create exciting.
												</li>
											</ul>
										</div>
										<hr />
										<div className="my-2 border rounded-lg p-2">
											<p className="text-xs text-gray-500 mb-2">
												Additional Instructions
											</p>
											<ul className="mb-4 list-disc pl-3">
												<li className="text-xs">
													The theme is Mixing Metals and the images show how
													different items made of different metals can be mixed.
												</li>
												<li className="text-xs">
													Use the images with the model together with the
													product shots, which should be placed on the blue
													background, to create exciting.
												</li>
											</ul>
										</div>
									</div>
									<div className="mt-3">
										<BaseButton onClick={() => setOpenComment(true)}>
											Proceed
										</BaseButton>
									</div>
								</div>
							</div>
						}
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
									<BaseTextArea label="Comment" placeholder="I am a ..." />
								</div>
							</div>
						</div>

						<div>
							<BaseButton type="button" onClick={() => setOpenComment(false)}>
								Next
							</BaseButton>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
}
