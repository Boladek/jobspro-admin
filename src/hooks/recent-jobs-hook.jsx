import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function RecentJobsHook({ page = 1, limit = 100 }) {
    const { data: recentJobs = [], isLoading } = useQuery({
        queryKey: [`dashboard-recent-jobs-${page}-${limit}`, page, limit],
        queryFn: () =>
            customAxios.get(`/dashboard/recent?page=${page}&limit=${limit}`),
        staleTime: Infinity,
        select: (data) => data.data.data,
    });

    return { recentJobs, isLoading };
}
