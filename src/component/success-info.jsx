import { string } from "prop-types";
// import shield from "../assets/shield.svg";
import { ProgressBar } from "./admin/progress-bar";

export function SuccessInfo({ message = "" }) {
	return (
		<div className="flex flex-col gap-2 items-center">
			<div className="py-2 rounded-md bg-[#FFDE16] text-[#025949] w-36 font-bold text-xs text-center">
				Jobs Pro
			</div>
			{/* <img src={shield} alt="Shield" className="w-28" /> */}
			<p className="text-[#025949] font-bold">{message}</p>
			<div className="w-32">
				<ProgressBar thickness={3} percent={100} color="#14FF9C" />
			</div>
		</div>
	);
}

SuccessInfo.propTypes = {
	message: string,
};
