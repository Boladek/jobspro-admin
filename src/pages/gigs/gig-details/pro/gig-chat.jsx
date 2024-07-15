import { useRef, useState, useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSendSharp } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { generateArray } from "../../../../helpers/function";
import { UploadFile } from "../pro/upload-file";
import { UseAuth } from "../../../../context/auth-context";
import PropTypes from "prop-types";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { UseChat } from "../../../../context/chat-context";
import { GigChatComponent } from "../../../../component/gig-chat-component";

export function GigChat({ gig }) {
	const chatEndRef = useRef(null);

	// Function to scroll to the bottom
	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Scroll to the bottom whenever messages change

	const { name, user } = UseAuth();
	const { sendMessage, messages } = UseChat();
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");

	const handleSend = () => {
		const receivedId = gig?.user?.openIMUserID;
		sendMessage({ message: text, recvID: receivedId });
		setText("");
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setText(value);
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div
			className="p-2 px-4 md:px-8 max-w-xl mx-auto flex flex-col border"
			style={{ height: "80vh" }}
		>
			<div className="p-2 rounded-md bg-adminPrimary/20 flex gap-2 items-center">
				<TbPinFilled className="text-xl" />
				<div className="flex-1 md:flex justify-between text-tiny items-center">
					<div className="flex gap-1">
						<span>GIG -</span>
						<span className="font-bold">{gig?.gigInfos[0]?.title}</span>
					</div>

					<span className="text-base cursor-pointer">
						<IoEllipsisVerticalSharp />
					</span>
				</div>
			</div>

			<div className="p-2 flex-1 overflow-y-auto">
				{messages.map((message) => (
					<GigChatComponent
						key={message.clientMsgID}
						message={message}
						isUser={user.openIMUserID === message.sendID}
						userName={name}
					/>
				))}
				<div ref={chatEndRef} />
			</div>
			<div className="p-2 border rounded-md flex items-center gap-1">
				<span onClick={() => setOpen(true)}>
					<GrAttachment className="text-2xl" />
				</span>
				<textarea
					type="text"
					className="flex-1 border-0 resize-none text-sm h-9 max-h-fit focus:outline-none focus:ring-0 focus:border-transparent"
					onChange={handleChange}
					value={text}
				/>
				<button onClick={handleSend}>
					<IoSendSharp className="text-2xl hover:opacity-60" />
				</button>
			</div>

			{open && (
				<UploadFile
					open={open}
					handleClose={() => setOpen(false)}
					handlePicture={() => null}
				/>
			)}
		</div>
	);
}

GigChat.propTypes = {
	gig: PropTypes.object,
};
