import { StatsCard } from "./stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import proStats from "../../../assets/admin/pro-stats-bg.png";
import { GrowthCard } from "./growth-card";
import { DashboardHook } from "../../../hooks/dashboard-hook";

export function StatsSummary() {
    const { dashboardStats, gettingDashboardStats } = DashboardHook();

    return (
        <div className="flex gap-3 min-w-md overflow-x-auto">
            <div className="flex-1 max-w-[350px]">
                <StatsCard
                    loading={gettingDashboardStats}
                    bg={jobsBg}
                    percent={dashboardStats?.percentageGigsToday}
                    value={dashboardStats?.totalGigs}
                    title="Jobs"
                    subTitle="Posted"
                />
            </div>
            <div className="flex-1 max-w-[350px]">
                <StatsCard
                    loading={gettingDashboardStats}
                    bg={businessStats}
                    bgColor="#0030DC"
                    percent={dashboardStats?.percentageProsToday}
                    value={dashboardStats?.totalPros}
                    title="Pro"
                    subTitle="Users"
                />
            </div>
            <div className="flex-1 max-w-[350px]">
                <StatsCard
                    bg={proStats}
                    loading={gettingDashboardStats}
                    bgColor="#1A68FF"
                    percent={dashboardStats?.percentageBusinessesToday}
                    value={dashboardStats?.totalBusinesses}
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
