import PropTypes from "prop-types";
import { BaseButton } from "./button";
import { useForm } from "react-hook-form";
import { Modal } from "./modal";
import { useState } from "react";
import profileAxios from "../helpers/profileAxios";
import { Overlay } from "./overlay-component";
import { BaseInput } from "./input";
import { toast } from "react-toastify";
import { UseAuth } from "../context/auth-context";
import { NotificationsHook } from "../hooks/notifications-hook";

export function FundWallet({ open, handleClose }) {
	const { refetchNotifications } = NotificationsHook();
	const { refetch, name } = UseAuth();
	const [loading, setLoading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		setLoading(true);
		profileAxios
			.post("/gigs/fund-wallet", {
				amount: Number(data.amount),
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
				refetchNotifications();
				setTimeout(() => {
					handleClose();
				}, 3000);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};
	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Funding Wallet" />}
				<p className={`text-primary text-3xl font-bold mb-4`}>Fund Wallet</p>
				<div className="p-2 border rounded-lg mb-4">
					<div className="mb-2">
						<p className="text-xs text-gray-400">Account Name</p>
						<p>{name || "N/a"}</p>
					</div>
					<div className="mb-2">
						<p className="text-xs text-gray-400">Account Number</p>
						<p>8036743062</p>
					</div>
					<div className="">
						<p className="text-xs text-gray-400">Bank Name</p>
						<p>Wema Bank</p>
					</div>
				</div>

				<div className="mb-6">
					<BaseInput
						label="Enter Amount"
						{...register("amount", {
							required: "This field is required",
						})}
						type="number"
						min="0"
						error={errors.amount}
						errorText={errors.amount && errors.amount.message}
					/>
				</div>
				<div className="flex gap-2 items-center">
					<div className="flex-1">
						<BaseButton type="submit">Submit</BaseButton>
					</div>
					<div className="flex-1">
						<BaseButton type="button" variant="danger" onClick={handleClose}>
							Cancel
						</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

FundWallet.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
