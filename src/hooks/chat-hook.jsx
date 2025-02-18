import { useEffect, useState, useCallback, useMemo } from "react";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";
import { UseMessage } from "../context/messages-context";

export const ChatHook = ({ channelId }) => {
    const { sb } = UseMessage();
    const [chatState, setChatState] = useState({
        connected: false,
        currentChannel: null,
        messages: [],
        channels: [],
        loading: false,
        error: null,
        unreadMessageCount: 0,
    });

    const {
        currentChannel,
        messages,
        channels,
        loading,
        error,
        unreadMessageCount,
    } = chatState;

    // Send text or file message based on input type
    const sendMessage = useCallback(
        async (messageText) => {
            if (!sb || !channelId || !messageText) return;

            try {
                const groupChannel = await sb.groupChannel.getChannel(
                    channelId
                );
                const isText = typeof messageText === "string";
                const messageOperation = isText
                    ? groupChannel.sendUserMessage({ message: messageText })
                    : groupChannel.sendFileMessage({
                          file: messageText,
                          fileName: messageText.name,
                          fileSize: messageText.size,
                          mimeType: messageText.type,
                      });

                messageOperation
                    .onSucceeded((message) => {
                        setChatState((prev) => ({
                            ...prev,
                            messages: [...prev.messages, message],
                        }));
                    })
                    .onFailed((err) => {
                        setChatState((prev) => ({ ...prev, error: err }));
                    });
            } catch (err) {
                setChatState((prev) => ({ ...prev, error: err }));
            }
        },
        [sb, channelId]
    );

    const markMessagesAsRead = useCallback(async () => {
        if (!sb || !channelId) return;
        let retries = 3;
        while (retries > 0) {
            try {
                const groupChannel = await sb.groupChannel.getChannel(
                    channelId
                );
                await groupChannel.markAsRead();
                setChatState((prev) => ({ ...prev, unreadMessageCount: 0 }));
                break; // Exit loop on success
            } catch (err) {
                console.error("Error marking messages as read: ", err);
                retries--;
                if (retries === 0) {
                    setChatState((prev) => ({
                        ...prev,
                        error: new Error(
                            "Failed to mark messages as read after retries."
                        ),
                    }));
                }
            }
        }
    }, [sb, channelId]);

    useEffect(() => {
        if (!sb || !channelId) return;

        let isMounted = true;
        const setupMessageHandler = async () => {
            setChatState((prev) => ({ ...prev, loading: true }));

            try {
                const handler = new GroupChannelHandler();
                handler.onMessageReceived = (_channel, message) => {
                    if (isMounted) {
                        setChatState((prev) => ({
                            ...prev,
                            messages: [...prev.messages, message],
                        }));
                    }
                };

                sb.groupChannel.addGroupChannelHandler(channelId, handler);

                const channel = await sb.groupChannel.getChannel(channelId);
                const unreadCount = channel.unreadMessageCount;

                const messageQuery = channel.createPreviousMessageListQuery();
                messageQuery.limit = 100;
                const loadedMessages = await messageQuery.load();

                if (isMounted) {
                    setChatState((prev) => ({
                        ...prev,
                        messages: [...loadedMessages],
                        unreadMessageCount: unreadCount,
                        currentChannel: channel,
                    }));
                }
            } catch (err) {
                if (isMounted) {
                    setChatState((prev) => ({ ...prev, error: err }));
                }
            } finally {
                if (isMounted) {
                    setChatState((prev) => ({ ...prev, loading: false }));
                }
            }
        };

        setupMessageHandler();

        return () => {
            isMounted = false;
            sb.groupChannel.removeGroupChannelHandler(channelId);
        };
    }, [sb, channelId]);

    const filteredMessages = useMemo(
        () =>
            messages.filter(
                (msg) =>
                    msg.messageType === "user" || msg.messageType === "file"
            ),
        [messages]
    );

    return {
        currentChannel,
        messages: filteredMessages,
        sendMessage,
        loading,
        error,
        channels,
        markMessagesAsRead,
        unreadMessageCount,
    };
};
