import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function BusinessUsersHook({ page = 1, limit = 1000 }) {
    const { data: businessUsers = [], isLoading: gettingbusinessUsers } =
        useQuery({
            queryKey: [`dashboard-business-users-${page}-${limit}`],
            queryFn: () =>
                customAxios.get(
                    `/user/business-users?page=${page}&limit=${limit}`
                ),
            staleTime: Infinity,
            select: (data) => data?.data?.items,
        });

    return { gettingbusinessUsers, businessUsers };
}
