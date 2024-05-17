import { StatsCard } from "./stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import proStats from "../../../assets/admin/pro-stats-bg.png";
import { GrowthCard } from "./growth-card";

export function StatsSummary() {
	return (
		<div className="flex gap-3 min-w-md overflow-x-auto">
			<div className="flex-1">
				<StatsCard
					bg={jobsBg}
					percent={40}
					value={400}
					title="Jobs"
					subTitle="Posted"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={businessStats}
					bgColor="#0030DC"
					percent={60}
					value={500}
					title="Pro"
					subTitle="Users"
				/>
			</div>
			<div className="flex-1">
				<StatsCard
					bg={proStats}
					bgColor="#1A68FF"
					percent={90}
					value={1000}
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
