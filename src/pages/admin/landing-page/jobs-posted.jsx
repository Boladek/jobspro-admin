import { JobPostedCard } from "./job-posted-card";
import { formatNumber } from "../../../helpers/function";
import { useNavigate } from "react-router-dom";
import { RecentJobsHook } from "../../../hooks/recent-jobs-hook";

export function JobsPosted() {
    const navigate = useNavigate();
    const { recentJobs } = RecentJobsHook({ page: 1, limit: 3 });

    return (
        <div>
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
                {recentJobs.slice(0, 3).map((gig) => (
                    <JobPostedCard key={gig.uuid} gig={gig} />
                ))}
            </div>
        </div>
    );
}
