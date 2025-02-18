import PropTypes from "prop-types";
import { useState } from "react";
import { UseMessage } from "../../context/messages-context";
import { formatTime } from "../../helpers/function";
import { ChatHook } from "../../hooks/chat-hook";

export function ChannelBox({ channel }) {
    const [open, setOpen] = useState(false);
    const { unreadMessageCount } = ChatHook({ channelId: channel._url });
    const { handleSelectChannel, selectedChannel } = UseMessage();
    const isLastMessageUnread =
        channel.lastMessage.createdAt > channel.myLastRead;

    return (
        <>
            <div
                className={`hover:bg-gray-50 p-4 flex gap-4 items-center ${
                    selectedChannel._url === channel._url ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                    // setOpen(true);
                    handleSelectChannel(channel);
                }}
            >
                <div className="">
                    <img
                        src={channel?.coverUrl}
                        className="h-10 w-10 rounded-full"
                    />
                </div>
                <div className="flex-1 text-xs">
                    <p className="text-gray-400">
                        {channel?.lastMessage?.sender?.nickname}{" "}
                        {isLastMessageUnread && <span>| Unread</span>}
                    </p>
                    <p className="font-bold">{channel.name}</p>
                </div>
                <div className="text-tiny">
                    <p>
                        {unreadMessageCount > 0 && (
                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white">
                                {unreadMessageCount}
                            </span>
                        )}
                    </p>
                    <p>{formatTime(channel?.lastMessage?.createdAt)}</p>
                </div>
            </div>

            {/* {open && <ChatDetailsModal handleClose={() => setOpen(false)} />} */}
        </>
    );
}

ChannelBox.propTypes = {
    channel: PropTypes.object,
};
