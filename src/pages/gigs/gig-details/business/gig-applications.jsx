import React from "react";
import profileAxios from "../../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { object, func } from "prop-types";
import { PropComponent } from "../../../../component/pro-component";
import { NoInfo } from "../../../../component/no-info";

export function GigApplications({ gig, refetch }) {
	const { id } = useParams();
	const { data: proApplications = [] } = useQuery({
		queryKey: ["fetch-pro-applicants-details" + id, id],
		queryFn: () => profileAxios.get(`/gigs/fetch-pro-applications/${id}`),
		select: (data) => data.data,
		staleTime: Infinity,
		refetchOnMount: true,
		retry: 2,
	});

	return (
		<div>
			<table className="w-full">
				<thead className="bg-[#F7F9FF] shadow-sm">
					<tr>
						<th className="py-4 px-2 text-sm text-left">Pro</th>
						<th className="py-4 px-2 text-sm text-left">Tier</th>
						<th className="py-4 px-2 text-sm text-left">Years of Experience</th>
						{/* <th className="py-4 px-2 text-sm text-left">Gigs completed</th> */}
						<th className="py-4 px-2 text-sm text-left">Rating</th>
					</tr>
				</thead>
				<tbody className="rounded-xl">
					{proApplications &&
						proApplications.gigApplies &&
						proApplications?.gigApplies.length > 0 &&
						proApplications?.gigApplies.map((item) => (
							<PropComponent
								key={item.uuid}
								pro={item}
								gig={proApplications}
								refetch={refetch}
							/>
						))}
				</tbody>
			</table>

			{proApplications &&
				proApplications.gigApplies &&
				proApplications?.gigApplies.length === 0 && (
					<div className="w-full flex justify-center">
						<NoInfo message="No Applicants at this moment" />
					</div>
				)}
		</div>
	);
}

GigApplications.propTypes = {
	gig: object,
	refetch: func,
};
