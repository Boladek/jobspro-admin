import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";

export function GigDetailsHook({ gigId }) {
  const {
    data: gigDetails = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`gig-details-${gigId}`, gigId],
    queryFn: () => customAxios.get(`/gigs/details/${gigId}`),
    staleTime: Infinity,
    select: (data) => data?.data,
  });

  return { gigDetails };
}
