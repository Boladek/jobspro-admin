import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { UseFinancialContext } from "../../../../../context/financial-statement-context";
import { FaCalendarAlt } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { RevenueBarChart } from "./revenue-bar-chart";
import { RevenueGenerated } from "./revenue-generated";
import { BusinessExpenditure } from "./business-expenditure";

export function FinancialStatement() {
  const {
    tabs,
    activeTab,
    handleTab,
    months,
    handleMonth,
    currentMonth,
    quarters,
    halves,
    currentHalf,
    currentQuarter,
    handleQuarter,
    handleHalf,
  } = UseFinancialContext();
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex gap-4">
        <div className="text-adminPrimary">
          <div className="flex items-center gap-2">
            <div className="text-xl/3 font-bold">Jobs Pro</div>
            <div className="w-[30px]">
              <ProgressBar color="#0FFF9A" thickness={1.2} />
            </div>
          </div>
          <div className="text-2xl font-extralight">Financial Statement</div>
        </div>
        <div className="flex-1">
          <div className="flex bg-[#664DFF] rounded-md w-fit items-center">
            <div className="flex gap-2 items-start">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  className={`px-8 py-2 capitalize text-sm cursor-pointer transition-all ease-linear 300s ${
                    activeTab === tab
                      ? "text-white font-semibold"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="w-10">
                      <ProgressBar color="#FEDF00" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-white flex gap-2 items-center px-4">
              <FaCalendarAlt />
              <span className="text-sm">Year</span>
              <TiArrowSortedDown />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        {activeTab === tabs[0] && (
          <div className="flex w-full items-center">
            <div className="w-20 text-sm font-bold text-gray-500">Month</div>
            <div className="flex-1 flex justify-between overflow-auto gap-4">
              {months.map((month) => (
                <div
                  key={month}
                  className={`py-2 px-4 flex-1 text-center text-xs rounded-lg cursor-pointer ${
                    currentMonth === month
                      ? "bg-[#FFDE16] text-[#025949] font-semibold"
                      : ""
                  }`}
                  onClick={() => handleMonth(month)}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === tabs[1] && (
          <div className="flex w-full gap-4 items-center">
            <div className="w-36 text-sm font-bold text-gray-500">Quarters</div>
            <div className="flex-1 flex gap-4">
              {quarters.map((quarter) => (
                <div
                  key={quarter}
                  className={`py-2 px-4 text-center text-xs rounded-lg cursor-pointer capitalize ${
                    currentQuarter === quarter
                      ? "bg-[#FFDE16] text-[#025949] font-semibold"
                      : ""
                  }`}
                  onClick={() => handleQuarter(quarter)}
                >
                  {quarter}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === tabs[2] && (
          <div className="flex w-full gap-4 items-center">
            <div className="w-36 text-sm font-bold text-gray-500">
              Bi-Annually
            </div>
            <div className="flex-1 flex gap-4">
              {halves.map((half) => (
                <div
                  key={half}
                  className={`py-2 px-4 text-center text-xs rounded-lg cursor-pointer capitalize ${
                    currentHalf === half
                      ? "bg-[#FFDE16] text-[#025949] font-semibold"
                      : ""
                  }`}
                  onClick={() => handleHalf(half)}
                >
                  {half}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <RevenueGenerated />
        </div>
        <div>{/* <RevenueBarChart /> */}</div>
        <div className="sm:col-span-2">
          <BusinessExpenditure />
        </div>
      </div>
    </div>
  );
}
