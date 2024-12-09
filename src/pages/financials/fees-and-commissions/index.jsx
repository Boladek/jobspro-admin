import { BsFillGridFill, BsList, BsPlus } from "react-icons/bs";
import { generateArray } from "../../../helpers/function";
import { CommissionsCard } from "./commissions-card";
import { CreateCommissions } from "./create-commission";
import { useState } from "react";

export function FeesAndCommissionsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center flex-1">
          <span className="bg-[#FFDE16] px-6 py-2 rounded-lg text-xs font-bold text-[#025949]">
            Global View
          </span>
          <input
            type="text"
            className="p-3 border border-[#D3D3D3] rounded-[10px] text-xs w-full max-w-[400px] bg-[#FBFBFB]"
            placeholder="Search by name"
          />
          <div className="flex items-center gap-1 p-2 bg-gray-50 text-xl rounded-sm">
            <BsFillGridFill className="cursor-pointer" />
            | <BsList className="cursor-pointer" />
          </div>
        </div>
        <button className="h-[30px] w-[30px] bg-black rounded-full text-white text-md flex items-center justify-center" onClick={() => setOpen(true)}>
          <BsPlus />
        </button>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-4 py-4">
        {generateArray(10).map(() => (
          <CommissionsCard key={Math.random()} />
        ))}
      </div>

      {open && <CreateCommissions handleClose={() => setOpen(false)} />}
    </div>
  );
}
