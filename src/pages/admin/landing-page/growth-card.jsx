import chart from "../../../assets/admin/chart.png";
import { IncreaseIcon } from "../../../assets/admin/increase-icon.jsx";
import { UseAdminDashboardContext } from "../../../context/admin-dashboard-context.jsx";
import { formatDate, formatNumber } from "../../../helpers/function";

export function GrowthCard() {
  const { growthStats } = UseAdminDashboardContext();

  return (
    <div
      className="bg-cover bg-center h-[120px] w-[215px] rounded-xl flex flex-col"
      style={{
        border: "0.5px solid #1C4486",
      }}
    >
      <div
        className="p-2 flex justify-between items-center text-tiny"
        style={{
          borderBottom: "0.5px solid #1C4486",
        }}
      >
        <span className="font-extralight">Growth Check</span>
        <span className="py-1 px-2 bg-[#E5EEFF] rounded-full text-[#1A68FF] font-semibold">
          Globally
        </span>
      </div>
      <div className="flex-1 p-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div>
              <img src={chart} alt="Chart" className="h-10" />{" "}
            </div>
            <div>
              <div className="text-lg text-[#1C4486] font-semibold">
                {formatNumber(growthStats?.usersAdded || 0)}
              </div>
              <div className="text-tiny text-[#667085]">User(s) added</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            {growthStats?.usersAdded && <IncreaseIcon />}
            <span className="text-xs text-[#00DE74]">
              {formatNumber(growthStats?.percentageUsersToday || 0, 2)}%
            </span>
          </div>
        </div>
        <div className="text-[#667085] font-light text-[10px] py-2">
          {formatDate(new Date())}
        </div>
      </div>
    </div>
  );
}
