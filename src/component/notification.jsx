import { object, func } from "prop-types";
import { ProgressBar } from "./admin/progress-bar";
import { RewindIcon } from "../assets/rewind-icon";
import { ForwardIcon } from "../assets/forward-icon";

export function Notification({ notification, markAsRead }) {
	const isRead = notification.isRead;

	return (
		<div
			className="p-2 flex gap-2 items-center hover:bg-gray-100 cursor-pointer"
			onClick={() => {
				if (!isRead) {
					markAsRead(notification.uuid);
				}
			}}
		>
			<div className="p-3 rounded-lg bg-[#FEDF00]">
				{isRead ? <RewindIcon fill="#000" /> : <ForwardIcon fill="#000" />}
			</div>
			<div className="flex-1 text-xs">
				<p>
					<span className="text-adminPrimary font-bold">JobsPro</span> |{" "}
					<span className="font-bold">{notification.subject}</span>
				</p>
				<p>{notification.message}</p>
			</div>
			<div className="w-1/12">
				<p className="text-tiny mb-0.5 text-gray-600">
					{isRead ? "Read" : "Unread"}
				</p>
				<div className="w-6">
					<ProgressBar color={isRead ? "#14FF9C" : "#FE005B"} thickness={1.2} />
				</div>
			</div>
		</div>
	);
}

Notification.propTypes = {
	notification: object.isRequired,
	markAsRead: func.isRequired,
};
