import { Calendar } from "./calendar";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { generateArray } from "../../../helpers/function";
import { LogsStatsSummary } from "./logs-stats-summary";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile-avatar.png";
import { DateHook } from "../../../hooks/date-hook";

export function DashboardLogsPage() {
  const navigate = useNavigate();
  const { startDate, endDate, setStartDate, setEndDate } = DateHook();

  return (
    <div>
      <div className="mb-4 w-full overflow-x-auto">
        <LogsStatsSummary />
      </div>
      <div className="w-full gap-2">
        <div className="flex gap-4 items-center mb-4 text-xs">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Back
          </span>
          <div className="px-3 py-1 rounded-full font-semibold text-[#025949] bg-[#FFDE16]">
            Users
          </div>
          <div className="flex gap-2 items-center text-xs">
            <label htmlFor="filter">Filter By:</label>
            <select
              id="filter"
              className="rounded-full py-1 px-2 text-xs border-gray-300"
            >
              <option>Activity</option>
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
          <div className="w-64">
            <input
              placeholder="Search"
              className="p-3 bg-black/5 rounded-md w-full"
            />
          </div>
        </div>
        <div>
          <table className="hidden md:table w-full">
            <thead className="bg-adminPrimary/20 shadow-sm rounded-md">
              <tr>
                <th className="py-4 px-2 text-sm text-left font-bold">Name</th>
                <th className="py-4 px-2 text-sm text-left font-bold">
                  Activity
                </th>
                <th className="py-4 px-2 text-sm text-left font-bold">Type</th>
                <th className="py-4 px-2 text-sm text-left font-bold">
                  Timestamp
                </th>

                <th className="py-4 px-2 text-sm text-left font-bold">
                  Description
                </th>
                <th className="py-4 px-2 text-sm text-left font-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="rounded-xl font-semibold">
              {generateArray(5).map(() => (
                <tr
                  key={Math.random()}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="py-2 px-2 text-xs text-left">
                    <div className="flex gap-1 items-center">
                      <img
                        src={avatar}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-adminPrimary">
                          Company Name
                        </p>
                        <p style={{ fontSize: ".5rem" }}>#876987687689Alkhj</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-xs text-left">
                    Wallet Transaction
                  </td>
                  <td className="py-2 px-2 text-xs text-left">Credit</td>
                  <td className="py-2 px-2 text-xs text-left">
                    24 June, 2024 - 05 : 20
                  </td>
                  <td className="text-xs">
                    Received NGN 14000 from ABC Transport limited
                  </td>
                  <td className="py-2 px-2 text-xs text-left capitalize">
                    {/* {gig.statusType} */}
                    Successful
                    <ProgressBar color="#0FFF9A" thickness={1.2} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
