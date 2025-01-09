import { useQuery } from "@tanstack/react-query";
import customAxios from "../config/customAxios";
import { useState } from "react";
import { toast } from "react-toastify";

export function UserDetailsHook({ id }) {
  const [loading, setLoading] = useState(false);
  const {
    data = {},
    refetch: refetchUserDetails,
    isLoading: gettingUserDetails,
  } = useQuery({
    queryKey: ["dashboard-user-details" + id, id],
    queryFn: () => customAxios.get(`user/profile/${id}`),
    staleTime: Infinity,
    select: (data) => data,
    enabled: !!id,
  });

  function blockUser(userId) {
    setLoading(true);
    customAxios
      .post(`/user/block-accout/${userId}`)
      .then(() => {
        toast.success("User blocked successfully.");
        refetchUserDetails();
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  }

  function unBlockUser(userId) {
    setLoading(true);
    customAxios
      .post(`/user/unblock-accout/${userId}`)
      .then(() => {
        toast.success("User blocked successfully.");
        refetchUserDetails();
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setLoading(false));
  }

  return {
    gettingUserDetails,
    refetchUserDetails,
    userDetails: data,
    blockUser,
    loading,
    unBlockUser,
  };
}
