import { ProgressBar } from "../../../component/admin/progress-bar";
import { formatDate } from "../../../helpers/function";
import { FaEllipsisVertical } from "react-icons/fa6";

export function CommissionsCard() {
  return (
    <div className="border p-4 border-[#3677FF] rounded-[6px] col-span-1 grid grid-cols-1 gap-4">
      <div className="w-full flex justify-between">
        <div>
          <p className="text-[8px] font-[300]">Fee | Commission</p>
          <p className="text-[12px] font-[600] text-[#126FB5]">12500 - 12500</p>
          <div className="w-[25px]">
            <ProgressBar color="#FFDE16" percent={100} />
          </div>
        </div>
        <div className="">
          <div className="flex justify-end">
            <FaEllipsisVertical className="text-[#565353] text-xs" />
          </div>
          <div className="text-[8px]">{formatDate(new Date())}</div>
        </div>
      </div>
      <div className="w-full flex justify-between gap-2">
        <div>
          <p className="text-[8px] text-gray-500 font-[200]">Category</p>
          <p className="text-[10px] font-[700] text-[#1C4486]">
            Enterntainment
          </p>
        </div>
        <div>
          <p className="text-[8px] text-gray-500 font-[200]">Sub Category</p>
          <p className="text-[10px] font-[700] text-[#1C4486]">
            Sound Engineer ,
          </p>
        </div>
        <div>
          <p className="text-[8px] text-gray-500 font-[200]">Location</p>
          <p className="text-[10px] font-[700] text-[#1C4486]">
            Lagos, Nigeria
          </p>
        </div>
        <div>
          <p className="text-[8px] text-gray-500 font-[200]">Tier</p>
          <p className="text-[10px] font-[700] text-[#1C4486]">1</p>
        </div>
      </div>
    </div>
  );
}
