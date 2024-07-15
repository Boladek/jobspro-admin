import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSDK, CbEvents } from "open-im-sdk-wasm";
import { configKeys } from "../helpers/config";
import { isEmpty } from "../helpers/function";

// Create ChatContext
const ChatContext = createContext();

// Create a custom hook to use the AuthContext
export const UseChat = () => {
	return useContext(ChatContext);
};

// Create ChatProvider component
export const ChatProvider = ({ children }) => {
	const IMSDK = getSDK();
	const [messages, setMessages] = useState([]);
	const { user } = useSelector((state) => state.auth);

	const handleSendMessage = ({ message, recvID, groupID }) => {
		IMSDK.createTextMessage(message)
			.then((data) => {
				return IMSDK.sendMessage({
					recvID: recvID ?? "",
					groupID: groupID ?? "",
					message: data.data,
				});
			})
			.then(({ data }) => {
				setMessages((prevMessages) => [...prevMessages, data]);
				console.log({ data });
			})
			.catch((err) => console.log(err));
	};

	// useEffect(() => {
	// 	localStorage.setItem("chatMessages", JSON.stringify(messages));
	// }, [messages]);

	// useEffect(() => {
	// 	const storedMessages = localStorage.getItem("chatMessages");
	// 	if (storedMessages) {
	// 		setMessages(JSON.parse(storedMessages));
	// 	}
	// }, []);

	const login = async ({ userID, token }) => {
		console.log({ configKeys });
		try {
			// await initIM();
			const loginResponse = await IMSDK.login({
				userID,
				token,
				platformID: 5,
				wsAddr: configKeys.wsAddress,
				apiAddr: configKeys.apiAddress,
			});
			console.log("Login successful", loginResponse);
		} catch (err) {
			console.error("Login error", err);
		}
	};

	useEffect(() => {
		const handleConnecting = () => {
			console.log("Connecting...");
		};

		const handleConnectSuccess = () => {
			console.log("Connected successfully");
		};

		const handleConnectFailed = (err) => {
			console.error("Connection failed", err);
		};

		const handleNewMessages = ({ data }) => {
			data.forEach((item) => {
				setMessages((prevMessages) => [...prevMessages, item]);
			});
			// Update the state with the new incoming message

			console.log("New message received", data);
		};

		IMSDK.on(CbEvents.OnConnecting, handleConnecting);
		IMSDK.on(CbEvents.OnConnectSuccess, handleConnectSuccess);
		IMSDK.on(CbEvents.OnConnectFailed, handleConnectFailed);
		IMSDK.on(CbEvents.OnRecvNewMessages, handleNewMessages);

		const initIM = async () => {
			try {
				// console.log({ user });
				await IMSDK.login({
					userID: user.openIMUserID,
					token: user.openIMToken,
					platformID: 5,
					wsAddr: configKeys.wsAddress,
					apiAddr: configKeys.apiAddress,
				});
			} catch (err) {
				console.error("Initialization error", err);
			}
		};

		if (!isEmpty(user)) {
			initIM();
		}

		return () => {
			IMSDK.off(CbEvents.OnConnecting, handleConnecting);
			IMSDK.off(CbEvents.OnConnectSuccess, handleConnectSuccess);
			IMSDK.off(CbEvents.OnConnectFailed, handleConnectFailed);
			IMSDK.off(CbEvents.OnRecvNewMessages, handleNewMessages);
		};
	}, [IMSDK, user]);

	const value = {
		chatLogin: login,
		sendMessage: handleSendMessage,
		chatLogout: async () => {
			await IMSDK.logout();
		},
		getConvo: async ({ recvID }) => {
			try {
				const history = await IMSDK.getHistoryMessageList({
					userID: recvID,
					count: 50,
					startMsgID: "",
				});
				setMessages(history);
			} catch (err) {
				console.error("Error fetching chat history", err);
			}
		},
		messages: messages,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
	children: PropTypes.node,
};
