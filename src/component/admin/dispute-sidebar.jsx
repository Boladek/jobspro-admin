import { SideWrapper } from "../side-wrapper";
import PropTypes from "prop-types";
import { ProgressBar } from "./progress-bar";
import { DisputeTimeline } from "./dispute-timeline";

export function DisputeSideBar({ open, handleClose }) {
	return (
		<SideWrapper open={open} handleClose={handleClose}>
			<div className="w-[550px]">
				<div className="flex gap-4 mb-4">
					<div className="w-3/5 flex gap-2 items-center">
						<div className="bg-[#1A68FF] text-white p-2 rounded-lg font-bold">
							PG
						</div>
						<div>
							<p className="text-xs font-semibold">Expert</p>
							<div className="w-5">
								<ProgressBar color="#344054" thickness={0.3} />{" "}
							</div>
							<p className="text-tiny text-gray-400">Level</p>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Job Cost</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							NGN <span className="text-xs font-semibold">200,000</span>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Commission and Tax</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							NGN <span className="text-xs font-semibold">200,000</span>
						</div>
					</div>
				</div>
				<div className="flex gap-4 mb-4">
					<div className="w-3/5">
						<p className="text-xs font-bold">
							Chief Information Security Officer for a Social Media Mobile App
						</p>
						<p className="text-tiny font-extralight">1 min ago</p>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Time Left</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							<span className="text-xs font-semibold">3 days</span>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Location</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny flex gap-2">
							<span className="text-xs font-semibold">Lagos, Nigeria</span>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-tiny font-extralight">Status</p>
					<div className="w-24">
						<ProgressBar color="red" thickness={2} percent={40} bg="#E1E1E1" />
					</div>
				</div>
				<div className="flex justify-between mb-4">
					<div>
						<p className="text-tiny">Dispute</p>
						<p className="text-xs font-semibold">Payment not made</p>
					</div>
					<div>
						<p className="text-tiny">Complainant</p>
						<p className="text-xs font-semibold">Okeke Chima</p>
					</div>
					<div>
						<p className="text-tiny">Defendant</p>
						<p className="text-xs font-semibold">GIG</p>
					</div>
					<div>
						<p className="text-tiny">Dispute ID</p>
						<p className="text-xs font-semibold">123456789</p>
					</div>
				</div>
			</div>
			<div className="px-8" style={{ height: "55vh", overflowY: "auto" }}>
				<ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
					<DisputeTimeline>
						<p className="text-tiny text-gray-400">Complainant Filling</p>
						<p className="text-xs font-bold mb-2">Okeke Chima</p>
						<div className="p-2 bg-gray-100 rounded-md text-tiny text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ab
							aliquid amet illo placeat dicta iste consectetur iusto doloribus
							consequuntur inventore sit, quidem beatae fugiat iure, nemo, odio
							voluptas expedita!
						</div>
					</DisputeTimeline>
					<DisputeTimeline>
						<p className="text-tiny text-gray-400">Supporting Document</p>
						<p className="text-xs font-bold mb-2">Okeke Chima</p>
						<div className="p-2 bg-gray-100 rounded-md text-tiny text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ab
							aliquid amet illo placeat dicta iste consectetur iusto doloribus
							consequuntur inventore sit, quidem beatae fugiat iure, nemo, odio
							voluptas expedita!
						</div>
					</DisputeTimeline>
					<DisputeTimeline>
						<p className="text-tiny text-gray-400">Supporting Document</p>
						<p className="text-xs font-bold mb-2">Okeke Chima</p>
						<div className="p-2 bg-gray-100 rounded-md text-tiny text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ab
							aliquid amet illo placeat dicta iste consectetur iusto doloribus
							consequuntur inventore sit, quidem beatae fugiat iure, nemo, odio
							voluptas expedita!
						</div>
					</DisputeTimeline>
					<DisputeTimeline>
						<p className="text-tiny text-gray-400">Supporting Document</p>
						<p className="text-xs font-bold mb-2">Okeke Chima</p>
						<div className="p-2 bg-gray-100 rounded-md text-tiny text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ab
							aliquid amet illo placeat dicta iste consectetur iusto doloribus
							consequuntur inventore sit, quidem beatae fugiat iure, nemo, odio
							voluptas expedita!
						</div>
					</DisputeTimeline>
					<DisputeTimeline>
						<p className="text-tiny text-gray-400">Supporting Document</p>
						<p className="text-xs font-bold mb-2">Okeke Chima</p>
						<div className="p-2 bg-gray-100 rounded-md text-tiny text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ab
							aliquid amet illo placeat dicta iste consectetur iusto doloribus
							consequuntur inventore sit, quidem beatae fugiat iure, nemo, odio
							voluptas expedita!
						</div>
					</DisputeTimeline>
				</ol>
			</div>
			<div className="px-8 pt-4 flex items-center">
				<div className="text-xs font-bold">Action</div>
				<div className="flex-1 flex justify-center gap-4">
					<div className="border p-2 text-xs font-bold text-[#3514FF] bg-[#E9E5FF] rounded-md cursor-pointer">
						Disburse Payment
					</div>
					<div className="border p-2 text-xs font-bold text-[#1C4486] rounded-md cursor-pointer">
						Make a comment
					</div>
					<div className="border p-2 text-xs font-bold text-[#1C4486] rounded-md cursor-pointer">
						Close Dispute
					</div>
				</div>
			</div>
		</SideWrapper>
	);
}

DisputeSideBar.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};
