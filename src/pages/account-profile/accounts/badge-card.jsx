import { ProgressBar } from "../../../component/admin/progress-bar";
import { StarIcon } from "../../../assets/admin/star-icon";

export function BadgeCard() {
	return (
		<div className="p-4 py-12 border bg- rounded-lg w-full bg-[#4440FF] flex items-center justify-between gap-4 relative">
			<span className="absolute -top-4 bg-[#FFBE16] p-2 text-xs font-bold rounded-lg z-10">
				Role Model
			</span>
			<div className="py-0.5">
				<p className="text-sm text-[#FFBE16] font-semibold">Jobs Pro</p>
				<p className="text-sm font-extralight text-white">Badge of honour</p>
			</div>
			<div>
				<p className="text-sm font-bold text-white">56 Gigs completed</p>
				<div className="w-12">
					<ProgressBar color="#95FF0F" />
				</div>
			</div>
			<div className="flex gap-1 text-white">
				4.8 <StarIcon filled />
			</div>
		</div>
	);
}
