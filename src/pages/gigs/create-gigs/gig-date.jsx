import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "../../../component/button";
import {
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isToday,
	startOfMonth,
} from "date-fns";
import { useForm } from "react-hook-form";
import { BaseInput } from "../../../component/input";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function GigDate({ handleForm, gotoNextStep, goBack }) {
	const [selected, setSelected] = useState(null);

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const watchStarTime = watch("startTime");

	const [currentMonth, setCurrentMonth] = useState(new Date());
	const firstDayOfMonth = startOfMonth(currentMonth);
	const lastDayOfMonth = endOfMonth(currentMonth);

	function getNextMonth() {
		const today = new Date();

		const nextMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			today.getDay()
		);
		setCurrentMonth(nextMonth);
	}

	function getPreviousMonth() {
		const nextMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() - 1
		);
		setCurrentMonth(nextMonth);
	}

	const daysInMonth = eachDayOfInterval({
		start: firstDayOfMonth,
		end: lastDayOfMonth,
	});

	const startingDayIndex = getDay(firstDayOfMonth);

	const onSubmit = (data) => {
		const formData = {
			gigDate: format(selected, "yyyy-MM-dd"),
			startTime: data.startTime,
			endTime: data.endTime,
		};
		handleForm(formData);
		gotoNextStep();
	};

	return (
		<form
			className="max-w-screen-sm mx-auto m-2 bg-white rounded-md h-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="max-w-md p-2 shadow-md border rounded-lg mx-auto">
				<div className="flex gap-2 items-center justify-between">
					<p className="text-primary font-bold">
						{format(currentMonth, "MMMM yyyy")}
					</p>
					<div className="flex gap-2 items-center text-primary select-none">
						<span
							onClick={getPreviousMonth}
							className="cursor-pointer hover:scale-125 transition-all ease-linear 300s"
						>
							&larr;
						</span>
						<span
							onClick={getNextMonth}
							className="cursor-pointer hover:scale-125 transition-all ease-linear 300s"
						>
							&rarr;
						</span>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-2 pt-4">
					{WEEKDAYS.map((day) => {
						return (
							<div key={day} className="text-center text-primary">
								{day}
							</div>
						);
					})}
					{Array.from({ length: startingDayIndex }).map((_, index) => {
						return <div key={`empty-${index}`} />;
					})}
					{daysInMonth.map((day, index) => {
						return (
							<div
								key={`${index}-days`}
								onClick={() => setSelected(day)}
								className={`${
									isToday(day)
										? "bg-primary text-white"
										: selected && day.getTime() === selected.getTime()
										? "bg-dark text-white"
										: "text-primary"
								} text-center h-8 w-8 rounded-full mx-auto cursor-pointer flex justify-center items-center`}
							>
								{format(day, "d")}
							</div>
						);
					})}
				</div>
			</div>
			{selected && (
				<div className="max-w-sm mx-auto py-4">
					<div className="p-3 border rounded-lg">
						<p className="text-xs">Date</p>
						<p>{format(selected, "PPP")}</p>
					</div>
					<div className="my-2">
						<BaseInput
							type="time"
							label="Start Time"
							{...register("startTime", {
								required: "This field is required",
							})}
							error={errors.startTime}
							errorText={errors.startTime && errors.startTime.message}
						/>
					</div>
					<div>
						<BaseInput
							type="time"
							label="End Time"
							{...register("endTime", {
								required: "This field is required",
							})}
							min={watchStarTime}
							error={errors.endTime}
							errorText={errors.endTime && errors.endTime.message}
						/>
					</div>
				</div>
			)}

			<div className="flex justify-center gap-2 mt-4">
				<div className="w-1/4">
					<BaseButton
						type="button"
						variant="sec"
						onClick={goBack}
						loading={false}
					>
						Back
					</BaseButton>
				</div>
				<div className="w-1/4">
					<BaseButton
						type="submit"
						loading={false}
						disabled={selected === null}
					>
						Next
					</BaseButton>
				</div>
			</div>
		</form>
	);
}

GigDate.propTypes = {
	handleForm: PropTypes.func.isRequired,
	gotoNextStep: PropTypes.func.isRequired, // Proper usage of PropTypes
	goBack: PropTypes.func,
};
