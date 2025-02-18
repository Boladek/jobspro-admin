import PropTypes from "prop-types";
import { useState } from "react";
import { DisputeSideBar } from "../../../../component/admin/dispute-sidebar";
import { ProgressBar } from "../../../../component/admin/progress-bar";
import { formatNumber, timeAgo } from "../../../../helpers/function";

export function JobsCard({ gig }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="p-4 border rounded-lg">
                <div className="flex gap-4 mb-4">
                    <div className="w-3/5 flex gap-2 items-center">
                        <div className="bg-[#1A68FF] text-white p-2 rounded-lg font-bold">
                            PG
                        </div>
                    </div>
                    <div className="w-1/5">
                        <p className="text-xs font-extralight">Job Cost</p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny">
                            NGN{" "}
                            <span className="text-sm font-semibold">
                                {formatNumber(gig.totalBudget, 2)}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/5">
                        <p className="text-xs font-extralight">
                            Commission and Tax
                        </p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny">
                            NGN{" "}
                            <span className="text-sm font-semibold">
                                {formatNumber(gig.tax || 0, 2)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="w-3/5">
                        <p className="text-xs font-bold">
                            {gig.gigInfos[0].title}
                        </p>
                        <p className="text-tiny font-extralight">
                            {timeAgo(gig.createdAt)}
                        </p>
                    </div>
                    <div className="w-1/5">
                        <p className="text-xs font-extralight">Time Left</p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny">
                            <span className="text-sm font-semibold">
                                {timeAgo(gig.gigDate)}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/5">
                        <p className="text-xs font-extralight">Location</p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny flex gap-2">
                            <span className="text-sm font-semibold">
                                {gig.city.name}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-between">
                    <div className="w-3/5">
                        <p className="text-tiny font-extralight">
                            {gig.statusType}
                        </p>
                        <div className="w-24">
                            <ProgressBar color="red" thickness={1.5} />
                        </div>
                    </div>

                    <div className="">
                        <span
                            className="text-xs text-[#1C4486] font-semibold cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            View
                        </span>
                    </div>
                </div>
            </div>

            {open && (
                <DisputeSideBar
                    gig={gig}
                    open={open}
                    handleClose={() => setOpen(false)}
                />
            )}
        </>
    );
}

JobsCard.propTypes = {
    gig: PropTypes.object,
};
