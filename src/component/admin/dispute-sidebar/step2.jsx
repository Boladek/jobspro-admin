import React, { useState } from "react";
import { ProgressBar } from "../progress-bar";
import PropTypes from "prop-types";
import { formatNumber } from "../../../helpers/function";
import { TiimeLineBox } from "../../time-line-box";

export function Step2({ gotoNextStep, goBack }) {
	const [openBreakDown, setOpenBreakDown] = useState(false);
	return (
		<>
			<div className="w-[550px]">
				<div className="flex gap-4 mb-4">
					<div className="w-3/5 flex gap-2 items-center">
						<div className="bg-[#1A68FF] text-white p-2 rounded-lg font-bold">
							PG
						</div>
						<div>
							<p className="text-xs font-semibold">Expert</p>
							<div className="w-5">
								<ProgressBar color="#344054" thickness={0.3} />{" "}
							</div>
							<p className="text-tiny text-gray-400">Level</p>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Job Cost</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							NGN <span className="text-xs font-semibold">200,000</span>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Commission and Tax</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							NGN <span className="text-xs font-semibold">200,000</span>
						</div>
					</div>
				</div>
				<div className="flex gap-4 mb-4">
					<div className="w-3/5">
						<p className="text-xs font-bold">
							Chief Information Security Officer for a Social Media Mobile App
						</p>
						<p className="text-tiny font-extralight">1 min ago</p>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Time Left</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny">
							<span className="text-xs font-semibold">3 days</span>
						</div>
					</div>
					<div className="w-1/5">
						<p className="text-tiny font-extralight">Location</p>
						<div className="w-5">
							<ProgressBar color="#344054" thickness={0.3} />{" "}
						</div>
						<div className="text-tiny flex gap-2">
							<span className="text-xs font-semibold">Lagos, Nigeria</span>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-tiny font-extralight">Status</p>
					<div className="w-24">
						<ProgressBar color="red" thickness={2} percent={40} bg="#E1E1E1" />
					</div>
				</div>
				<div>
					<div className="flex justify-between items-center mb-2">
						<p className="text-[#0072BB] text-xs">Gig Timeline</p>
						<span
							onClick={goBack}
							className="text-xs text-gray-500 hover:underline cursor-pointer"
						>
							Back
						</span>
					</div>
					<div className="flex gap-4 w-full mb-4">
						<div className="pl-4 flex-1">
							<ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ml-4 md:ml-0">
								<li className="mb-4 ms-6 ">
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
									<TiimeLineBox title="Gig Application Approved">
										<p className="text-xs">By: ABC and sons</p>
									</TiimeLineBox>
								</li>

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
									<TiimeLineBox title="Gig approval accepted">
										<p className="text-xs">By: Atinse</p>
									</TiimeLineBox>
								</li>

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
									<TiimeLineBox title="Gig Started">
										<p className="text-xs">By: Atinse</p>
									</TiimeLineBox>
								</li>
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
									<TiimeLineBox title="Gig End">
										<p className="text-xs mb-2">By: Atinse</p>
										<div className="bg-primary text-white p-2 rounded-md">
											<p className="text-xs">Reason</p>
											<p className="text-tiny">
												The work was completed in due time
											</p>
										</div>
									</TiimeLineBox>
								</li>
							</ol>
						</div>
						<div className="p-4 border h-fit rounded-md text-xs mb-4 w-2/5">
							<p className="mb-4">
								The sum of NGN{" "}
								<span className="font-semibold">{formatNumber(100000)}</span>{" "}
								will be deducted from GIG escrow account
							</p>
							<p
								className="text-adminPrimary font-bold cursor-pointer hover:underline select-none mb-2"
								onClick={() => setOpenBreakDown((prev) => !prev)}
							>
								{openBreakDown ? "Close Breakdown" : "See Fee Breakdown"}
							</p>
							{openBreakDown && (
								<div>
									<div className="flex gap-2 mb-2">
										<div className="w-2/5">Gig Amount</div>
										<div className="flex-1">NGN {formatNumber(2000)} </div>
									</div>
									<div className="flex gap-2 mb-2">
										<div className="w-2/5">Tip</div>
										<div className="flex-1">NGN {formatNumber(3000)} </div>
									</div>
									<div className="flex gap-2 mb-2">
										<div className="w-2/5">Escrow Fee</div>
										<div className="flex-1">NGN {formatNumber(1000, 2)} </div>
									</div>
									<div className="flex gap-2 mb-2">
										<div className="w-2/5">Jobs Pro Fee</div>
										<div className="flex-1">NGN {formatNumber(50000, 2)} </div>
									</div>
									<div className="flex gap-2 text-sm text-primary">
										<div className="w-2/5 font-bold">Total</div>
										<div className="flex-1 font-bold">
											NGN {formatNumber(100000, 2)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					className="border p-2 text-xs font-bold text-[#3514FF] bg-[#E9E5FF] rounded-md cursor-pointer w-fit"
					onClick={gotoNextStep}
				>
					Disburse Payment
				</div>
			</div>
		</>
	);
}

Step2.propTypes = {
	gotoNextStep: PropTypes.func,
	goBack: PropTypes.func,
};
