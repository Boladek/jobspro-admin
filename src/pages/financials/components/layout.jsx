import { Outlet } from "react-router-dom";
import { SideBar } from "./sidebar";

export function FinancialsLayout() {
  return (
    <div className="flex h-full">
      <div className="w-[256px] p-4">
        <SideBar />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
