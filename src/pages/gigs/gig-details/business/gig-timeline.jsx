import { useState } from "react";
import { BaseButton } from "../../../../component/button";
// import { useTimer } from "../timer-hook";
import { CancelGig } from "./cancel-gig";
import { CompleteGig } from "./complete-gig";
import { GigAdjustment } from "./gig-adjustment";
import { StarIcon } from "../../../../assets/admin/star-icon";
import { generateArray } from "../../../../helpers/function";
import { AdjustTip } from "./adjust-tip";
import { GigReview } from "./gig-review";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../../helpers/profileAxios";
import { DisputeGig } from "./dispute-gig";
import { SquareButton } from "../../../../component/square-button";
import { PayPro } from "./pay-pro";
import { PaymentOtp } from "./payment-otp";
import { TiimeLineBox } from "../../../../component/time-line-box";
import duration from "../../../../assets/clock.png";
import date from "../../../../assets/calendar-pic.png";
import time from "../../../../assets/timer.png";
import PropTypes from "prop-types";

export function BusinessGigTimeLine({ gig }) {
	const [openCancel, setOpenCancel] = useState(false);
	const [openComplete, setOpenComplete] = useState(false);
	const [openAdjustment, setOpenAdjustment] = useState(false);
	const [openAdjustTip, setOpenAdjustTip] = useState(false);
	const [openReview, setOpenReview] = useState(false);
	const [openDispute, setOpenDispute] = useState(false);

	const [openPayPro, setOpenPayPro] = useState(false);
	const [openPaymentOtp, setOpenPaymentOtp] = useState(false);

	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["fetch-gig-timeline" + gig?.gigAccepted[0]?.uuid],
		queryFn: () =>
			profileAxios.get(`/gigs/timeline/business/${gig?.gigAccepted[0]?.uuid}`),
		select: (data) => data.data,
		// staleTime: Infinity,
		retry: 2,
		refetchOnWindowFocus: true,
	});

	return (
		<div className="p-4 max-w-2xl mx-auto">
			{isLoading ? (
				<p>Please wait...</p>
			) : (
				<>
					<ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
						{data.step1.isShown && (
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
								<TiimeLineBox title={data.step1.title}>
									<p className="font-small text-sm">
										{data.step1.hoursAgo} hours ago
									</p>
								</TiimeLineBox>
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
								<TiimeLineBox title={data.step2.title}>
									<div className="mb-2">
										<p className="font-small text-xs">Duration</p>
										<div className="font-bold text-sm flex gap-2 items-center">
											<img src={time} className="h-4" />
											{data.step2.duration}hrs
										</div>
									</div>
									<div
										className="bg-gray-400 rounded-sm"
										style={{ height: "0.05rem" }}
									/>
									<div className="my-2">
										<p className="font-small text-xs">Time range</p>
										<div className="font-bold text-sm flex gap-2 items-center">
											<img src={duration} className="h-4" />
											{data.step2.startTime} - {data.step2.endTime}
										</div>
									</div>
									<div
										className="bg-gray-500 rounded-sm"
										style={{ height: "0.05rem" }}
									/>
									<div className="mt-2">
										<p className="font-small text-xs">Date</p>
										<div className="font-bold text-sm flex gap-2 items-center">
											<img src={date} className="h-4" />
											{data.step2.date}
										</div>
									</div>
								</TiimeLineBox>
								{/* <div className="p-2 rounded-lg border">
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
								</div> */}
							</li>
						)}
						{data.step3.isShown && (
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
								<TiimeLineBox title={data.step3.title}>
									{data.step3.status && (
										<p className="mb-2 flex gap-2 items-center">
											{data.step3.status}
										</p>
									)}
									{data?.step3?.timeLeft && (
										<div
											className={`mb-2 flex justify-evenly max-w-64 bg-custom-gradient rounded-lg p-4`}
										>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.hoursLeft}</p>
												<p className="font-extralight text-xs">hours</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.minutesLeft}</p>
												<p className="font-extralight text-xs">minutes</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.secondsLeft}</p>
												<p className="font-extralight text-xs">seconds</p>
											</div>
										</div>
									)}
								</TiimeLineBox>
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step3.title}</p>
									{data.step3.status && (
										<p className="mb-2 flex gap-2 items-center">
											{data.step3.status}
										</p>
									)}
									{data?.step3?.timeLeft && (
										<div
											className={`mb-2 flex justify-evenly max-w-64 bg-custom-gradient rounded-lg p-4`}
										>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.hoursLeft}</p>
												<p className="font-extralight text-xs">hours</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.minutesLeft}</p>
												<p className="font-extralight text-xs">minutes</p>
											</div>
											<div className={"text-center text-white font-bold"}>
												<p className="text-3xl">{data?.step3?.secondsLeft}</p>
												<p className="font-extralight text-xs">seconds</p>
											</div>
										</div>
									)}
								</div> */}
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
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step4.title}</p>
									<p className="font-small text-sm">{data.step4.message}</p>
								</div> */}
								<TiimeLineBox title={data.step4.title}>
									<p className="font-small text-sm">{data.step4.message}</p>
								</TiimeLineBox>
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
								<TiimeLineBox title={data.step5.title}>
									<p className="font-small text-sm">{data.step5.message}</p>
									<p className="font-small text-sm">{data.step5.comment}</p>
								</TiimeLineBox>
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step5.title}</p>
									<p className="font-small text-sm">{data.step5.message}</p>
									<p className="font-small text-sm">{data.step5.comment}</p>
								</div> */}
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
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step6.title}</p>
									<p className="font-small text-sm"></p>
								</div> */}
								<TiimeLineBox title={data.step6.title} />
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
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step7.title}</p>
									<p className="font-small text-sm"></p>
								</div> */}
								<TiimeLineBox title={data.step7.title} />
							</li>
						)}
						{data.step8.isShown && (
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
								<TiimeLineBox title={data.step8.title}>
									<p className="text-sm mb-2">
										{data?.step8?.message || "N/A"}
									</p>

									<div className="flex justify-between items-center">
										<p className="text-lg text-primary font-bold mt-2">
											Rating
										</p>
										<div className="flex gap-1 items-center">
											<div className="flex gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={index + 1 <= data.step8.overallRate}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data.step8.overallRate}
											</span>
										</div>
									</div>
								</TiimeLineBox>
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data?.step8?.title}</p>
									<p className="text-sm mb-2">
										{data?.step8?.message || "N/A"}
									</p>

									<div className="flex justify-between items-center">
										<p className="text-lg text-primary font-bold mt-2">
											Rating
										</p>
										<div className="flex gap-1 items-center">
											<div className="flex gap-1">
												{generateArray(5).map((_, index) => (
													<StarIcon
														key={Math.random()}
														filled={index + 1 <= data.step8.overallRate}
														size={0.8}
													/>
												))}
											</div>
											<span className="text-sm ml-1">
												{data.step8.overallRate}
											</span>
										</div>
									</div>
								</div> */}
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
								<TiimeLineBox title={data.step9.title} />
								{/* <div className="p-2 rounded-lg border">
									<p className="font-bold">{data.step9.title}</p>
									<p className="font-small text-sm"></p>
								</div> */}
							</li>
						)}
					</ol>
					{/* <div>
						{data.step4.isShown && !data.step5.isShown && (
							<div className="max-w-sm mx-auto">
								<div className="mb-4">
									<BaseButton onClick={() => setOpenComplete(true)}>
										Approve and Leave Review
									</BaseButton>
								</div>
								<div>
									<BaseButton
										variant="sec"
										onClick={() => setOpenAdjustment(true)}
									>
										Request Adjustment
									</BaseButton>
								</div>
							</div>
						)}

						{data.step3.isStarted === false && data.step4.isShown === false &&  (
							<div className="max-w-sm mx-auto">
								<BaseButton
									variant="danger"
									onClick={() => setOpenCancel(true)}
								>
									Cancel Gig
								</BaseButton>
							</div>
						)}

					
					</div> */}
					{data.step3.isStarted === false && data.step4.isShown === false && (
						<div className="max-w-sm">
							<SquareButton
								variant="danger"
								onClick={() => setOpenCancel(true)}
							>
								Cancel Gig
							</SquareButton>
						</div>
					)}

					{data?.step4?.isShown && !data?.step6?.isShown && (
						<div className="max-w-sm">
							<div className="mb-4">
								<SquareButton
									variant="danger"
									onClick={() => setOpenDispute(true)}
								>
									Submit Dispute
								</SquareButton>
							</div>
							<div>
								<SquareButton onClick={() => setOpenPayPro(true)}>
									Pay Pro
								</SquareButton>
							</div>
						</div>
					)}
				</>
			)}

			{openPayPro && (
				<PayPro
					open={openPayPro}
					handleClose={() => setOpenPayPro(false)}
					gig={gig}
					openOtp={() => setOpenPaymentOtp(true)}
				/>
			)}

			{openPaymentOtp && (
				<PaymentOtp
					open={openPaymentOtp}
					handleClose={() => setOpenPaymentOtp(false)}
					gig={gig}
					openReview={() => setOpenReview(true)}
				/>
			)}

			{openCancel && (
				<CancelGig
					open={openCancel}
					handleClose={() => {
						setOpenCancel(false);
						refetch();
					}}
					id={gig.gigAccepted[0].uuid}
					type="business"
				/>
			)}

			{openComplete && (
				<CompleteGig
					open={openComplete}
					handleClose={() => {
						setOpenComplete(false);
						refetch();
					}}
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

			{openAdjustment && (
				<GigAdjustment
					open={openAdjustment}
					handleClose={() => {
						setOpenAdjustment(false);
						refetch();
					}}
				/>
			)}

			{openAdjustTip && (
				<AdjustTip
					open={openAdjustTip}
					handleClose={() => {
						setOpenAdjustTip(false);
						refetch();
					}}
					openReview={() => setOpenComplete(true)}
				/>
			)}

			{openReview && (
				<GigReview open={openReview} handleClose={() => setOpenReview(false)} />
			)}

			{openDispute && (
				<DisputeGig
					open={openDispute}
					handleClose={() => {
						setOpenDispute(false);
						refetch();
					}}
					refetch={refetch}
				/>
			)}
		</div>
	);
}

BusinessGigTimeLine.propTypes = {
	gig: PropTypes.object,
};
