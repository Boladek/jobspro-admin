import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";
import { useState } from "react";

export function DateHook() {
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  today.setDate(0);
  const [startDate, setStartDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date(today));

  return { startDate, endDate, setEndDate, setStartDate };
}
