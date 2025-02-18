import { useState } from "react";
import { Notifications } from "./notifications";
import { PublishNotification } from "./publish-notification";
import { Calendar } from "../admin/landing-page/calendar";
import { DateHook } from "../../hooks/date-hook";
import { PushNotificationSideBar } from "./push-notification-sidebar";

export function PushNotificationsPage() {
    const { startDate, endDate, setEndDate, setStartDate } = DateHook();
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center h-full p-4 gap-4">
            <div className="h-full w-64 hidden md:block">
                <PushNotificationSideBar />
            </div>
            <div className="h-full flex-1 space-y-4">
                <div className="flex justify-between gap-4 items-center">
                    <div className="px-4 p-2 rounded-full font-[600] text-[12px] text-[#1A68FF] bg-[#E5EEFF] flex items-center gap-2">
                        Publish Notification
                        <span className="-rotate-45 border bg-[#1A68FF] rounded-full p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="white"
                                    d="m12.815 12.197l-7.532 1.255a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.942l18-9a.75.75 0 0 0 0-1.341l-18-9c-.614-.307-1.283.303-1.035.942l2.598 6.958a.5.5 0 0 0 .386.318l7.532 1.255a.2.2 0 0 1 0 .395"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center flex-1">
                        <div className="text-[12px] bg-[#D0D5DD] flex gap-4 p-2 px-4 rounded-md">
                            Delivered <span className="font-[700]">200k</span>
                        </div>
                        <div className="text-[12px] bg-[#D0D5DD] flex gap-4 p-2 px-4 rounded-md">
                            Queued <span className="font-[700]">200k</span>
                        </div>
                        <div className="text-[12px] bg-[#D0D5DD] flex gap-4 p-2 px-4 rounded-md">
                            Failed <span className="font-[700]">200k</span>
                        </div>
                    </div>
                    <div>
                        <Calendar
                            startDate={startDate}
                            endDate={endDate}
                            handleEndDate={(arg) => setEndDate(arg)}
                            handleStartDate={(arg) => setStartDate(arg)}
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            className="border-gray-300 text-[10px] rounded-md flex-1 px-3 focus:border-gray-400 focus:outline-none focus:ring-0 w-full"
                            placeholder="search by name"
                        />
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="h-[35px] w-[35px] flex items-center text-[16px] justify-center bg-black text-white rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                            />
                        </svg>
                    </button>
                </div>
                <div>
                    <Notifications />
                </div>
            </div>

            {open && <PublishNotification handleClose={() => setOpen(false)} />}
        </div>
    );
}
