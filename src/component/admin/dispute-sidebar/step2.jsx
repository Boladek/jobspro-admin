import { useState } from "react";
import { ProgressBar } from "../progress-bar";
import PropTypes from "prop-types";
import { formatNumber, generateArray, isEmpty } from "../../../helpers/function";
import { TiimeLineBox } from "../../time-line-box";
import { GigAcceptedHook } from "../../../hooks/gig-accepted-hook";
import { NoInfo } from "../../no-info";
import { Overlay } from "../../overlay-component";
import { IoTimeOutline } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { GigTimer } from "../../../hooks/gig-timer";
import { StarIcon } from "../../../assets/admin/star-icon";

export function Step2({ gotoNextStep, goBack, gigDetails }) {
    const { hours, minutes, seconds } = GigTimer({ gig: gigDetails });
    const {
        timeLine: data,
        payPro,
        refundBusiness,
        loading,
        gettingTimeLine,
    } = GigAcceptedHook({
        gigAcceptedId: gigDetails?.gigAccepted?.[0]?.uuid,
    });
    const [openBreakDown, setOpenBreakDown] = useState(false);

    return (
        <>
            {!gigDetails?.gigAccepted?.[0]?.uuid && isEmpty(data) ? (
                <div className="p-8">
                    <NoInfo message="No timeline information" />
                </div>
            ) : (
                <div className="w-[550px]">
                    {loading && <Overlay message="" />}
                    <div className="flex gap-4 mb-4">
                        <div className="w-3/5">
                            <p className="text-xs font-bold">
                                Chief Information Security Officer for a Social
                                Media Mobile App
                            </p>
                            <p className="text-tiny font-extralight">
                                1 min ago
                            </p>
                        </div>
                        <div className="w-1/5">
                            <p className="text-tiny font-extralight">
                                Time Left
                            </p>
                            <div className="w-5">
                                <ProgressBar color="#344054" thickness={0.3} />{" "}
                            </div>
                            <div className="text-tiny">
                                <span className="text-xs font-semibold">
                                    3 days
                                </span>
                            </div>
                        </div>
                        <div className="w-1/5">
                            <p className="text-tiny font-extralight">
                                Location
                            </p>
                            <div className="w-5">
                                <ProgressBar color="#344054" thickness={0.3} />{" "}
                            </div>
                            <div className="text-tiny flex gap-2">
                                <span className="text-xs font-semibold">
                                    Lagos, Nigeria
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-tiny font-extralight capitalize">
                            {gigDetails.statusType}
                        </p>
                        <div className="w-24">
                            <ProgressBar
                                color="red"
                                thickness={2}
                                percent={40}
                                bg="#E1E1E1"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[#0072BB] text-xs">
                                Gig Timeline
                            </p>
                            <span
                                onClick={goBack}
                                className="text-xs text-gray-500 hover:underline cursor-pointer"
                            >
                                Back
                            </span>
                        </div>
                        <div className="flex gap-4 w-full mb-4">
                            <div className="pl-4 flex-1">
                                {gettingTimeLine ? (
                                    <p>Please wait...</p>
                                ) : (
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
                                                <TiimeLineBox
                                                    title={data.step1.title}
                                                >
                                                    <p className="font-small text-sm">
                                                        {data.step1.hoursAgo}{" "}
                                                        hours ago
                                                    </p>
                                                </TiimeLineBox>
                                            </li>
                                        )}
                                        {data?.step2?.isShown && (
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
                                                <TiimeLineBox
                                                    title={data.step2.title}
                                                >
                                                    <div className="mb-2">
                                                        <p className="font-small text-xs">
                                                            Duration
                                                        </p>
                                                        <div className="font-bold text-xs flex gap-2 items-center">
                                                            <LuTimerReset className="text-xl" />
                                                            {
                                                                data.step2
                                                                    .duration
                                                            }
                                                            hrs
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-400 rounded-sm"
                                                        style={{
                                                            height: "0.05rem",
                                                        }}
                                                    />
                                                    <div className="my-2">
                                                        <p className="font-small text-xs">
                                                            Time range
                                                        </p>
                                                        <div className="font-bold text-xs flex gap-2 items-center">
                                                            <IoTimeOutline className="text-xl" />
                                                            {
                                                                data.step2
                                                                    .startTime
                                                            }{" "}
                                                            -{" "}
                                                            {data.step2.endTime}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-500 rounded-sm"
                                                        style={{
                                                            height: "0.05rem",
                                                        }}
                                                    />
                                                    <div className="mt-2">
                                                        <p className="font-small text-xs">
                                                            Date
                                                        </p>
                                                        <div className="font-bold text-xs flex gap-2 items-center">
                                                            <CiCalendarDate className="text-xl" />
                                                            {data.step2.date}
                                                        </div>
                                                    </div>
                                                </TiimeLineBox>
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
                                                <TiimeLineBox
                                                    title={data.step3.title}
                                                >
                                                    {data.step3.status && (
                                                        <p className="mb-2 flex gap-2 items-center">
                                                            {data.step3.status}
                                                        </p>
                                                    )}
                                                    {data?.step3?.timeLeft && (
                                                        <div
                                                            className={`mb-2 flex justify-evenly max-w-64 bg-custom-gradient rounded-lg p-4`}
                                                        >
                                                            <div
                                                                className={
                                                                    "text-center text-white font-bold"
                                                                }
                                                            >
                                                                <p className="text-3xl">
                                                                    {hours}
                                                                </p>
                                                                <p className="font-extralight text-xs">
                                                                    hours
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    "text-center text-white font-bold"
                                                                }
                                                            >
                                                                <p className="text-3xl">
                                                                    {minutes}
                                                                </p>
                                                                <p className="font-extralight text-xs">
                                                                    minutes
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={
                                                                    "text-center text-white font-bold"
                                                                }
                                                            >
                                                                <p className="text-3xl">
                                                                    {seconds}
                                                                </p>
                                                                <p className="font-extralight text-xs">
                                                                    seconds
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </TiimeLineBox>
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
                                                <TiimeLineBox
                                                    title={data.step4.title}
                                                >
                                                    <p className="font-small text-sm">
                                                        {data.step4.message}
                                                    </p>
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
                                                <TiimeLineBox
                                                    title={data.step5.title}
                                                >
                                                    <p className="font-small text-sm">
                                                        {data.step5.message}
                                                    </p>
                                                    <p className="font-small text-sm">
                                                        {data.step5.comment}
                                                    </p>
                                                </TiimeLineBox>
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
                                                <TiimeLineBox
                                                    title={data.step6.title}
                                                />
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
                                                <TiimeLineBox
                                                    title={data.step7.title}
                                                />
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
                                                <TiimeLineBox
                                                    title={data.step8.title}
                                                >
                                                    <p className="text-sm mb-2">
                                                        {data?.step8?.message ||
                                                            "N/A"}
                                                    </p>

                                                    <div className="flex justify-between items-center">
                                                        <p className="text-lg text-primary font-bold mt-2">
                                                            Rating
                                                        </p>
                                                        <div className="flex gap-1 items-center">
                                                            <div className="flex gap-1">
                                                                {generateArray(
                                                                    5
                                                                ).map(
                                                                    (
                                                                        _,
                                                                        index
                                                                    ) => (
                                                                        <StarIcon
                                                                            key={Math.random()}
                                                                            filled={
                                                                                index +
                                                                                    1 <=
                                                                                data
                                                                                    .step8
                                                                                    .overallRate
                                                                            }
                                                                            size={
                                                                                0.8
                                                                            }
                                                                        />
                                                                    )
                                                                )}
                                                            </div>
                                                            <span className="text-sm ml-1">
                                                                {
                                                                    data.step8
                                                                        .overallRate
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TiimeLineBox>
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
                                                <TiimeLineBox
                                                    title={data.step9.title}
                                                />
                                            </li>
                                        )}
                                    </ol>
                                )}
                            </div>
                            <div className="p-4 border h-fit rounded-md text-xs mb-4 w-2/5">
                                <p className="mb-4">
                                    The sum of NGN{" "}
                                    <span className="font-semibold">
                                        {formatNumber(data.totalBudget, 2)}
                                    </span>{" "}
                                    will be deducted from GIG escrow account
                                </p>
                                <p
                                    className="text-adminPrimary font-bold cursor-pointer hover:underline select-none mb-2"
                                    onClick={() =>
                                        setOpenBreakDown((prev) => !prev)
                                    }
                                >
                                    {openBreakDown
                                        ? "Close Breakdown"
                                        : "See Fee Breakdown"}
                                </p>
                                {openBreakDown && (
                                    <div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-2/5">
                                                Gig Amount
                                            </div>
                                            <div className="flex-1">
                                                NGN{" "}
                                                {formatNumber(data.budget, 2)}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-2/5">Tip</div>
                                            <div className="flex-1">
                                                NGN {formatNumber(data.tips, 2)}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-2/5">
                                                Escrow Fee
                                            </div>
                                            <div className="flex-1">
                                                NGN{" "}
                                                {formatNumber(
                                                    data.escrowFee,
                                                    2
                                                )}{" "}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-2/5">
                                                Jobs Pro Fee
                                            </div>
                                            <div className="flex-1">
                                                NGN{" "}
                                                {formatNumber(
                                                    data.jobProFee,
                                                    2
                                                )}{" "}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 text-sm text-primary">
                                            <div className="w-2/5 font-bold">
                                                Total
                                            </div>
                                            <div className="flex-1 font-bold">
                                                NGN{" "}
                                                {formatNumber(
                                                    data.totalBudget,
                                                    2
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            className="border p-2 text-xs font-bold text-[#3514FF] bg-[#E9E5FF] rounded-md cursor-pointer w-fit"
                            onClick={() => payPro(gotoNextStep)}
                        >
                            Disburse Payment to Pro
                        </button>
                        <button
                            className="border p-2 text-xs font-bold text-[#3514FF] bg-[#E9E5FF] rounded-md cursor-pointer w-fit"
                            onClick={() => refundBusiness(gotoNextStep)}
                        >
                            Disburse Payment to Business
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

Step2.propTypes = {
    gotoNextStep: PropTypes.func,
    goBack: PropTypes.func,
    gigDetails: PropTypes.object,
};
