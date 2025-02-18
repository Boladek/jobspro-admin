import PropTypes from "prop-types";
import { ProgressBar } from "../progress-bar";
import { BaseTextArea } from "../../text-area";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { useState, useCallback } from "react";
import { formatNumber, timeAgo } from "../../../helpers/function";
import { ChatHook } from "../../../hooks/chat-hook";
import { ChatBox } from "../../chat-box";
import { NoInfo } from "../../no-info";

export function Step1({ gotoNextStep, gig }) {
    const { messages, sendMessage, loading } = ChatHook({
        channelId: gig.chatChannelUrl,
    });
    const [text, setText] = useState("");
    const [showComment, setShowComment] = useState(false);

    const handleSend = useCallback(() => {
        if (text.trim()) {
            sendMessage(text); // Uncomment this line to actually send the message
            setText("");
        }
    }, [sendMessage, text]);

    return (
        <div className="h-full flex flex-col gap-4">
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
                            NGN{" "}
                            <span className="text-xs font-semibold">
                                {formatNumber(gig.totalBudget, 2)}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/5">
                        <p className="text-tiny font-extralight">
                            Commission and Tax
                        </p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny">
                            NGN{" "}
                            <span className="text-xs font-semibold">
                                {formatNumber(gig?.tax, 2)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="w-3/5">
                        <p className="text-xs font-bold">
                            {gig.gigInfos?.[0].title}
                        </p>
                        <p className="text-tiny font-extralight">
                            {timeAgo(gig.createdAt)}
                        </p>
                    </div>
                    <div className="w-1/5">
                        <p className="text-tiny font-extralight">Time</p>
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
                        <p className="text-tiny font-extralight">Location</p>
                        <div className="w-5">
                            <ProgressBar color="#344054" thickness={0.3} />{" "}
                        </div>
                        <div className="text-tiny flex gap-2">
                            <span className="text-xs font-semibold">
                                {gig?.city?.name}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-tiny font-extralight">Status</p>
                    <div className="w-24">
                        <ProgressBar
                            color="red"
                            thickness={2}
                            percent={40}
                            bg="#E1E1E1"
                        />
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-tiny capitalize">{gig.statusType}</p>
                        {/* <p className="text-xs font-semibold">
                            Payment not made
                        </p> */}
                    </div>
                    {/* <div>
                        <p className="text-tiny">Complainant</p>
                        <p className="text-xs font-semibold">Okeke Chima</p>
                    </div>
                    <div>
                        <p className="text-tiny">Defendant</p>
                        <p className="text-xs font-semibold">GIG</p>
                    </div>
                    <div>
                        <p className="text-tiny">Dispute ID</p>
                        <p className="text-xs font-semibold">123456789</p>
                    </div> */}
                </div>
            </div>
            <div className="px-8 flex-1 overflow-y-auto">
                {loading ? (
                    <p>Please wait...</p>
                ) : messages.length > 0 ? (
                    messages.map(() => <ChatBox key={Math.random()} />)
                ) : (
                    <div className="p-8">
                        <NoInfo message="No messages sent between parties yet" />
                    </div>
                )}
            </div>
            <div className="px-8 pt-4 flex items-center">
                {showComment && (
                    <div className="w-full relative">
                        <span
                            className="absolute right-0 top-2 z-10 border p-1 rounded-full bg-gray-100"
                            onClick={() => setShowComment(false)}
                        >
                            <MdOutlineClose className="text-xl hover:opacity-60" />
                        </span>
                        <BaseTextArea
                            label="Finclusion Comment"
                            onChange={(e) => setText(e.target.value)}
                        />
                        <span className="absolute right-2 bottom-4 border z-10">
                            <IoSendSharp
                                className="text-2xl hover:opacity-60"
                                onClick={() => handleSend(text)}
                            />
                        </span>
                    </div>
                )}
                {!showComment && (
                    <>
                        <div className="text-xs font-bold">Action</div>
                        <div className="flex-1 flex justify-center gap-4">
                            <button
                                className="border p-2 text-xs font-bold text-[#3514FF] bg-[#E9E5FF] rounded-md cursor-pointer"
                                onClick={gotoNextStep}
                                disabled={gig.statusType !== "in-progress"}
                            >
                                Disburse Payment
                            </button>
                            <button
                                className="border p-2 text-xs font-bold text-[#1C4486] rounded-md cursor-pointer"
                                onClick={() => setShowComment(true)}
                                disabled={gig.statusType !== "in-progress"}
                            >
                                Make a comment
                            </button>
                            <button
                                className="border p-2 text-xs font-bold text-[#1C4486] rounded-md cursor-pointer"
                                disabled={gig.statusType !== "in-progress"}
                                onClick={gotoNextStep}
                            >
                                Close Dispute
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

Step1.propTypes = {
    gotoNextStep: PropTypes.func,
    gig: PropTypes.object,
};
