import React from "react";
import { BaseInput } from "../../../component/input";
import { useForm } from "react-hook-form";

export function Withdrawal() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
		// setLoading(true);
		// profileAxios
		// 	.post("/gigs/fund-wallet", {
		// 		amount: Number(data.amount),
		// 	})
		// 	.then((res) => {
		// 		toast.success(res.message);
		// 		refetch();
		// 		reset();
		// 		setTimeout(() => {
		// 			handleCloseWallet();
		// 		}, 3000);
		// 	})
		// 	.catch((err) => toast.error(err.response.data.message))
		// 	.finally(() => setLoading(false));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label
					htmlFor="amount"
					className="block text-xs font-bold mb-1 text-gray-500"
				>
					Enter Amount
				</label>
				<input
					type="text"
					id="amount"
					className="text-sm py-3 px-3 rounded-md w-full"
					{...register("amount", {
						required: "Amount is required",
					})}
				/>
				{errors.amount && (
					<span className="text-red-500 text-xs">{errors.amount.message}</span>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="bank"
					className="block text-xs font-bold mb-1 text-gray-500"
				>
					Select Bank
				</label>
				<select
					{...register("bank", {
						required: "Bank is required",
					})}
					id="bank"
					className="text-sm py-3 px-3 rounded-md w-full"
				>
					<option>Zenith</option>
				</select>
				{errors.bank && (
					<span className="text-red-500 text-xs">{errors.bank.message}</span>
				)}
			</div>
			<div className="mb-4">
				<label
					htmlFor="accountNumber"
					className="block text-xs font-bold mb-1 text-gray-500"
				>
					Account Number
				</label>
				<input
					type="text"
					id="accountNumber"
					className="text-sm py-3 px-3 rounded-md w-full"
					{...register("accountNumber", {
						required: "Account Number is required",
					})}
				/>
				{errors.accountNumber && (
					<span className="text-red-500 text-xs">
						{errors.accountNumber.message}
					</span>
				)}
			</div>
			<div className="mb-4 flex gap-2 items-center">
				<input
					type="checkbox"
					{...register("saveDetails")}
					id="save"
					className="rounded-sm h-4 w-4"
				/>
				<label htmlFor="save" className="text-xs font-bold text-gray-500">
					Save Card Details
				</label>
			</div>
			<div>
				<button className="p-3 text-white rounded-md bg-primary w-full flex justify-between text-xs font-bold items-center hover:opacity-70">
					<span className="font-bold">Next</span>
					<span>&rarr;</span>
				</button>
			</div>
		</form>
	);
}
