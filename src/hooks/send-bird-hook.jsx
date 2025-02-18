import { useCallback, useEffect, useState } from "react";

export function SendBirdHook({ sb, connected }) {
    const [chatState, setChatState] = useState({
        currentChannel: null,
        channels: [], // State to hold user's channels
        loading: true,
        error: null,
        totalUnreadMessages: 0,
    });

    const getUserChannels = useCallback(async () => {
        if (!sb) return;
        setChatState((prev) => ({ ...prev, loading: true }));
        try {
            const channelListQuery =
                await sb.groupChannel.createMyGroupChannelListQuery();
            // const totalUnreadMessages = await sb.getTotalUnreadMessageCount();
            const userChannels = await channelListQuery.next();
            setChatState((prev) => ({
                ...prev,
                channels: userChannels, // Set user's channels to state
                // totalUnreadMessages,
            }));
        } catch (err) {
            setChatState((prev) => ({ ...prev, error: err }));
        } finally {
            setChatState((prev) => ({ ...prev, loading: false }));
        }
    }, [sb]);

    useEffect(() => {
        if (sb && connected) {
            getUserChannels();
        }
    }, [sb, getUserChannels, connected]);

    return {
        channels: chatState.channels,
        error: chatState.error,
        loading: chatState.loading,
    };
}
