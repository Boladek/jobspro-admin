import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
// import { UseAuth } from "./auth-context";
import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";
// import { configKeys } from "../helpers/config";
import { SendBirdHook } from "../hooks/sendbird-hook";
import { configKeys } from "../helpers/config";
import { UseAuth } from "./auth-context";

const APP_ID = configKeys.sendBirdAppID;

const MessagesContext = createContext();

// Custom hook to use the MessagesContext
export const UseMessage = () => {
  return useContext(MessagesContext);
};

// MessagesProvider component
export const MessagesProvider = ({ children }) => {
  const { user } = UseAuth();
  const [sb, setSb] = useState(null);
  const [connected, setConnected] = useState(false);
  const { channels, loading, error } = SendBirdHook({ sb, connected });
  const [search, setSearch] = useState("");

  // Lazy initialization of selectedChannel
  const [selectedChannel, setSelectedChannel] = useState(
    () => channels?.[0] || null
  );

  // Memoize the handleSelectChannel function
  const handleSelectChannel = useCallback((channel) => {
    setSelectedChannel(channel);
  }, []);

  useEffect(() => {
    const initializeSendbird = async () => {
      try {
        const sendbird = await SendbirdChat.init({
          appId: APP_ID,
          modules: [new GroupChannelModule()],
        });
        await sendbird.connect(user.chatId, user.chatToken);
        setSb(sendbird);
        setConnected(true);
      } catch (err) {
        console.error("Sendbird connection error:", err);
      }
    };
    if (user.chatId && user.chatToken) {
      initializeSendbird();
    }
  }, [user.chatId, user.chatToken]);

  const filteredChannels = useMemo(() => {
    if (channels.length > 0) {
      return channels.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [search, channels]);

  const value = useMemo(
    () => ({
      channels: filteredChannels || [],
      selectedChannel: selectedChannel || channels?.[0],
      handleSelectChannel: handleSelectChannel,
      sb,
      loading,
      error,
      setSearch,
    }),
    [
      sb,
      selectedChannel,
      filteredChannels,
      channels,
      loading,
      error,
      handleSelectChannel,
      // setSearch,
    ]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

MessagesProvider.propTypes = {
  children: PropTypes.node,
};
