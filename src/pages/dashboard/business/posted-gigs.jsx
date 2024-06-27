import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../helpers/profileAxios";
import { GigCard } from "../../../component/gig-card";

export function PostedGigs() {
	const {
		data: gigs = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["fetch-gig-business"],
		queryFn: () => profileAxios.get("/gigs/all?page=1&limit=100"),
		select: (data) => data.data.items,
		staleTime: Infinity,
	});

	return (
		<div className="p-4">
			<p className="text-sm font-bold">Recent Posts</p>
			<div
				className="flex flex-col gap-4 mt-2 overflow-y-auto h-full"
				style={{ maxHeight: "95vh" }}
			>
				{isLoading ? (
					<p>Fetching gigs...</p>
				) : (
					<>
						{gigs.length > 0 ? (
							gigs.map((gig) => (
								<GigCard key={gig.uuid} refetch={refetch} gig={gig} />
							))
						) : (
							<p className="text-center">
								No gig match this criteria at the moment.
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
}
