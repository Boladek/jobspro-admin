import { useState } from "react";
import { formatDateToStandard } from "../helpers/function";

export function DateHook() {
    const today = new Date();

    // Get first day of the current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get today's date (endDate)
    const [startDate, setStartDate] = useState(
        formatDateToStandard(firstDayOfMonth)
    );
    const [endDate, setEndDate] = useState(formatDateToStandard(today));

    return { startDate, endDate, setEndDate, setStartDate };
}
