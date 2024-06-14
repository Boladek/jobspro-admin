import { useState } from "react";
import { BaseButton } from "../../../../component/button";
import { useTimer } from "../timer-hook";
import { CancelGig } from "./cancel-gig";
import { CompleteGig } from "./complete-gig";
import { DisputeGig } from "./dispute-gig";
import { StarIcon } from "../../../../assets/admin/star-icon";
import { generateArray } from "../../../../helpers/function";
import { AdjustTip } from "./adjust-tip";
import { GigReview } from "./gig-review";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../../helpers/profileAxios";
import { useParams } from "react-router-dom";

export function BusinessGigTimeLine() {
	const { id } = useParams();
	const { hours, seconds, minutes, startTimer } = useTimer(8);
	const [currentStep, setCurrentStep] = useState(1);
	const [scheduleStart, setScheduleStart] = useState(false);
	const [started, setStarted] = useState(false);
	const [openCancel, setOpenCancel] = useState(false);
	const [openComplete, setOpenComplete] = useState(false);
	const [openDispute, setOpenDispute] = useState(false);
	const [openAdjustTip, setOpenAdjustTip] = useState(false);
	const [gigDelayed, setGigDelayed] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	// const steps = [
	// 	{ title: "Personal Info", details: "Step details here" },
	// 	{ title: "Account Info", details: "Step details here" },
	// 	{ title: "Review", details: "Step details here" },
	// 	{ title: "Confirmation", details: "Step details here" },
	// ];

	const { data, isLoading } = useQuery({
		queryKey: ["fetch-gig-timeline" + id],
		queryFn: () => profileAxios.get(`/gigs/timeline/business/${id}`),
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 2,
	});

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
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
						<p className="font-bold">Gig Booked</p>
						<p className="font-small text-sm">2 hours ago</p>
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
						<p className="font-bold mb-2">Gig Schedule</p>
						<div className="mb-2">
							<p className="font-small text-xs">Duration</p>
							<p className="font-bold text-sm">8hrs</p>
						</div>
						<hr />
						<div className="my-2">
							<p className="font-small text-xs">Time range</p>
							<p className="font-bold text-sm">9:00am - 4:00pm(WAT)</p>
						</div>
						<hr />
						<div className="mt-2">
							<p className="font-small text-xs">Date</p>
							<p className="font-bold text-sm">Tue, May 21, 2024</p>
						</div>
					</div>
				</li>
				{gigDelayed ? (
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
									supposed to start. It seems like the pro is delayed or may not
									show up at all. Do you want to wait a bit longer or declare it
									a No Show?
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
								<p className="font-bold mb-2">Gig Delay</p>
								<div className="mb-2 bg-[#FFF9EA] font-light text-xs p-2 rounded-md text-accent">
									Hey, it&apos;s been more than 5 minutes since the gig was
									supposed to start. It seems like the pro is delayed or may not
									show up at all. Do you want to wait a bit longer or declare it
									a No Show?
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
								<p className="font-bold mb-2">
									Pro has arrived at your location
								</p>
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
									<p className="text-primary font-bold">Comment from Tochi</p>
									<p className="text-dark/75">
										There are still some plates on the sink that you have not
										washed.
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
									Excellent. Nice working with her, i would fancy working with
									him agin
								</p>
								<div className="flex justify-between items-center">
									<p className="text-xs">Rate Pros Professionalism</p>
									<div className="flex gap-1 items-center">
										{generateArray(5).map(() => (
											<StarIcon key={Math.random()} filled={true} size={0.8} />
										))}
										<span className="text-sm ml-1">5.0</span>
									</div>
								</div>
								<div className="flex justify-between items-center">
									<p className="text-xs">Rate Pros Punctuality</p>
									<div className="flex gap-1 items-center">
										{generateArray(5).map(() => (
											<StarIcon key={Math.random()} filled={true} size={0.8} />
										))}
										<span className="text-sm ml-1">5.0</span>
									</div>
								</div>
								<div className="flex justify-between items-center mb-2">
									<p className="text-xs">Rate Pros Hygiene</p>
									<div className="flex gap-1 items-center">
										{generateArray(5).map(() => (
											<StarIcon key={Math.random()} filled={true} size={0.8} />
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
											<StarIcon key={Math.random()} filled={true} size={0.8} />
										))}
										<span className="text-sm ml-1">5.0</span>
									</div>
								</div>
							</div>
						</li>
					</>
				)}

				{scheduleStart && (
					<li className="mb-4 ms-6">
						<span
							className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
								started
									? "bg-green-200 dark:bg-green-900"
									: "bg-gray-100 dark:bg-gray-700"
							}`}
						>
							{started ? (
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
							<p className="font-bold mb-2">Gig Schedule</p>
							<div className="mb-2">
								<p className="font-small text-xs">Duration</p>
								<p className="font-bold text-sm">8hrs</p>
							</div>
							<hr />
							<div className="my-2">
								<p className="font-small text-xs">Time range</p>
								<p className="font-bold text-sm">9:00am - 4:00pm(WAT)</p>
							</div>
							<hr />
							<div className="mt-2">
								<p className="font-small text-xs">Date</p>
								<p className="font-bold text-sm">Tue, May 21, 2024</p>
							</div>
						</div>
					</li>
				)}
			</ol>
			<div>
				<div className="max-w-sm mx-auto">
					<BaseButton variant="sec" onClick={() => setOpenComplete(true)}>
						End Gig
					</BaseButton>
				</div>
				{
					<div className="max-w-sm mx-auto">
						<BaseButton variant="danger">Pro Absent</BaseButton>
					</div>
				}
				{
					<div className="max-w-sm mx-auto">
						<BaseButton variant="danger" onClick={() => setOpenCancel(true)}>
							Cancel Gig
						</BaseButton>
					</div>
				}
				{
					<div className="max-w-sm mx-auto">
						<BaseButton variant="danger" onClick={() => setScheduleStart(true)}>
							Request to end gig
						</BaseButton>
					</div>
				}
			</div>
			{/* <button
				onClick={handleNextStep}
				className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
			>
				Next Step
			</button> */}

			{openCancel && (
				<CancelGig open={openCancel} handleClose={() => setOpenCancel(false)} />
			)}
			{openComplete && (
				<CompleteGig
					open={openComplete}
					handleClose={() => setOpenComplete(false)}
					openDispute={() => {
						setOpenDispute(true);
						setOpenComplete(false);
					}}
					openTip={() => {
						setOpenAdjustTip(true);
						setOpenComplete(false);
					}}
					openReview={() => setOpenReview(true)}
				/>
			)}
			{openDispute && (
				<DisputeGig
					open={openDispute}
					handleClose={() => setOpenDispute(false)}
				/>
			)}
			{openAdjustTip && (
				<AdjustTip
					open={openAdjustTip}
					handleClose={() => setOpenAdjustTip(false)}
					openReview={() => setOpenReview(true)}
				/>
			)}
			{openReview && (
				<GigReview open={openReview} handleClose={() => setOpenReview(false)} />
			)}
		</div>
	);
}
