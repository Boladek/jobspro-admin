import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function DashboardHook() {
  const {
    data: dashboardStats = {},
    isLoading: gettingDashboardStats,
    refetch: refetchDashboardStats,
  } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: () => customAxios.get("/dashboard/stats"),
    select: (data) => data?.data,
    staleTime: Infinity,
  });

  return { dashboardStats, gettingDashboardStats, refetchDashboardStats };
}
