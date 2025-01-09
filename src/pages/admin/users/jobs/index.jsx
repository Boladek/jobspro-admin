import { JobsCard } from "./jobs-card";
import { NoInfo } from "../../../../component/no-info";
import { UseUserDetails } from "../admin-user-details-page";

export function JobsSection() {
  const { jobs, gettingJobsStats } = UseUserDetails();

  return (
    <div className="grid grid-cols-1 gap-4 pt-4">
      {gettingJobsStats ? (
        <p>Please wait... </p>
      ) : jobs.length > 0 ? (
        jobs.map((gig) => <JobsCard key={gig.gigId} gig={gig} />)
      ) : (
        <div className="p-16">
          <NoInfo message="No Jobs information available" />
        </div>
      )}
    </div>
  );
}
