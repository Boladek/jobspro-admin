import React from "react";
import { string, bool, object } from "prop-types";
import { UseAuth } from "../context/auth-context";

export function GigChatComponent({
	isUser,
	text,
	userName,
	partyName,
	message,
}) {
	console.log({ message });

	return (
		<div
			className={`${!isUser ? "mr-auto" : "ml-auto"} w-fit py-2`}
			style={{ maxWidth: "80%" }}
		>
			<div
				className={`${
					!isUser ? "flex-row-reverse" : ""
				} flex w-full gap-2 items-center text-tiny mb-1`}
			>
				<div>{formatTime(message.sendTime)}</div>
				<div className="bg-gray-300 flex-1" style={{ height: "1px" }} />
				<span className="font-bold">{!isUser ? "Other Party" : userName}</span>
			</div>
			<div
				className={`${
					!isUser ? "bg-[#004D7A] text-white" : "bg-adminPrimary/5 border"
				} w-full text-tiny p-4 rounded-2xl text-wrap`}
			>
				{message.textElem.content}
			</div>
		</div>
	);
}

GigChatComponent.propTypes = {
	isUser: bool,
	userName: string,
	text: string,
	partyName: string,
	message: object,
};

function formatTime(timestamp) {
	// Create a new Date object from the timestamp
	const date = new Date(timestamp);

	// Extract hours and minutes
	let hours = date.getHours();
	const minutes = date.getMinutes();

	// Determine AM/PM suffix
	const ampm = hours >= 12 ? "pm" : "am";

	// Convert hours from 24-hour to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	// Format minutes to always be two digits
	const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

	// Construct the final time string
	const timeString = hours + ":" + formattedMinutes + ampm;

	return timeString;
}
