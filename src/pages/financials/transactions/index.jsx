import { StatsCard } from "../../admin/landing-page/stats-card";
import jobsBg from "../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../assets/admin/business-stats-bg.png";
import { TransactionsTable } from "./transactions-table";

export function TransactionsPage() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="text-[#1A68FF]">
        <p className="text-[25px] font-[700]">Jobs Pro</p>
        <p className="text-[25px] leading-[4px] font-[300]">Transactions</p>
      </div>
      <div className="flex gap-3 min-w-md overflow-x-auto">
        <div className="flex-1 max-w-[350px]">
          <StatsCard
            loading={false}
            bg={jobsBg}
            percent={100}
            value={100}
            title="Wallet"
            subTitle="Balance"
            showIncrease={false}
          />
        </div>
        <div className="flex-1 max-w-[350px]">
          <StatsCard
            loading={false}
            bg={businessStats}
            bgColor="#0030DC"
            percent={100}
            value={100}
            title="Withdrawal"
            showIncrease={false}
          />
        </div>
      </div>
      <div>
        <TransactionsTable />
      </div>
    </div>
  );
}
