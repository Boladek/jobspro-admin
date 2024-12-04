import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function LogsHook() {
  const {
    data: logsStats = {},
    isLoading: gettingLogsStats,
    refetch: refetchLogsStats,
  } = useQuery({
    queryKey: ["dashboard-log-stats"],
    queryFn: () => customAxios.get("/dashboard/log-stats"),
    select: (data) => data?.data,
    staleTime: Infinity,
  });

  return { logsStats, gettingLogsStats, refetchLogsStats };
}
