import { useMemo } from "react";
import { StatsSummary } from "./stats-summary";
import { JobsPosted } from "./jobs-posted";
import { PieChart } from "../../../component/pie-chart";
import { Calendar } from "./calendar";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { WalletIcon } from "../../../assets/admin/wallet-icon";
import { BarChart } from "../../../component/bar-chart";
import { JobsHook } from "../../../hooks/jobs-hook";
import { DateHook } from "../../../hooks/date-hook";

export function DashboardMainPage() {
  const { startDate, endDate, setEndDate, setStartDate } = DateHook();
  const { jobsStats } = JobsHook();

  const barChart = useMemo(() => {
    if (jobsStats.length > 0) {
      return jobsStats.map((job) => ({
        day: job.shortDay,
        posted: job.totalGigs,
        postedColor: "#F7FFD7",
        match: job.matchedGigs,
        matchColor: "#0FFF9A",
      }));
    }
    return [];
  }, [jobsStats]);

  return (
    <div>
      <div className="mb-4 w-full overflow-x-auto">
        <StatsSummary />
      </div>
      <div className="flex w-full gap-2">
        <div className="w-96">
          <JobsPosted />
        </div>
        <div className="flex-1 px-4">
          <div className="flex gap-4 items-center mb-4 text-xs">
            <div className="px-3 py-1 rounded-full font-semibold text-[#025949] bg-[#FFDE16]">
              Demography
            </div>
            <div className="flex gap-2 items-center text-xs">
              <label htmlFor="filter">Filter By:</label>
              <select
                id="filter"
                className="rounded-full py-1 px-2 text-xs border-gray-300"
              >
                <option>Country</option>
                <option>State</option>
              </select>
            </div>
            <div className="">
              <Calendar
                startDate={startDate}
                endDate={endDate}
                handleStartDate={(val) => setStartDate(val)}
                handleEndDate={(val) => setEndDate(val)}
              />
            </div>
          </div>
          <div className="w-full flex gap-2 justify-between mb-4">
            <div>
              <PieChart
                width={200}
                height={200}
                textCenter="Pro"
                innerRadius={0.6}
                textStyle={{ fontSize: "1.5rem", color: "rgba(0,0,0,.3)" }}
              />
            </div>
            <div>
              <PieChart
                width={200}
                height={200}
                textCenter="Business"
                innerRadius={0.6}
                textStyle={{ fontSize: "1.5rem", color: "rgba(0,0,0,.3)" }}
              />
            </div>
            <div className="w-1/3">
              <div className="flex gap-4 w-full items-center mb-4">
                <span
                  className="p-4 flex justify-center items-center rounded-full"
                  style={{ background: "#C0FFE0" }}
                >
                  <WalletIcon fill="#57FFAE" />
                </span>
                <div className="flex-1">
                  <div className="mb-2 font-bold text-xs">
                    <span className="bg-[#E8F8FF] text-xs px-4 py-0.5 rounded-full text-[#667085]">
                      Lagos
                    </span>{" "}
                    2K
                  </div>
                  <ProgressBar percent={100} color="#57FFAE" thickness={3} />
                </div>
              </div>
              <div className="flex gap-4 w-full items-center mb-4">
                <span
                  className="p-4 flex justify-center items-center rounded-full"
                  style={{ background: "#C0FFE0" }}
                >
                  <WalletIcon fill="#57FFAE" />
                </span>
                <div className="flex-1">
                  <div className="mb-2 font-bold text-xs">
                    <span className="bg-[#E8F8FF] text-xs px-4 py-0.5 rounded-full text-[#667085]">
                      Lagos
                    </span>{" "}
                    2K
                  </div>
                  <ProgressBar percent={100} color="#57FFAE" thickness={3} />
                </div>
              </div>
              <div className="flex gap-4 w-full items-center">
                <span
                  className="p-4 flex justify-center items-center rounded-full"
                  style={{ background: "#C0FFE0" }}
                >
                  <WalletIcon fill="#57FFAE" />
                </span>
                <div className="flex-1">
                  <div className="mb-2 font-bold text-xs">
                    <span className="bg-[#E8F8FF] text-xs px-4 py-0.5 rounded-full text-[#667085]">
                      Lagos
                    </span>{" "}
                    2K
                  </div>
                  <ProgressBar percent={100} color="#57FFAE" thickness={3} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2/3">
              <div className="flex gap-4 items-center mb-4 text-xs">
                <div className="px-3 py-1 rounded-full font-semibold text-[#025949] bg-[#FFDE16]">
                  Jobs Graph
                </div>
                <div className="flex gap-4 items-center">
                  {[
                    { title: "Posted", color: "#F7FFD7" },
                    { title: "Match", color: "#0FFF9A" },
                  ].map((match) => (
                    <div key={match.title} className="flex gap-2 items-center">
                      <div
                        className="p-2"
                        style={{ background: match.color }}
                      />
                      <span>{match.title}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 items-center text-xs">
                  <select
                    id="filter"
                    className="rounded-sm py-1 px-2 text-xs border-gray-300"
                  >
                    <option>Country</option>
                    <option>State</option>
                  </select>
                </div>
              </div>
              <div>
                <BarChart
                  keys={["posted", "match"]}
                  data={barChart}
                  height={250}
                  width="100%"
                  indexBy="day"
                  handleColors={({ id, data }) => {
                    if (id === "posted") return data["postedColor"];
                    if (id === "match") return data["matchColor"];
                  }}
                />
              </div>
            </div>
            <div className="w-1/3 grid grid-cols-1 gap-4">
              <div className="p-4 rounded-lg border border-[#8851FF] flex gap-4 items-center">
                <div className="bg-[#8851FF] text-white p-2 text-xs rounded-md">
                  BUS
                </div>
                <div>
                  <p className="text-xs">Payouts</p>
                  <div className="flex gap-1 items-end">
                    <span className="text-tiny">NGN</span>
                    <span className="text-sm font-bold">400,000</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-[#8851FF] flex gap-4 items-center">
                <div className="bg-[#8851FF] text-white p-2 text-xs rounded-md">
                  BUS
                </div>
                <div>
                  <p className="text-xs">Withdrawals</p>
                  <div className="flex gap-1 items-end">
                    <span className="text-tiny">NGN</span>
                    <span className="text-sm font-bold">400,000</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-[#8851FF] flex gap-4 items-center">
                <div className="bg-[#8851FF] text-white p-2 text-xs rounded-md">
                  BUS
                </div>
                <div>
                  <p className="text-xs">Available Wallet Balance</p>
                  <div className="flex gap-1 items-end">
                    <span className="text-tiny">NGN</span>
                    <span className="text-sm font-bold">400,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
