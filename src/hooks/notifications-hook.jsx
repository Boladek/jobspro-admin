import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../helpers/profileAxios";
import { toast } from "react-toastify";

export function NotificationsHook() {
	const [loading, setLoading] = useState(false);
	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["get-notifications"],
		queryFn: () => profileAxios.get("/app-notification"),
		select: (data) => data,
		staleTime: Infinity,
		retry: 2,
	});

	function markNofication(id) {
		setLoading(true);
		profileAxios
			.put(`/app-notification/mark-read/${id}`)
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => {
				refetch();
				setLoading(false);
			});
	}

	return {
		markAsRead: markNofication,
		loading: loading || isLoading,
		notifications: data,
		refetchNotifications: refetch,
	};
}
