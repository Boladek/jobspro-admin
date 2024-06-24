import { useState } from "react";
import { BaseButton } from "../../../../component/button";
// import { useTimer } from "../timer-hook";
import { EndGig } from "./end-gig";
import { StarIcon } from "../../../../assets/admin/star-icon";
import { generateArray } from "../../../../helpers/function";
import { GigReview } from "./gig-review";
import profileAxios from "../../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CancelGig } from "../business/cancel-gig";
import { DisputeGig } from "./dispute-gig";

export function ProGigTimeLine() {
	const location = useLocation();
	const { gigData } = location.state;
	const [startingGig, setStartingGig] = useState(false);
	const [openEnd, setOpenEnd] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	const [openDispute, setOpenDispute] = useState(false);
	const [openCancel, setOpenCancel] = useState(false);

	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["fetch-pro-gig-timeline"],
		queryFn: () =>
			profileAxios.get(
				`/pro-gigs/timeline/${gigData.gig?.gigAccepted[0]?.uuid}`
			),
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 2,
	});

	// const { hours, seconds, minutes, startTimer } = useTimer(
	// 	data?.step2?.duration || 0
	// );

	function startGig() {
		setStartingGig(true);
		profileAxios
			.post(`/pro-gigs/start-gig/${gigData.gig?.gigAccepted[0]?.uuid}`)
			.then(() => {
				refetch();
				// startTimer();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err);
			})
			.finally(() => setStartingGig(false));
	}

	return (
		<div className="p-4 max-w-2xl mx-auto">
			{isLoading ? (
				<p>Please wait</p>
			) : (
				<>
					<ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
						{data?.step1?.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step1.title}</p>
									<p className="font-small text-sm">
										{data.step1.hoursAgo} hours ago
									</p>
								</div>
							</li>
						)}
						{data.step2.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold mb-2">{data.step2.title}</p>
									<div className="mb-2">
										<p className="font-small text-xs">Duration</p>
										<p className="font-bold text-sm">
											{data.step2.duration}hrs
										</p>
									</div>
									<hr />
									<div className="my-2">
										<p className="font-small text-xs">Time range</p>
										<p className="font-bold text-sm">
											{data.step2.startTime} - {data.step2.endTime}
										</p>
									</div>
									<hr />
									<div className="mt-2">
										<p className="font-small text-xs">Date</p>
										<p className="font-bold text-sm">{data.step2.date}</p>
									</div>
								</div>
							</li>
						)}
						{data.step3.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
										data.step3.isShown && data.step3.isStarted
											? "bg-green-200 dark:bg-green-900"
											: "bg-gray-100 dark:bg-gray-700"
									}`}
								>
									{data.step3.isShown && data.step3.isStarted ? (
										<svg
											className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 16 12"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M1 5.917L5.724 10.5 15 1.5"
											/>
										</svg>
									) : (
										<svg
											className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 16"
										>
											<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
										</svg>
									)}
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold mb-2">{data.step3.title}</p>
									<p className="mb-2">{data.step3.timeLeft} ago</p>
									{/* <div
										className={`mb-2 flex justify-evenly max-w-64 bg-custom-gradient rounded-lg p-4`}
									>
										<div className={"text-center text-white font-bold"}>
											<p className="text-3xl">{hours}</p>
											<p className="font-extralight text-xs">hours</p>
										</div>
										<div className={"text-center text-white font-bold"}>
											<p className="text-3xl">{minutes}</p>
											<p className="font-extralight text-xs">minutes</p>
										</div>
										<div className={"text-center text-white font-bold"}>
											<p className="text-3xl">{seconds}</p>
											<p className="font-extralight text-xs">seconds</p>
										</div>
									</div> */}
								</div>
							</li>
						)}
						{data.step4.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step4.title}</p>
									<p className="text-xs mb-2">{data.step4.message}</p>
								</div>
							</li>
						)}
						{data.step5.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step5.title}</p>
									<p className="text-xs mb-2">{data.step5.message}</p>
									<div className="p-3 bg-secondary/20 rounded-lg">
										<p className="font-small text-sm font-bold">Comment</p>
										<p className="font-small text-sm">
											{data.step5?.comment ?? "N/A"}
										</p>
									</div>
								</div>
							</li>
						)}
						{data.step6.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step6.title}</p>
									<p className="text-xs mb-2">{data.step6.message}</p>
								</div>
							</li>
						)}
						{data.step7.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step7.title}</p>
									<p className="text-xs mb-2">{data?.step7?.message}</p>
								</div>
							</li>
						)}
						{data?.step8?.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data?.step8?.title}</p>
									<p className="text-sm mb-2">
										{data?.step8?.message || "N/A"}
									</p>
									<div className="flex justify-between items-center">
										<p className="text-xs">Rate Pros Professionalism</p>
										<div className="flex gap-1 items-center">
											<div className="flex flex-row-reverse gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={
															index + 1 <= data?.step8.professionalismRate
														}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data?.step8.professionalismRate}
											</span>
										</div>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-xs">Rate Pros Punctuality</p>
										<div className="flex gap-1 items-center">
											<div className="flex flex-row-reverse gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={index + 1 <= data?.step8.punctualityRate}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data?.step8.punctualityRate}
											</span>
										</div>
									</div>
									<div className="flex justify-between items-center mb-2">
										<p className="text-xs">Rate Pros Hygiene</p>
										<div className="flex gap-1 items-center">
											<div className="flex flex-row-reverse gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={index + 1 <= data?.step8.hygieneRate}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data?.step8.overallRate}
											</span>
										</div>
									</div>
									<hr />
									<div className="flex justify-between items-center">
										<p className="text-lg text-primary font-bold mt-2">
											Overall Rating
										</p>
										<div className="flex gap-1 items-center">
											<div className="flex flex-row-reverse gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={index + 1 <= data?.step8.overallRate}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data?.step8.overallRate}
											</span>
										</div>
									</div>
								</div>
							</li>
						)}
						{data.step9.isShown && (
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-green-200 dark:bg-green-900`}
								>
									<svg
										className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 16 12"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M1 5.917L5.724 10.5 15 1.5"
										/>
									</svg>
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step9.title}</p>
									<p className="text-xs mb-2">{data?.step9?.message}</p>
								</div>
							</li>
						)}

						{/* {gigDelayed ? (
							<>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold mb-2">Gig Delay</p>
										<div className="mb-2 bg-[#FFF9EA] font-light text-xs p-2 rounded-md text-accent">
											Hey, it&apos;s been more than 5 minutes since the gig was
											supposed to start. you have not arrived at the location
										</div>
									</div>
								</li>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold mb-2">Gig Cancelled</p>
										<div className="mb-2 bg-[#FFF9EA] font-light text-xs p-2 rounded-md text-accent">
											Pro didn&apos;t show up
										</div>
									</div>
								</li>
							</>
						) : (
							<>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold mb-2">Gig Started</p>
										<div
											className={`mb-2 flex justify-evenly max-w-64 bg-custom-gradient rounded-lg p-4`}
										>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{hours}</p>
												<p className="font-extralight text-xs">hours</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{minutes}</p>
												<p className="font-extralight text-xs">minutes</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{seconds}</p>
												<p className="font-extralight text-xs">seconds</p>
											</div>
										</div>
									</div>
								</li>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold">End Requested</p>
										<p className="text-xs mb-2">
											This gig was end before the set duration elapsed
										</p>
										<div className="mb-2 bg-light text-xs font p-2 rounded-md">
											<p className="text-primary font-bold">Reason</p>
											<p className="text-dark/75">Done with my work bro</p>
										</div>
									</div>
								</li>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold mb-2">Submission Rejected</p>
										<div className="mb-2 bg-light text-xs font p-2 rounded-md">
											<p className="text-primary font-bold">
												Comment from Tochi
											</p>
											<p className="text-dark/75">
												There are still some plates on the sink that you have
												not washed.
											</p>
										</div>
									</div>
								</li>
								<li className="mb-4 ms-6">
									<span
										className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
											scheduleStart
												? "bg-green-200 dark:bg-green-900"
												: "bg-gray-100 dark:bg-gray-700"
										}`}
									>
										{scheduleStart ? (
											<svg
												className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 16 12"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M1 5.917L5.724 10.5 15 1.5"
												/>
											</svg>
										) : (
											<svg
												className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 16"
											>
												<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
											</svg>
										)}
									</span>
									<div className="p-2 rounded-lg border">
										<p className="font-bold">Adeola Review</p>
										<p className="text-sm mb-2">
											Excellent. Nice working with her, i would fancy working
											with him agin
										</p>
										<div className="flex justify-between items-center">
											<p className="text-xs">Rate Pros Professionalism</p>
											<div className="flex gap-1 items-center">
												{generateArray(5).map(() => (
													<StarIcon
														key={Math.random()}
														filled={true}
														size={0.8}
													/>
												))}
												<span className="text-sm ml-1">5.0</span>
											</div>
										</div>
										<div className="flex justify-between items-center">
											<p className="text-xs">Rate Pros Punctuality</p>
											<div className="flex gap-1 items-center">
												{generateArray(5).map(() => (
													<StarIcon
														key={Math.random()}
														filled={true}
														size={0.8}
													/>
												))}
												<span className="text-sm ml-1">5.0</span>
											</div>
										</div>
										<div className="flex justify-between items-center mb-2">
											<p className="text-xs">Rate Pros Hygiene</p>
											<div className="flex gap-1 items-center">
												{generateArray(5).map(() => (
													<StarIcon
														key={Math.random()}
														filled={true}
														size={0.8}
													/>
												))}
												<span className="text-sm ml-1">5.0</span>
											</div>
										</div>
										<hr />
										<div className="flex justify-between items-center">
											<p className="text-lg text-primary font-bold mt-2">
												Overall Rating
											</p>
											<div className="flex gap-1 items-center">
												{generateArray(5).map(() => (
													<StarIcon
														key={Math.random()}
														filled={true}
														size={0.8}
													/>
												))}
												<span className="text-sm ml-1">5.0</span>
											</div>
										</div>
									</div>
								</li>
							</>
						)}
						<>
							<li className="mb-4 ms-6">
								<span
									className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
										scheduleStart
											? "bg-green-200 dark:bg-green-900"
											: "bg-gray-100 dark:bg-gray-700"
									}`}
								>
									{scheduleStart ? (
										<svg
											className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 16 12"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M1 5.917L5.724 10.5 15 1.5"
											/>
										</svg>
									) : (
										<svg
											className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 16"
										>
											<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
										</svg>
									)}
								</span>
								<div className="p-2 rounded-lg border">
									<p className="font-bold mb-2">Submission Rejected</p>
									<div className="mb-2 bg-light text-xs font p-2 rounded-md">
										<p className="text-primary font-bold">Comment from Tochi</p>
										<p className="text-dark/75">
											There are still some plates on the sink that you have not
											washed.
										</p>
									</div>
								</div>
							</li>
						</> */}
					</ol>
					<div>
						{data.step3.isShown && data.step3.isStarted === false && (
							<div className="max-w-sm mx-auto">
								<BaseButton
									variant="sec"
									onClick={startGig}
									loading={startingGig}
								>
									Start Gig
								</BaseButton>
							</div>
						)}
						{data.step3.isShown &&
							data.step3.isStarted &&
							data.step4.isShown === false && (
								<div className="max-w-sm mx-auto">
									<div className="flex-1">
										<BaseButton variant="sec" onClick={() => setOpenEnd(true)}>
											End Gig
										</BaseButton>
									</div>
								</div>
							)}
						{data.step5.isShown && !data.step9.isShown && (
							<div className="max-w-sm mx-auto flex gap-2">
								<div className="flex-1">
									<BaseButton variant="sec" onClick={() => setOpenEnd(true)}>
										End Gig
									</BaseButton>
								</div>
								<div className="flex-1">
									<BaseButton
										variant="danger"
										onClick={() => setOpenDispute(true)}
									>
										Dispute Gig
									</BaseButton>
								</div>
							</div>
						)}
					</div>
				</>
			)}

			{openDispute && (
				<DisputeGig
					open={openDispute}
					handleClose={() => {
						setOpenDispute(false);
						refetch();
					}}
				/>
			)}

			{openEnd && (
				<EndGig
					open={openEnd}
					handleClose={() => {
						setOpenEnd(false);
						refetch();
					}}
					openReview={() => setOpenReview(true)}
				/>
			)}

			{openReview && (
				<GigReview
					open={openReview}
					handleClose={() => {
						setOpenReview(false);
						refetch();
					}}
				/>
			)}

			{openCancel && (
				<CancelGig
					open={openCancel}
					handleClose={() => {
						setOpenCancel(false);
						refetch();
					}}
				/>
			)}
		</div>
	);
}
