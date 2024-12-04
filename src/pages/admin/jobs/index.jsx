import { useState } from "react";
import { Calendar } from "../landing-page/calendar";
import { formatNumber } from "../../../helpers/function";
// import { BaseInput } from "../../../component/input";
import { JobPostedCard } from "../landing-page/job-posted-card";
import { useQuery } from "@tanstack/react-query";
import customAxios from "../../../config/customAxios";

export function JobsPage() {
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  today.setDate(0);
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date(today));

  const {
    data: jobs = [],
    // refetch,
    // isLoading,
  } = useQuery({
    queryKey: ["all-recent-jobs"],
    queryFn: () => customAxios.get("/dashboard/recent?limit=100"),
    staleTime: Infinity,
    select: (data) => data.data.data,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 items-center mb-2">
        <span className="text-sm text-gray-400">Jobs</span>
        <div className="">
          <Calendar
            startDate={startDate}
            endDate={endDate}
            handleStartDate={(val) => setStartDate(val)}
            handleEndDate={(val) => setEndDate(val)}
          />
        </div>
        <div>
          <input
            className="p-2 px-4 bg-gray-100 rounded-md border text-sm"
            placeholder="Search by title"
          />
        </div>
        <div></div>
      </div>
      <div className="p-2 bg-[#ECFFE7] rounded-lg text-xs font-bold w-fit mb-4">
        {formatNumber(12345)} posted today
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 overflow-auto">
        {jobs.map((gig) => (
          <div key={Math.random()}>
            <JobPostedCard gig={gig} />
          </div>
        ))}
      </div>
    </div>
  );
}
