import { useState } from "react";
import { Calendar } from "./calendar";
import { JobPostedCard } from "./job-posted-card";
import { formatNumber } from "../../../helpers/function";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import customAxios from "../../../config/customAxios";

export function JobsPosted() {
  const navigate = useNavigate();
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  today.setDate(0);
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date(today));

  const {
    data: recentJobs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["dashboard-recent-jobs"],
    queryFn: () => customAxios.get("/dashboard/recent"),
    staleTime: Infinity,
    select: (data) => data.data.data,
  });

  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <span className="text-sm text-gray-400">Jobs</span>
        <div className="">
          <Calendar
            startDate={startDate}
            endDate={endDate}
            handleStartDate={(val) => setStartDate(val)}
            handleEndDate={(val) => setEndDate(val)}
          />
        </div>
      </div>
      <div className="mb-4 flex justify-between text-xs items-center">
        <span className="p-2 bg-[#ECFFE7] rounded-lg text-xs font-bold">
          {formatNumber(recentJobs.length)} posted today
        </span>
        <span
          className="hover:underline cursor-pointer text-gray-500"
          onClick={() => navigate("/admin/jobs")}
        >
          See all
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {recentJobs.map((gig) => (
          <JobPostedCard key={gig.uuid} gig={gig} />
        ))}
      </div>
    </div>
  );
}
