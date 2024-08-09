import { StatsCard } from "./stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import proStats from "../../../assets/admin/pro-stats-bg.png";
import { GrowthCard } from "./growth-card";
import { UseAdminDashboardContext } from "../../../context/admin-dashboard-context";

export function LogsStatsSummary() {
	const { dashboardLogs } = UseAdminDashboardContext();
	return (
		<div className="flex gap-3 min-w-md overflow-x-auto">
			<div className="flex-1">
				<StatsCard
					bg={jobsBg}
					percent={dashboardLogs?.percentageUsersLoggedInToday}
					value={dashboardLogs?.totalLoggedInUsers}
					title="Logged"
					subTitle="In"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={businessStats}
					bgColor="#0030DC"
					percent={60}
					value={dashboardLogs?.walletTransactionsToday}
					title="Wallet"
					subTitle="Transactions"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={proStats}
					bgColor="#1A68FF"
					percent={90}
					value={dashboardLogs?.disputedGigsToday}
					title="Dispute"
					subTitle="Filed"
				/>
			</div>
			<div>
				<GrowthCard />
			</div>
		</div>
	);
}
