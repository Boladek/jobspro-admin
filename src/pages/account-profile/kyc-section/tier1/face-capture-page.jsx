import PropTypes from "prop-types";
import face from "../../../../assets/face.svg";
import { FaceCapture } from "./face-capture";
import { useState } from "react";
import { HappyIcon } from "../../../../assets/happyemoji";
import { BulbIcon } from "../../../../assets/bulb-icon";
import { GlassIcon } from "../../../../assets/glass";

export function FaceCapturePage({ gotoNextPage, bvn, goBack }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="max-w-[400px] w-full">
			<div className="flex justify-end">
				<span
					onClick={goBack}
					className="hover:underline text-gray-500 text-sm capitalize cursor-pointer"
				>
					back
				</span>
			</div>
			<div className="mb-4">
				<p className="text-primary font-bold">Face Capture</p>
				<p className="text-xs text-gray-500">
					Your face needs to be verified against your BVN information. Please
					follow the guidelines below to ensure proper capture
				</p>
			</div>
			<div
				onClick={() => setOpen(true)}
				className="mx-auto flex justify-center items-center mb-2 bg-[#4440FF] w-fit py-8 px-4 rounded-full"
			>
				<img src={face} alt="Tick Icon" className="h-32" />
			</div>
			<p className="text-[#667085] text-sm text-center font-bold hover:underline cursor-pointer" onClick={() => setOpen(true)}>
				Click to capture
			</p>

			<div className="mb-6 mt-4">
				<p className="font-bold text-center mb-4">Tips</p>
				<div className="flex gap-2 items-center mb-2">
					<span className="p-2 bg-light rounded-full">
						<BulbIcon />
					</span>
					<p className="text-xs text-gray-500">
						Stay in a brightly lit environment
					</p>
				</div>
				<div className="flex gap-2 items-center mb-2">
					<span className="p-2 bg-light rounded-full">
						<GlassIcon />
					</span>
					<p className="text-xs text-gray-500">
						Remove glasses, hats hijabs face masks or any other face coverings
					</p>
				</div>
				<div className="flex gap-2 items-center">
					<span className="p-2 bg-light rounded-full">
						<HappyIcon />
					</span>
					<p className="text-xs text-gray-500">
						Neutral - don’t smile, keep your mouth closed
					</p>
				</div>
			</div>

			{open && (
				<FaceCapture
					open={open}
					handleClose={() => setOpen(false)}
					action={gotoNextPage}
					bvn={bvn}
				/>
			)}
		</div>
	);
}
//
FaceCapturePage.propTypes = {
	gotoNextPage: PropTypes.func,
	bvn: PropTypes.string,
	goBack: PropTypes.func,
};
