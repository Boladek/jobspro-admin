import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSDK, CbEvents } from "open-im-sdk-wasm";
import { configKeys } from "../helpers/config";
import { isEmpty } from "../helpers/function";

const ChatContext = createContext();

export const UseChat = () => {
	return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
	const IMSDK = getSDK();
	const [messages, setMessages] = useState([]);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!isEmpty(user)) {
			const initIM = async () => {
				try {
					IMSDK.getLoginStatus()
						.then(({ data }) => {
							// data: LoginStatus
							return;
						})
						.catch(({ errCode, errMsg, data }) => {
							console.log({ data, errMsg });
							// Call failed
							// console.log({ errCode, errMsg });
							IMSDK.login({
								userID: user.openIMUserID,
								token: user.openIMToken,
								platformID: 5,
								wsAddr: configKeys.wsAddress,
								apiAddr: configKeys.apiAddress,
							});
						});
					// console.log({ check });

					// await IMSDK.login({
					// 	userID: user.openIMUserID,
					// 	token: user.openIMToken,
					// 	platformID: 5,
					// 	wsAddr: configKeys.wsAddress,
					// 	apiAddr: configKeys.apiAddress,
					// });
				} catch (err) {
					console.error("Initialization error", err);
				}
			};
			initIM();
		}
	}, [user, IMSDK]);

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
				// setMessages((prevMessages) => [...prevMessages, data]);
				console.log({ data });
			})
			.catch((err) => console.log(err));
	};

	const handleSendFile = ({ file, recvID, groupID }) => {
		IMSDK.createFileMessageByFile({
			filePath: file.path || "",
			fileName: file.name,
			uuid: file.name + Date.now(),
			sourceUrl: "",
			fileSize: file.size,
			fileType: file.type,
			file: file,
		})
			.then(({ data }) => {
				return IMSDK.sendMessage({
					recvID: recvID ?? "",
					groupID: groupID ?? "",
					message: data,
				});
			})
			.then(({ data }) => {
				setMessages((prevMessages) => [...prevMessages, data]);
				console.log({ data });
			})
			.catch((err) => console.log(err));
	};

	// console.log({ CbEvents });

	const login = async ({ userID, token }) => {
		try {
			// await initIM();
			await IMSDK.login({
				userID,
				token,
				platformID: 5,
				wsAddr: configKeys.wsAddress,
				apiAddr: configKeys.apiAddress,
			});
			// console.log("Login successful", loginResponse);
		} catch (err) {
			console.error("Login error", err);
		}
	};

	useEffect(() => {
		const handleConnecting = () => {
			// console.log("Connecting...");
		};

		const handleConnectSuccess = () => {
			// console.log("Connected successfully");
		};

		const handleConnectFailed = (err) => {
			console.error("Connection failed", err);
		};

		const handleNewMessages = ({ data }) => {
			data.forEach((item) => {
				setMessages((prevMessages) => [...prevMessages, item]);
			});
			console.log("New message received", data);
		};

		IMSDK.on(CbEvents.OnConnecting, handleConnecting);
		IMSDK.on(CbEvents.OnConnectSuccess, handleConnectSuccess);
		IMSDK.on(CbEvents.OnConnectFailed, handleConnectFailed);
		IMSDK.on(CbEvents.OnRecvNewMessages, handleNewMessages);

		return () => {
			IMSDK.off(CbEvents.OnConnecting, handleConnecting);
			IMSDK.off(CbEvents.OnConnectSuccess, handleConnectSuccess);
			IMSDK.off(CbEvents.OnConnectFailed, handleConnectFailed);
			IMSDK.off(CbEvents.OnRecvNewMessages, handleNewMessages);
		};
	}, [IMSDK]);

	const value = {
		chatLogin: login,
		sendMessage: handleSendMessage,
		handleSendFile,
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
