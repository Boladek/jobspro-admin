import React, { useState } from "react";
import { BaseInput } from "../../../component/input";
import { formatNumber } from "../../../helpers/function";
import { useForm } from "react-hook-form";
import profileAxios from "../../../helpers/profileAxios";
import { UseAuth } from "../../../context/auth-context";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";
import { UseModal } from "../../../context/wallet-context";

const amounts = [20000, 10000, 5000, 1000];

export function Funding() {
	const [loading, setLoading] = useState(false);
	const { refetch } = UseAuth();
	const { handleCloseWallet } = UseModal();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
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
				reset();
				setTimeout(() => {
					handleCloseWallet();
				}, 3000);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form className="p-2" onSubmit={handleSubmit(onSubmit)}>
			{loading && <Overlay message="funding Wallet" />}
			<>
				<div className="flex gap-1 mb-4">
					{amounts.map((val) => (
						<div
							key={val}
							onClick={() => setValue("amount", val)}
							className={`p-2 border-adminPrimary border text-xs flex gap-1 flex-1 rounded-md text-adminPrimary font-bold bg-gray-100 cursor-pointer`}
						>
							NGN <span className="font-normal">{formatNumber(val)}</span>
						</div>
					))}
				</div>
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
						<span className="text-red-500 text-xs">
							{errors.amount.message}
						</span>
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
						htmlFor="cardNo"
						className="block text-xs font-bold mb-1 text-gray-500"
					>
						Enter Card Number
					</label>
					<input
						type="number"
						id="cardNo"
						className="text-sm py-3 px-3 rounded-md w-full"
						{...register("cardNo", {
							required: "Card Number is required",
						})}
					/>
					{errors.cardNo && (
						<span className="text-red-500 text-xs">
							{errors.cardNo.message}
						</span>
					)}
				</div>
				<div className="flex gap-4 mb-4">
					<div className="flex-1">
						<label
							htmlFor="expiryDate"
							className="block text-xs font-bold mb-1 text-gray-500"
						>
							Expiry Date
						</label>
						<input
							type="date"
							id="expiryDate"
							className="text-sm py-3 px-3 rounded-md w-full"
							{...register("expDate", {
								required: "This is required",
							})}
						/>
						{errors.expDate && (
							<span className="text-red-500 text-xs">
								{errors.expDate.message}
							</span>
						)}
					</div>
					<div className="flex-1">
						<label
							htmlFor="cvv"
							className="block text-xs font-bold mb-1 text-gray-500"
						>
							CVV
						</label>
						<input
							type="number"
							id="amount"
							className="text-sm py-3 px-3 rounded-md w-full"
							{...register("cvv", {
								required: "This is required",
							})}
						/>
						{errors.cvv && (
							<span className="text-red-500 text-xs">{errors.cvv.message}</span>
						)}
					</div>
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
			</>
		</form>
	);
}
