import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";
import { useState } from "react";
import { toast } from "react-toastify";

export function GigAcceptedHook({ gigAcceptedId }) {
    const [loading, setLoading] = useState(false);
    const { data: timeLine = {}, isLoading: gettingTimeLine } = useQuery({
        queryKey: [`gig-timeline-${gigAcceptedId}`, gigAcceptedId],
        queryFn: () => customAxios.get(`/gigs/timeline/${gigAcceptedId}`),
        staleTime: Infinity,
        select: (data) => data?.data,
    });

    function payPro(callBack) {
        setLoading(true);
        customAxios
            .post("/transactions/pay-professional", {
                gigAcceptedId,
                reason: "Work completed successfully",
            })
            .then((res) => {
                toast.success(res.message);
                callBack();
            })
            .catch((err) => toast.error(err.response.data.message))
            .finally(() => setLoading(false));
    }

    function refundBusiness(callBack) {
        setLoading(true);
        customAxios
            .post("/transactions/refund-business", {
                gigAcceptedId,
                reason: "Service cancelled by business",
            })
            .then((res) => {
                toast.success(res.message);
                callBack();
            })
            .catch((err) => toast.error(err.response.data.message))
            .finally(() => setLoading(false));
    }

    return { timeLine, loading, gettingTimeLine, refundBusiness, payPro };
}
