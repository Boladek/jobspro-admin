import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialHours = 0) => {
  const [seconds, setSeconds] = useState(initialHours * 3600);
  const intervalRef = useRef(null);

  useEffect(() => {
    // startTimer();

    return () => stopTimer();
  }, []);

  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(initialHours * 3600);
    startTimer();
  };

  const getTimeComponents = () => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: String(hrs).padStart(2, '0'),
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0'),
    };
  };

  return { ...getTimeComponents(), startTimer, stopTimer, resetTimer };
};
