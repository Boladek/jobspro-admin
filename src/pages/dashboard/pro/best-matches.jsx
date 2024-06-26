import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../helpers/profileAxios";
import { useMemo, useState } from "react";
import { GigComponent } from "../../../component/gig-component";

const tabs = ["Best Matches", "Remote", "On-Site"];

export function BestMatches() {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const {
		data: gigs = [],
		isLoading,
		refetch,
		// isRefetching,
	} = useQuery({
		queryKey: ["fetch-gig-pros"],
		queryFn: () => profileAxios.get("/pro-gigs/best-matches?page=1&limit=100"),
		select: (data) => data.data.data,
		staleTime: Infinity,
	});

	const filteredGigs = useMemo(() => {
		if (gigs.length > 0) {
			return gigs.filter((gig) => {
				if (activeTab === tabs[0]) {
					return gig;
				}
				if (activeTab === tabs[1]) {
					return !gig.isPhysical;
				}
				if (activeTab === tabs[2]) {
					return gig.isPhysical;
				}
			});
		}
		return [];
	}, [activeTab, gigs]);

	return (
		<div className="p-4">
			<div className="flex bg-adminPrimary p-2 text-sm text-white w-full justify-evenly rounded-lg">
				{tabs.map((tab) => (
					<div
						className={`${
							activeTab === tab ? "border-b-yellow-300 border-b-4" : ""
						} p-0.5 cursor-pointer`}
						key={tab}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</div>
				))}
			</div>
			<div
				className="flex flex-col gap-4 mt-4 overflow-y-auto h-full"
				style={{ maxHeight: "80vh" }}
			>
				{isLoading ? (
					<p>Fetching gigs...</p>
				) : (
					<>
						{filteredGigs.length > 0 ? (
							filteredGigs.map((gig) => (
								<GigComponent key={gig.uuid} refetch={refetch} gig={gig} />
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
