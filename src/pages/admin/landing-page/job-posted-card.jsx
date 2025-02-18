import { LocationIcon } from "../../../assets/admin/location-icon";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { object } from "prop-types";
import { timeAgo } from "../../../helpers/function";
import { DisputeSideBar } from "../../../component/admin/dispute-sidebar";
import { useState } from "react";

export function JobPostedCard({ gig }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="p-3 border border-[#1A68FF] rounded-lg w-full">
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="bg-[#1A68FF] p-3 text-white font-bold text-sm rounded-lg">
                        PG
                    </div>
                    <div className="text-xs">
                        <p className="font-semibold">
                            {gig.gigInfos[0].isExperienced
                                ? "Expert"
                                : "Beginner"}
                        </p>
                        <div className="h-0.5 bg-[#344054] rounded-full w-4 mt-0.5"></div>
                        {/* <p className="text-[#344054] text-[10px] font-extralight">
							Level Needed
						</p> */}
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <LocationIcon />
                    <span>{gig.city.name}</span>
                </div>
            </div>
            <div className="mb-3 text-xs">
                <p className="font-semibold">{gig.gigInfos[0].title}</p>
                <p className="font-extralight text-xs">
                    {timeAgo(gig.createdAt)}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-24">
                    <p className="text-[10px] text-gray-500 mb-1">
                        Applications{" "}
                        <span className="font-bold ml-1 text-dark">
                            {gig.applicationCount}
                        </span>
                    </p>
                    <ProgressBar thickness={1} color="#1A68FF" bg="#E1E1E1" />
                </div>
                <span
                    className="text-dark hover:underline text-xs cursor-pointer capitalize font-semibold"
                    onClick={() => setOpen(true)}
                >
                    view
                </span>
            </div>

            {open && (
                <DisputeSideBar
                    open={open}
                    handleClose={() => setOpen(false)}
                    gig={gig}
                />
            )}
        </div>
    );
}

JobPostedCard.propTypes = {
    gig: object,
};
