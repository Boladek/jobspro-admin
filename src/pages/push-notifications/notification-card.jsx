import { useState, useEffect, useRef } from "react";
import { timeAgo } from "../../helpers/function";

export function NotificationCard() {
    const [showOption, setShowOption] = useState(false);
    const optionsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target)
            ) {
                setShowOption(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border p-4 bg-[#FAFAFA] rounded-[10px] grid grid-cols-1 gap-4">
            <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                    <div className="h-[30px] w-[30px] bg-gray-400 rounded-[6px]" />
                    <div className="h-[5px] rounded-[20px] w-[40px] bg-red-500" />
                </div>
                <span
                    className="cursor-pointer relative"
                    onClick={() => setShowOption(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M4.5 12a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m6 0a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"
                            clipRule="evenodd"
                        />
                    </svg>

                    {showOption && (
                        <ul
                            ref={optionsRef}
                            className="absolute top-4 right-0 bg-white shadow-md rounded-[6px] border-[#938F8F] text-[12px]"
                        >
                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-2 items-center font-[600]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M4 21V5h3.385V2.77h1.077V5h7.154V2.77h1V5H20v6.616h-1v-1H5V20h6.846v1zm10.23 0v-2.21l5.96-5.934l2.19 2.204L16.44 21zm5.96-4.985l.925-.956l-.924-.943l-.95.95z"
                                    />
                                </svg>
                                Edit
                            </li>
                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-2 items-center font-[600]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m12 12.708l3.246 3.246q.14.14.344.15t.364-.15t.16-.354t-.16-.354L12.708 12l3.246-3.246q.14-.14.15-.344t-.15-.364t-.354-.16t-.354.16L12 11.292L8.754 8.046q-.14-.14-.344-.15t-.364.15t-.16.354t.16.354L11.292 12l-3.246 3.246q-.14.14-.15.345q-.01.203.15.363t.354.16t.354-.16zM12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                                    />
                                </svg>
                                Cancel
                            </li>
                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-2 items-center font-[600]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M11.962 20q-2.881 0-5.066-1.778T4.141 13.7q-.062-.221.065-.41q.126-.187.342-.217q.202-.03.364.093t.229.35q.542 2.384 2.446 3.934T11.962 19q2.925 0 4.962-2.037T18.962 12t-2.038-4.963T11.962 5q-1.553 0-2.918.656q-1.365.655-2.41 1.805h1.981q.213 0 .357.144t.143.357t-.143.356t-.357.143H5.77q-.343 0-.575-.232t-.232-.575V4.808q0-.213.144-.356t.356-.144t.356.144t.144.356v1.888q1.16-1.273 2.718-1.984T11.962 4q1.665 0 3.119.626t2.541 1.714t1.714 2.54t.626 3.119t-.626 3.12t-1.714 2.542t-2.541 1.713t-3.12.626m0-7q-.401 0-.7-.299t-.3-.701t.3-.701t.7-.299t.702.299t.299.701t-.3.701t-.7.299"
                                    />
                                </svg>
                                Resend
                            </li>
                        </ul>
                    )}
                </span>
            </div>
            <div>
                <p className="text-[12px] font-[600]">Happy Holiday’s</p>
                <p className="text-[10px] font-[300]">
                    We at jobs pro celebrate with yoo today, during this festive
                    season
                </p>
            </div>
            <div className="flex justify-between text-[12px]">
                <div className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M12.91 4.02q0-.413.307-.661q.308-.247.687-.167q2.644.535 4.528 2.434t2.407 4.543q.08.367-.156.638q-.236.27-.646.27h-5.314q-.08 0-.141-.04t-.101-.122q-.225-.467-.59-.834q-.364-.367-.82-.567q-.08-.04-.121-.09t-.04-.128zm-2.82 16.763q-3.061-.68-5.063-3.124T3.025 12q0-3.229 2.002-5.673t5.064-3.11q.403-.086.726.186q.324.273.324.697v5.223q0 .023-.131.185q-.754.311-1.216.991t-.461 1.505t.461 1.486q.462.66 1.216.952q.03.006.13.181V19.9q0 .424-.323.697t-.726.186m3.726.03q-.367.062-.637-.171t-.27-.6V14.68q0-.081.04-.141t.121-.101q.481-.206.844-.57t.566-.82q.006-.013.235-.163h5.32q.368 0 .613.308t.165.687q-.548 2.644-2.45 4.528t-4.547 2.407"
                        />
                    </svg>
                    <span>120</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M17 13a4 4 0 0 1 0 8c-2.142 0-4-1.79-4-4h-2a4 4 0 1 1-.535-2h3.07A4 4 0 0 1 17 13M2 12v-2h2V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3h2v2z"
                        />
                    </svg>
                    <span>120</span>
                </div>
                <div className="text-[10px] px-4 p-1 rounded-full bg-[#ECECEC]">
                    {timeAgo(new Date())}
                </div>
            </div>
        </div>
    );
}
