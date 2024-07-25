import { useState } from "react";
import PropTypes from "prop-types";
// import { GrAttachment } from "react-icons/gr";
// import { IoSendSharp } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { formatDate } from "../../../../helpers/function";
import { UploadFile } from "../pro/upload-file";
import { UseAuth } from "../../../../context/auth-context";
import envelope from "../../../../assets/envelope.svg";
import { ProgressBar } from "../../../../component/admin/progress-bar";

export function GigDispute({ gig }) {
	const { name } = UseAuth();
	const [open, setOpen] = useState(false);
	return (
		<div
			className="p-2 px-4 md:px-8 max-w-xl mx-auto flex flex-col border"
			style={{ height: "75vh" }}
		>
			<div className="p-2 rounded-md bg-adminPrimary/20 flex gap-2 items-center">
				<TbPinFilled className="text-xl" />
				<div className="flex-1 md:flex justify-between text-tiny">
					<div className="flex gap-1">
						<span>Dispute Cause -</span>
						<span className="font-bold">No payment</span>
					</div>
					<div className="flex gap-1">
						<span>Dispute By -</span>
						<span className="font-bold">{name}</span>
					</div>
					<div className="hidden md:flex gap-1">
						<span>Date</span>
						<span className="font-bold">{formatDate(new Date())}</span>
					</div>
				</div>
			</div>
			<div className="my-2 flex justify-center">
				<img src={envelope} className="h-20" />
			</div>
			<div className="text-xs p-4 rounded-lg border border-[#126FB5] bg-[#F2FAFF] mb-4">
				Dear {name}, thank you for filling this dispute, find below our next
				cause of action.
			</div>
			<div className="text-xs p-4 rounded-lg border border-[#126FB5] bg-[#F2FAFF] mb-4">
				An email has been sent to john@gmail.com and the respective parties
				involved in this dispute, please refer to your mail box to continue the
				resolution of this dispute. Jobspro will act and respond in adherence to
				our strict guidelines concerning disputes, and we ensure that both
				parties will receive unbiased resolutions
			</div>
			<div>
				<p className="text-primary text-sm font-semibold">Dispute Status</p>
				<div className="p-4 rounded-md bg-primary flex justify-between items-center text-xs text-white">
					<div>Undergoing review</div>
					<div className="w-16">
						<ProgressBar color="#FEDF00" />
					</div>
					<div>{formatDate(new Date())}</div>
				</div>
			</div>
			{/* <div>
				<div className="">Dispute ID</div>
			</div> */}

			{/* <div className="py-2 flex-1 overflow-y-auto"></div>
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
			</div> */}

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

GigDispute.propTypes = {
	gig: PropTypes.object,
};
