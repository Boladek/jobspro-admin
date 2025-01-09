import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function UsersHook() {
  const {
    data: proUsers = [],
    refetch: refetchJobsStats,
    isLoading: gettingProUsers,
  } = useQuery({
    queryKey: ["dashboard-pro-users"],
    queryFn: () => customAxios.get("/user/pro-users?page=1&limit=1000"),
    staleTime: Infinity,
    select: (data) => data?.data?.items,
  });

  return { gettingProUsers, refetchJobsStats, proUsers };
}
