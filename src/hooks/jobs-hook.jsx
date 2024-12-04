import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function JobsHook() {
  const {
    data: jobsStats = [],
    refetch: refetchJobsStats,
    isLoading: gettingJobsStats,
  } = useQuery({
    queryKey: ["dashboard-jobs-chart"],
    queryFn: () => customAxios.get("/dashboard/jobs-chart"),
    staleTime: Infinity,
    select: (data) => data?.data,
  });

  return { jobsStats, gettingJobsStats, refetchJobsStats };
}
