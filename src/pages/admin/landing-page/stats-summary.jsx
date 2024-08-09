import { StatsCard } from "./stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import proStats from "../../../assets/admin/pro-stats-bg.png";
import { GrowthCard } from "./growth-card";
import { UseAdminDashboardContext } from "../../../context/admin-dashboard-context";

export function StatsSummary() {
	const { dashboardStats } = UseAdminDashboardContext();

	return (
		<div className="flex gap-3 min-w-md overflow-x-auto">
			<div className="flex-1">
				<StatsCard
					bg={jobsBg}
					percent={dashboardStats?.percentageGigsToday}
					value={dashboardStats?.totalGigs}
					title="Jobs"
					subTitle="Posted"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={businessStats}
					bgColor="#0030DC"
					percent={dashboardStats?.percentageProsToday}
					value={dashboardStats?.prosJoinedToday}
					title="Pro"
					subTitle="Users"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={proStats}
					bgColor="#1A68FF"
					percent={dashboardStats?.percentageBusinessesToday}
					value={dashboardStats?.businessesJoinedToday}
					title="Businesses"
					subTitle="Onboarded"
				/>
			</div>
			<div>
				<GrowthCard />
			</div>
		</div>
	);
}
