import { ProgressBar } from "../../../component/admin/progress-bar";
import { StarIcon } from "../../../assets/admin/star-icon";
import { formatNumber } from "../../../helpers/function";
import { UseDashboard } from "../../../context/dashboard-context";

export function BadgeCard() {
	const { dashboardStats } = UseDashboard();

	return (
		<div
			className="p-4 py-12 bg- rounded-lg w-full bg-[#4440FF] flex items-center justify-between gap-4 relative overflow-visible min-w-96"
			style={{ overflow: "visible !important" }}
		>
			<div className="py-0.5">
				<p className="text-sm text-[#FFBE16] font-semibold">Jobs Pro</p>
				<p className="text-sm font-extralight text-white">Badge of honour</p>
			</div>
			<div>
				<p className="text-sm font-bold text-white">
					{formatNumber(dashboardStats?.numberOfGigsCompleted)} Gigs completed
				</p>
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
