import { useState, useEffect } from "react";
import { appendZero } from "../helpers/function";

export function TimerHook({ time }) {
	const [timer, setTimer] = useState(time); // 15 mins

	useEffect(() => {
		let interval;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [timer]);

	const resetTimer = () => {
		setTimer(time); // Reset the timer to 60 seconds
	};

	// useEffect(() => {
	// 	if (timer === 0) {
	// 		setTimer(time);
	// 	}
	// }, [timer, time]);

	return {
		timer: appendZero(timer),
		resetTimer,
	};
}
