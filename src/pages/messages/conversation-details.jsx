import PropTypes from "prop-types";
import {
    formatNumber,
    generateArray,
    groupTransactionsByDate,
} from "../../helpers/function";
// import { ChatBox } from "./chat-box";
import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import { ChatHook } from "../../hooks/chat-hook";
import { UseMessage } from "../../context/messages-context";
import { UploadFile } from "./upload-file";
import { ChatBox } from "./chat-box";
// import { UploadFile } from "../gigs/gig-details/pro/upload-file";

export function ConversationDetails({}) {
    // const { user } = UseAuth();
    const chatEndRef = useRef(null);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { selectedChannel } = UseMessage();

    const { messages, sendMessage, loading, markMessagesAsRead } = ChatHook({
        channelId: selectedChannel?._url,
    });

    const groupedMessages = useMemo(() => {
        return groupTransactionsByDate(messages);
    }, [messages]);

    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleSend = useCallback(() => {
        if (text.trim()) {
            sendMessage(text); // Uncomment this line to actually send the message
            setText("");
        }
    }, [sendMessage, text]);

    const handleChange = (e) => {
        const { value } = e.target;
        setText(value);
    };

    const sendFile = useCallback(
        (file) => {
            sendMessage(file);
        },
        [sendMessage]
    );

    useEffect(() => {
        scrollToBottom();
        markMessagesAsRead();
    }, [messages, scrollToBottom, markMessagesAsRead]);

    return (
        <>
            <div
                className="rounded-[20px] max-w-lg w-full bg-[#F8FAFF] h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-adminPrimary text-white">
                    <div className="p-4 flex justify-between items-center rounded-t-lg border-b border-gray-300">
                        <div className="flex gap-2 items-center">
                            {selectedChannel?.coverUrl ? (
                                <img
                                    src={selectedChannel?.coverUrl}
                                    className="h-[36px] w-[36px] rounded-full"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                >
                                    <path
                                        fill="none"
                                        d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"
                                    />
                                </svg>
                            )}

                            <div className="text-xs">
                                <p>{selectedChannel?._name}</p>
                                <p className="font-bold">
                                    {formatNumber(
                                        selectedChannel?.memberCount || 0
                                    )}{" "}
                                    members
                                </p>
                            </div>
                        </div>
                        {/* <div
                            onClick={handleClose}
                            className="cursor-pointer hover:text-gray-300"
                        >
                            &#x2715;
                        </div> */}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 flex flex-col overflow-y-auto p-4 gap-2">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        generateArray(10).map(() => (
                            <ChatBox key={Math.random()} />
                        ))
                        // Object.keys(groupedMessages).map((date) => (
                        //     <div key={date} className="grid grid-cols-1 gap-1">
                        //         <DateSeparator date={date} />
                        //         {groupedMessages[date].map((message) => (
                        //             <ChatBox
                        //                 key={message.id}
                        //                 message={message}
                        //                 isUser={
                        //                     user.chatId ===
                        //                     message.sender.userId
                        //                 }
                        //             />
                        //         ))}
                        //     </div>
                        // ))
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 flex items-center gap-2 relative">
                    <span
                        className="absolute left-6 text-[#212121] z-1 rotate-45"
                        onClick={() => setOpen(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M18 15.75q0 2.6-1.825 4.425T11.75 22t-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.187T10 2t3.188 1.313T14.5 6.5v8.75q0 1.15-.8 1.95t-1.95.8t-1.95-.8t-.8-1.95V7q0-.425.288-.712T10 6t.713.288T11 7v8.25q0 .325.213.538t.537.212t.538-.213t.212-.537V6.5q-.025-1.05-.737-1.775T10 4t-1.775.725T7.5 6.5v9.25q-.025 1.775 1.225 3.013T11.75 20q1.75 0 2.975-1.237T16 15.75V7q0-.425.288-.712T17 6t.713.288T18 7z"
                            />
                        </svg>
                    </span>

                    <input
                        type="text"
                        className="w-full rounded-full pl-10 p-3"
                        style={{ border: "0.5px solid #525252" }}
                        value={text}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevents newline in input
                                handleSend();
                            }
                        }}
                    />
                    <span
                        onClick={handleSend}
                        className="border p-3 rounded-full bg-white flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
                            />
                        </svg>
                    </span>
                </div>
            </div>

            {open && (
                <UploadFile
                    open={open}
                    handleClose={() => setOpen(false)}
                    handlePicture={(file) => sendFile(file)}
                />
            )}
        </>
    );
}

ConversationDetails.propTypes = {
    handleClose: PropTypes.func,
};

const DateSeparator = ({ date }) => (
    <div className="flex items-center gap-2 w-full py-1">
        <div className="flex-1 bg-gray-500" style={{ height: "0.5px" }} />
        <p className="text-gray-500 text-[10px] font-[600]">{date}</p>
        <div className="flex-1 bg-gray-500" style={{ height: "0.5px" }} />
    </div>
);

DateSeparator.propTypes = {
    date: PropTypes.string.isRequired,
};

const LoadingSpinner = () => (
    <div
        role="status"
        className="w-full h-full flex flex-col justify-center items-center text-[#212121]"
    >
        <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
    </div>
);
