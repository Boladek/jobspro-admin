import { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { PropComponent } from "../../../../component/pro-component";
import { formatDate, formatNumber } from "../../../../helpers/function";
import profileAxios from "../../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FundEscrow } from "../../../../component/fund-escrow";
import { BaseButton } from "../../../../component/button";
import { CancelGig } from "./cancel-gig";

export function GigSummaryBusiness() {
	const [open, setOpen] = useState(false);
	const [showPros, setShowPros] = useState(false);
	const [openCancel, setOpenCancel] = useState(false);
	const { id } = useParams();

	const { data, isLoading } = useQuery({
		queryKey: ["fetch-gig-details" + id],
		queryFn: () => profileAxios.get(`/gigs/details/${id}`),
		select: (data) => data.data,
		// staleTime: Infinity,
		refetchOnMount: true,
		retry: 2,
	});

	const { data: proApplications = [] } = useQuery({
		queryKey: ["fetch-pro-applicants-details" + id, id],
		queryFn: () => profileAxios.get(`/gigs/fetch-pro-applications/${id}`),
		select: (data) => data.data,
		staleTime: Infinity,
		refetchOnMount: true,
		retry: 2,
	});

	// console.log({ proApplications, data });

	return (
		<div>
			{isLoading ? (
				<div>Getting gig details</div>
			) : (
				<>
					{!showPros ? (
						<div>
							<div className="flex justify-between items-center">
								<div className="flex gap-2 items-center mb-2">
									{/* <span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
										Entertainment
									</span>
									<span> &gt; </span>
									<span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
										Acting
									</span> */}
								</div>
								<>
									{!data.isFunded && (
										<span
											className="p-2 bg-[#78AD84] text-white text-xs rounded-md cursor-pointer hover:bg-[#005257]"
											onClick={() => setOpen(true)}
										>
											Fund Escrow
										</span>
									)}
								</>
							</div>
							<p className="text-primary text-2xl font-bold mb-4">
								{data.gigInfos[0]?.title}
							</p>
							<div className="bg-[#023375] p-8 max-w-sm rounded-lg flex justify-between text-white mb-8">
								<div>
									<p className="text-sm">Proposal</p>
									<p className="text-4xl font-bold">{data.gigApplies.length}</p>
									<p
										className="text-xs text-yellow-300 underline cursor-pointer"
										onClick={() => setShowPros(true)}
									>
										View Pros
									</p>
								</div>
								<div>
									<p className="text-sm">Hired</p>
									<p className="text-4xl font-bold">
										{data.gigAccepted.length}
									</p>
								</div>
							</div>
							<div className="px-3 py-4 max-w-sm rounded-lg  mb-16 border">
								<div className="flex justify-between w-full mb-4">
									<div className="flex-1">
										<p className="text-xs text-gray-500">Date</p>
										<p className="font-bold text-sm">
											{formatDate(data.gigDate)}
										</p>
									</div>
									<div className="flex-1">
										<p className="text-xs text-gray-500">Time Range</p>
										<p className="font-bold text-sm">
											{data.startTime} - {data.endTime}
										</p>
									</div>
								</div>
								<hr />
								<div className="flex justify-between w-full mt-4">
									<div className="flex-1">
										<p className="text-xs text-gray-500">Budget</p>
										<p className="font-bold text-sm">
											N{formatNumber(data.budget)}
										</p>
									</div>
									<div className="flex-1">
										<p className="text-xs text-gray-500">Service</p>
										<p className="font-bold text-sm">Event Caterings</p>
									</div>
								</div>
							</div>
							{data?.gigAccepted?.length > 0 && (
								<div className="max-w-sm">
									<BaseButton
										variant="danger"
										onClick={() => setOpenCancel(true)}
									>
										Cancel Gig
									</BaseButton>
								</div>
							)}
						</div>
					) : (
						<>
							{/* <div className="mb-4">
								<span
									className="p-2 border text-xs rounded-full cursor-pointer hover:bg-light hover:text-primary"
									onClick={() => setShowPros(false)}
								>
									Back
								</span>
							</div> */}
							{proApplications.gigApplies.length > 0 ? (
								proApplications.gigApplies.map((item, index) => (
									<div key={index}>
										<div className="flex gap-2 items-center">
											<span onClick={() => setShowPros(false)}>
												<MdArrowBackIos />
											</span>
											<p className="font-bold text-2xl">Prospective pros</p>
										</div>
										<div className="max-w-md p-4 mt-2">
											<PropComponent pro={item} gig={proApplications} />
										</div>
									</div>
								))
							) : (
								<p className="">
									There are no applicants for this gig currently
								</p>
							)}
						</>
					)}
				</>
			)}

			{open && (
				<FundEscrow
					open={open}
					handleClose={() => setOpen(false)}
					amount={data.budget}
					id={id}
				/>
			)}

			{openCancel && (
				<CancelGig
					open={openCancel}
					handleClose={() => setOpenCancel(false)}
					id={data?.gigAccepted[0].uuid}
				/>
			)}

			{/* {openCancel && (
				<Modal
					open={openCancel}
					handleClose={() => setOpenCancel(false)}
					maxWidth={400}
				>
					<form
						className="py-4 h-full flex flex-col"
						style={{ maxWidth: 500, width: "100%" }}
						// onSubmit={handleSubmit(onSubmit)}
					>
						<div className="text-center px-4 mb-8">
							<p className={`text-primary text-2xl font-bold mb-4`}>
								Are you sure you want to Cancel this gig?
							</p>
							<p className="text-xs text-gray-500">
								If you choose to proceed, the previously hired pros for this
								would be unhired.
							</p>
						</div>

						<div className="flex gap-4">
							<div className="flex-1">
								<BaseButton type="button">Yes, Proceed</BaseButton>
							</div>
							<div className="flex-1">
								<BaseButton type="button" variant="danger">
									No
								</BaseButton>
							</div>
						</div>
					</form>
				</Modal>
			)} */}
		</div>
	);
}
