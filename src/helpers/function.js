import {
    differenceInDays,
    differenceInHours,
    addHours,
    startOfDay,
    differenceInSeconds,
    differenceInMinutes,
} from "date-fns";
import { toast } from "react-toastify";

export function appendZero(num) {
    if (num < 10 && num > -10) {
        if (num >= 0) {
            return "0" + num;
        } else {
            return "-0" + Math.abs(num);
        }
    } else {
        return num.toString();
    }
}

export function formatNumber(num, decimal = 0) {
    return Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: decimal,
        minimumFractionDigits: decimal,
    }).format(num);
}

export function handleUserTypes(role) {
    const user = {
        individual: "individual",
        business: "business",
        agent: "agent",
        pro: "pro",
        expert: "expert",
    };
    return user[role];
}

export function formatDate(date) {
    if (!date) return "N/A";
    const newDate = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const parts = formatter.formatToParts(newDate);
    const month = parts
        .find((part) => part.type === "month")
        .value.toUpperCase();
    const day = parts.find((part) => part.type === "day").value;
    const year = parts.find((part) => part.type === "year").value;
    return `${month}-${day}-${year}`;
}

export function isEmpty(obj) {
    if (obj && Object.entries(obj).length === 0) return true;
    return false;
}

export function generateArray(length) {
    if (typeof length !== "number" || length < 0) {
        throw new Error("Length must be a non-negative number");
    }

    return Array.from({ length }, (_, index) => index);
}

export const timeAgo = (date) => {
    const now = new Date();
    const diffDays = differenceInDays(now, date);
    const diffHours = differenceInHours(now, date);
    const diffMinutes = differenceInMinutes(now, date);
    const diffSeconds = differenceInSeconds(now, date);

    if (diffDays >= 7) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (diffDays > 0) {
        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    } else if (diffHours > 0) {
        return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
        return diffMinutes === 1
            ? "1 minute ago"
            : `${diffMinutes} min ago`;
    } else {
        return diffSeconds === 1
            ? "1 second ago"
            : `${diffSeconds} sec ago`;
    }
};

export const getDifferenceInHours = (startTime, endTime) => {
    const start = parseTimeStringToTodayDate(startTime);
    const end = parseTimeStringToTodayDate(endTime);

    return differenceInHours(end, start);
};

export const parseTimeStringToTodayDate = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const todayStart = startOfDay(new Date());
    return addHours(todayStart, hours).setMinutes(minutes, seconds);
};

export const getAmPm = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours < 12 ? "AM" : "PM";

    // Convert hours from 24-hour format to 12-hour format
    const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
    const adjustedTimeStr = `${String(adjustedHours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}`;

    return `${adjustedTimeStr} ${period}`;
};

export function calculateTimeLeft({ startTime, endTime, date }) {
    // Combine the date with start and end times
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    const now = new Date();

    // Calculate the time difference
    let timeDifference = endDateTime - now;

    if (timeDifference < 0) {
        return "The event has already ended.";
    }

    // Calculate days, hours, and minutes
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    timeDifference %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    timeDifference %= 1000 * 60 * 60;

    const minutes = Math.floor(timeDifference / (1000 * 60));

    return { days, hours, minutes };
}

export function formatTime(dateTime) {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;

    // Convert 24-hour to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Append 'am' or 'pm'
    const period = isPM ? "pm" : "am";

    return `${hours}:${formattedMinutes}${period}`;
}

export function groupTransactionsByDate(messages) {
    return messages.reduce((acc, message) => {
        const date = convertToDate(message.createdAt);
        if (!acc[date]) acc[date] = [];
        acc[date].push(message);
        return acc;
    }, {});
}

function convertToDate(timestamp) {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
        return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else {
        return formatDate(messageDate.toISOString().split("T")[0]);
    }
}

export function formatDateToStandard(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
}

export function checkIfFileIsImage(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
        toast.error("No file selected.");
        return;
    }

    // Validate file type
    const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/jpe",
    ];
    if (!validImageTypes.includes(selectedFile.type)) {
        toast.error("Please select a valid image file (JPEG, JPG, PNG, GIF).");
        return;
    }

    return true;
}
