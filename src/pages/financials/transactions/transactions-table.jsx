import { formatDate, generateArray } from "../../../helpers/function";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { Calendar } from "../../admin/landing-page/calendar";
import { DateHook } from "../../../hooks/date-hook";
import { LabelBox } from "../../../component/label-box";

export function TransactionsTable() {
  const { startDate, endDate, setEndDate, setStartDate } = DateHook();
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <LabelBox label="Inflow" value={4} color="#0FFF9A" />
          <LabelBox label="Outflow" value={3} color="#FFDE16" />
          <LabelBox
            label="Dispute"
            value={3}
            color="#FF5C00"
            textColor="#FFFFFF"
          />
        </div>
        <div className="flex-1">
          <input
            className="w-full border rounded-[10px] p-3 px-4 text-[12px] border-gray-100 bg-gray-50"
            placeholder="Search by name"
          />
        </div>
        <div>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            handleStartDate={(val) => setStartDate(val)}
            handleEndDate={(val) => setEndDate(val)}
          />
        </div>
      </div>
      <div className="overflow-x-auto max-h-[350px] min-h-[100px]">
        <table className="min-w-full table-auto text-xs">
          <thead className="sticky top-0 text-white bg-[#1C274C]">
            <tr className="text-[12px] font-[300]">
              <th className="px-4 py-4 text-left"></th>
              <th className="px-4 py-4 text-left">Job</th>
              <th className="px-4 py-4 text-left">Transferred by</th>
              <th className="px-4 py-4 text-left">Received by</th>
              <th className="px-4 py-4 text-left">Transaction ID</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {generateArray(6).map((_, index) => (
              <tr key={Math.random()} className="hover:bg-gray-200">
                <td className="p-4 text-[10px] md:text-[12px]">
                  {index % 2 === 0 ? (
                    <IoArrowForwardCircleSharp className="text-xl text-red-500" />
                  ) : (
                    <IoArrowBackCircleSharp className="text-xl text-green-500" />
                  )}
                </td>
                <td className="p-4 text-[10px] md:text-[12px]">
                  Plumbing fixing
                </td>
                <td className="p-4 text-[10px] md:text-[12px]">
                  Finclusion Ng
                </td>
                <td className="p-4 text-[10px] md:text-[12px]">
                  6953144823456879
                </td>
                <td className="p-4 text-[10px] md:text-[12px]">20,000</td>
                <td className="p-4 text-[10px] md:text-[12px]">
                  Gig Completed
                </td>
                <td className="p-4 text-[10px] md:text-[12px]">
                  {formatDate(new Date())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
