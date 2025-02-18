import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function RecentJobsHook({ page = 1, limit = 100 }) {
    // Regular paginated query (static page-based)
    const { data: recentJobs = [], isLoading } = useQuery({
        queryKey: [`dashboard-recent-jobs-${page}-${limit}`],
        queryFn: () =>
            customAxios.get(`/dashboard/recent?page=${page}&limit=${limit}`),
        staleTime: Infinity,
        select: (data) => data.data.data,
    });

    // Infinite query for loading more jobs dynamically
    const {
        data: infiniteJobs,
        isLoading: isInfiniteLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["dashboard-recent-jobs-infinite", limit],
        queryFn: ({ pageParam = 1 }) =>
            customAxios.get(
                `/dashboard/recent?page=${pageParam}&limit=${limit}`
            ),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            return lastPage.data.data.length < limit
                ? undefined
                : currentPage + 1;
        },
        select: (data) => data.pages.flatMap((page) => page.data.data),
    });

    return {
        recentJobs,
        isLoading,
        infiniteJobs,
        isInfiniteLoading,
        fetchNextPage,
        hasNextPage,
    };
}
