import { formatNumber } from "../../../helpers/function";
import { JobPostedCard } from "../landing-page/job-posted-card";
import { RecentJobsHook } from "../../../hooks/recent-jobs-hook";
import { useMemo, useState } from "react";
import { NoInfo } from "../../../component/no-info";

export function JobsPage() {
    const [searchText, setSearchText] = useState("");
    const { recentJobs: jobs, isLoading } = RecentJobsHook({
        page: 1,
        limit: 200,
    });

    const filter = useMemo(() => {
        return jobs.filter((item) => {
            return item.gigInfos?.[0].title
                .toLowerCase()
                .includes(searchText.toLowerCase());
        });
    }, [jobs, searchText]);

    return (
        <div className="flex flex-col h-full gap-4 py-1">
            <div className="flex gap-4 items-center">
                <div className="p-2 bg-[#ECFFE7] rounded-lg text-xs font-bold w-fit">
                    {formatNumber(jobs.length)} Jobs posted
                </div>
                <div>
                    <input
                        className="p-2 px-4 bg-gray-100 rounded-md border border-adminPrimary text-xs w-[300px]"
                        placeholder="Search by title"
                        type="search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {isLoading ? (
                    <p>Please wait...</p>
                ) : filter.length > 0 ? (
                    filter.map((gig) => (
                        <div
                            key={gig.uuid}
                            className="col-span-1 min-w-[200px]"
                        >
                            <JobPostedCard gig={gig} />
                        </div>
                    ))
                ) : (
                    <div className="p-4 border">
                        <NoInfo message="No information available" />
                    </div>
                )}
            </div>
        </div>
    );
}
