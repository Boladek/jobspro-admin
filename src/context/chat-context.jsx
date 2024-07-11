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
	// console.log({ user });

	const handleLogin = ({ userID, token }) => {
		const config = {
			userID: userID, // IM user userID
			token: token, // Your token here
			platformID: 5, // Current login platform number
			apiAddr: configKeys.apiAddress, // IM API address
			wsAddr: configKeys.wsAddress, // IM WS address
		};

		IMSDK.login(config)
			.then((res) => {
				console.log("Login successful", res);
			})
			.catch((err) => {
				console.error("Login failed", err);
				console.error("Error details:", err.stack || err.message);
			});
	};

	const handleSendMessage = ({ message, recvID, groupID }) => {
		IMSDK.createTextMessage(message)
			.then((data) => {
				// console.log(data, "created message");
				return IMSDK.sendMessage({
					recvID: recvID ?? "",
					groupID: groupID ?? "",
					message: data.data,
				});
			})
			.then(({ data }) => {
				// console.log(data, "send Message");
				// Successful call
				getPersonalConversion({ recvID });
			})
			.catch((err) => console.log(err));
	};

	const handleSendFile = ({ message }) => {
		IMSDK.createTextMessage(message)
			.then((data) => {
				console.log({ message: "Message created!", data });
				IMSDK.sendMessage({
					recvID: "11111112",
					groupID: "",
					message: data.data,
				})
					.then(({ data }) => {
						// Successful call
						console.log("Message sent now!", data);
					})
					.catch((err) => {
						// Failed call
						console.log("message not sent", err);
					});
			})
			.catch((err) => console.log(err));
	};

	const handleChatLogout = async () => {
		await IMSDK.logout();
	};

	const getPersonalConversion = ({ recvID }) => {
		IMSDK.getOneConversation({
			sourceID: recvID,
			sessionType: 1,
		})
			.then(({ data }) => {
				// Success
				console.log({ data });
				console.log(
					"************************************************************************************************"
				);
				// return data;
			})
			.catch(({ errCode, errMsg }) => {
				// Error
				console.log({ errMsg });
			});
	};

	const fetchChatHistory = async ({ recvID }) => {
		try {
			const history = await IMSDK.getHistoryMessageList({
				userID: recvID, // or groupID if fetching group chat history
				count: 50, // Number of messages to fetch
				startMsgID: "", // Optional: starting point for pagination
			});

			setMessages(history);
		} catch (err) {
			console.error("Error fetching chat history", err);
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

		IMSDK.on(CbEvents.OnConnecting, handleConnecting);
		IMSDK.on(CbEvents.OnConnectSuccess, handleConnectSuccess);
		IMSDK.on(CbEvents.OnConnectFailed, handleConnectFailed);

		const wsAddr = configKeys.wsAddress;
		const apiAddr = configKeys.apiAddress;

		const initIM = async () => {
			try {
				await IMSDK.init({ platformID: 5, wsAddr, apiAddr });
				await IMSDK.login({
					userID: user.openIMUserID,
					token: user.openIMToken,
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
		};
	}, [IMSDK, user]);

	const value = {
		sendMessage: handleSendMessage,
		sendFile: handleSendFile,
		chatLogout: handleChatLogout,
		chatLogin: handleLogin,
		getConvo: fetchChatHistory,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
	children: PropTypes.node,
};
