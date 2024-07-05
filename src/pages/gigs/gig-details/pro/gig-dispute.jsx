import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { formatDate, generateArray } from "../../../../helpers/function";
import { UploadFile } from "./upload-file";
import { UseAuth } from "../../../../context/auth-context";

export function GigDispute() {
	const { name } = UseAuth();
	const [open, setOpen] = useState(false);
	return (
		<div
			className="p-2 max-w-xl mx-auto flex flex-col h-full"
			style={{ height: "70vh" }}
		>
			<div className="p-2 rounded-md bg-adminPrimary/20 flex gap-2 items-center">
				<TbPinFilled className="text-xl" />
				<div className="flex-1 md:flex justify-between text-xs">
					<div className="flex gap-1">
						<span>Dispute Cause -</span>
						<span className="font-bold">No payment</span>
					</div>
					<div className="flex gap-1">
						<span>Dispute By -</span>
						<span className="font-bold">John Duroola</span>
					</div>
					<div className="hidden md:flex gap-1">
						<span>Date</span>
						<span className="font-bold">{formatDate(new Date())}</span>
					</div>
				</div>
			</div>
			<div className="py-2 flex-1 overflow-y-auto">
				{generateArray(20).map((_, index) => (
					<div
						key={index}
						className={`${index % 2 === 0 ? "mr-auto" : "ml-auto"} w-fit py-2`}
						style={{ maxWidth: "80%" }}
					>
						<div
							className={`${
								index % 2 === 0 ? "flex-row-reverse" : ""
							} flex w-full gap-2 items-center text-xs mb-1`}
						>
							<div>time</div>
							<div className="bg-gray-300 flex-1" style={{ height: "1px" }} />
							<span className="font-bold">
								{index % 2 === 0 ? "Other Party" : name}
							</span>
						</div>
						<div
							className={`${
								index % 2 === 0
									? "bg-[#004D7A] text-white"
									: "bg-adminPrimary/5 border"
							} w-fit text-xs p-4 rounded-2xl text-wrap`}
						>
							I sent everything Lorem ipsum dolor sit, amet consectetur
							adipisicing elit. Consequuntur maiores architecto deserunt,
						</div>
					</div>
				))}
			</div>
			<div className="p-2 border rounded-md flex items-center gap-1">
				<span onClick={() => setOpen(true)}>
					<GrAttachment className="text-2xl" />
				</span>
				<textarea
					type="text"
					className="flex-1 border-0 resize-none text-sm h-9 max-h-fit focus:outline-none focus:ring-0 focus:border-transparent"
				/>
				<button>
					<IoSendSharp className="text-2xl hover:opacity-60" />
				</button>
			</div>

			{open && (
				<UploadFile
					open={open}
					handleClose={() => setOpen(false)}
					handlePicture={() => null}
				/>
			)}
		</div>
	);
}
