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

	console.log({ proApplications });

	return (
		<div>
			{proApplications &&
			proApplications.gigApplies &&
			proApplications?.gigApplies.length > 0 ? (
				proApplications.gigApplies.map((item, index) => (
					<div key={index}>
						{/* <div className="flex gap-2 items-center">
							<span>
								<MdArrowBackIos />
							</span>
							<p className="font-bold text-2xl">Prospective pros</p>
						</div>
						<div className="max-w-md p-4 mt-2">
						</div> */}
						<PropComponent pro={item} gig={proApplications} refetch={refetch} />
					</div>
				))
			) : (
				<NoInfo message="No Applicants" />
			)}
		</div>
	);
}

GigApplications.propTypes = {
	gig: object,
    refetch: func
};
