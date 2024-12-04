import { StatsCard } from "./stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import proStats from "../../../assets/admin/pro-stats-bg.png";
import { GrowthCard } from "./growth-card";
import { LogsHook } from "../../../hooks/logs-hook";
import { useMemo } from "react";
import { isEmpty } from "../../../helpers/function";

export function LogsStatsSummary() {
  const { logsStats, gettingLogsStats } = LogsHook();

  const walletPercent = useMemo(() => {
    if (!isEmpty(logsStats)) {
      return (
        (logsStats.walletTransactionsToday /
          logsStats.totalWalletTransactions) *
        100
      );
    }
    return 0;
  }, [logsStats]);

  const disputePercent = useMemo(() => {
    if (!isEmpty(logsStats)) {
      return (logsStats.disputedGigsToday / logsStats.totalDisputedGigs) * 100;
    }
    return 0;
  }, [logsStats]);

  return (
    <div className="flex gap-3 min-w-md overflow-x-auto">
      <div className="flex-1">
        <StatsCard
          bg={jobsBg}
          percent={logsStats?.percentageUsersLoggedInToday}
          value={logsStats?.totalLoggedInUsers}
          title="Logged"
          subTitle="In"
          loading={gettingLogsStats}
        />
      </div>
      <div className="flex-1">
        <StatsCard
          bg={businessStats}
          bgColor="#0030DC"
          loading={gettingLogsStats}
          percent={walletPercent}
          value={logsStats?.walletTransactionsToday}
          title="Wallet"
          subTitle="Transactions"
        />
      </div>
      <div className="flex-1">
        <StatsCard
          bg={proStats}
          bgColor="#1A68FF"
          percent={disputePercent}
          loading={gettingLogsStats}
          value={logsStats?.disputedGigsToday}
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
