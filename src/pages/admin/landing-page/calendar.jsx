import PropTypes from "prop-types";
import { formatDate } from "../../../helpers/function";
import calender from "../../../assets/calendar.png";
import { Modal } from "../../../component/modal";
import { useState } from "react";
import { BaseInput } from "../../../component/input";

function parseDate(date) {
	return new Date(date).toISOString().split("T")[0];
}

export function Calendar({
	startDate,
	endDate,
	handleStartDate,
	handleEndDate,
}) {
	const [open, setOpen] = useState(false);
	return (
		<div
			className="border px-2 py-2 rounded-full flex items-center gap-1 text-xs"
			onClick={() => setOpen(true)}
		>
			<span>{formatDate(startDate)}</span>
			<span>-</span>
			<span>{formatDate(endDate)}</span>
			<img src={calender} alt="Calendar" className="h-5 ml-1" />
			{open && (
				<Modal open={open} handleClose={() => setOpen(false)} maxWidth={400}>
					<div className="p-4">
						<div>
							<BaseInput
								label="Start Date"
								type="date"
								value={parseDate(startDate)}
								onChange={(e) => handleStartDate(e.target.value)}
							/>
						</div>
						<br />
						<div>
							<BaseInput
								label="End Date"
								type="date"
								value={parseDate(endDate)}
								onChange={(e) => handleEndDate(e.target.value)}
							/>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

Calendar.propTypes = {
	endDate: PropTypes.any,
	startDate: PropTypes.string,
	handleStartDate: PropTypes.func,
	handleEndDate: PropTypes.func,
};
