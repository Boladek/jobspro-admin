import PropTypes from "prop-types";
import face from "../../../../assets/face-capture.png";
import { BaseButton } from "../../../../component/button";
import { FaceCapture } from "./face-capture";
import { useState } from "react";
import { HappyIcon } from "../../../../assets/happyemoji";
import { BulbIcon } from "../../../../assets/bulb-icon";
import { GlassIcon } from "../../../../assets/glass";

export function Step4({ gotoNextPage, bvn }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="max-w-[400px] w-full">
			<div className="text-center mb-8 mt-8">
				<p className="text-primary text-2xl font-bold">Face Capture</p>
				<p className="text-xs text-gray-500">
					Your face needs to be verified against your BVN information. Please
					follow the guidelines below to ensure proper capture
				</p>
			</div>
			<div className="flex justify-center items-center mb-6">
				<img src={face} alt="Tick Icon" className="h-32" />
			</div>

			<div className="mb-6">
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
			<div>
				<div>
					<BaseButton onClick={() => setOpen(true)}>Continue</BaseButton>
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
Step4.propTypes = {
	gotoNextPage: PropTypes.func,
	bvn: PropTypes.string,
};
