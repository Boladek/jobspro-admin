import { useState, useEffect, useRef } from "react";

export const GigTimer = ({ gig }) => {
    const [seconds, setSeconds] = useState(() => calculateTimeDifference(gig));
    const intervalRef = useRef(null);

    useEffect(() => {
        const startTimer = () => {
            if (intervalRef.current !== null) return;

            intervalRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                        stopTimer();
                        return 0;
                    }

                    return prevSeconds - 1;
                });
            }, 1000);
        };

        const stopTimer = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        if (seconds > 0 && gig.statusType === "in-progress") {
            startTimer();
        } else if (gig.statusType === "completed" || seconds <= 0) {
            stopTimer();
        }

        // Cleanup the interval when the component unmounts or gig changes
        return () => stopTimer();
    }, [gig, seconds]);

    function calculateTimeDifference(gig) {
        const now = new Date().getTime();
        const targetTime = new Date(`${gig.gigDate}T${gig.endTime}`).getTime();
        const differenceInSeconds = Math.max(
            0,
            Math.floor((targetTime - now) / 1000)
        );

        return differenceInSeconds;
    }

    const getTimeComponents = () => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return {
            hours: String(hrs).padStart(2, "0"),
            minutes: String(mins).padStart(2, "0"),
            seconds: String(secs).padStart(2, "0"),
        };
    };

    return { ...getTimeComponents() };
};
