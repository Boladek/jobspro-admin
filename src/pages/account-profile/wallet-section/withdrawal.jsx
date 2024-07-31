import { useState } from "react";
import { BaseInput } from "../../../component/input";
import { useForm } from "react-hook-form";
// import OtpInput from "react-otp-input";
// import { TimerHook } from "../../../hooks/timer-hooks";
import { SuccessInfo } from "../../../component/success-info";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UseAuth } from "../../../context/auth-context";
// import { format } from "date-fns";
import { Overlay } from "../../../component/overlay-component";

export function Withdrawal() {
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	// const [otp, setOtp] = useState("");
	// const { timer } = TimerHook({ time: 60 });
	const [form, setForm] = useState({});
	const [password, setPassword] = useState("");

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
	} = useForm();

	const { data: banks = [], isLoading } = useQuery({
		queryKey: ["fetch-banks-list"],
		queryFn: () => profileAxios.get("/transactions/get-bank-list"),
		select: (data) => data.data.data.bank,
		staleTime: Infinity,
		retry: 1,
	});

	const onSubmit = (data) => {
		setLoading(true);
		setForm(data);
		setStep(2);
		// console.log({ data });
		// profileAxios
		// 	.post("/transactions/withdrawal", {
		// 		accountNumber: data.accountNumber,
		// 		bankCode: data.bank,
		// 		amount: data.amount,
		// 		remark: data.remark,
		// 		transferType: "inter",
		// 	})
		// 	.then((res) => {
		// 		toast.success(res.message);
		// 		refetch();
		// 		reset();
		// 		setStep(2);
		// 	})
		// 	.catch((err) => toast.error(err.response.data.message))
		// 	.finally(() => setLoading(false));
	};

	const submitOtp = (e) => {
		e.preventDefault();
		setLoading(true);

		profileAxios
			.post("/transactions/withdrawal", {
				accountNumber: form.accountNumber,
				bankCode: form.bank,
				amount: form.amount,
				remark: form.remark,
				transferType: "inter",
				password: password,
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
				reset();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="" />}
			{step === 1 && (
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
							<option></option>
							{banks.map((item) => (
								<option key={item.code} value={item.code}>
									{item.name}
								</option>
							))}
						</select>
						{errors.bank && (
							<span className="text-red-500 text-xs">
								{errors.bank.message}
							</span>
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
					<div className="mb-4">
						<label
							htmlFor="remarks"
							className="block text-xs font-bold mb-1 text-gray-500"
						>
							Remarks
						</label>
						<input
							type="text"
							id="remarks"
							className="text-sm py-3 px-3 rounded-md w-full"
							{...register("remarks")}
						/>
					</div>
					<div className="mb-4 flex gap-2 items-center">
						<input
							type="checkbox"
							{...register("saveDetails")}
							id="save"
							className="rounded-sm h-4 w-4"
						/>
						<label htmlFor="save" className="text-xs font-bold text-gray-500">
							Save as default bank
						</label>
					</div>
					<div>
						<button
							className="p-3 text-white rounded-md bg-primary w-full flex justify-between text-xs font-bold items-center hover:opacity-70"
							type="submit"
						>
							<span className="font-bold">Proceed</span>
							<span>&rarr;</span>
						</button>
					</div>
				</form>
			)}
			{step === 2 && (
				<form onSubmit={submitOtp}>
					{/* <p className={`text-primary font-bold`}>Enter OTP</p> */}
					{/* <p className="text-sm text-gray-500 mb-4">
						A code was sent to your phone number, code expires{" "}
						<span className="text-[#42BE65]">in {timer}s</span>
					</p> */}
					<div className="mb-4">
						<BaseInput
							label="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							containerStyle="otp-container"
							inputStyle="otp-input"
							shouldAutoFocus
							// inputType="number"
							renderSeparator={<span>-</span>}
							renderInput={(props) => <input required {...props} />}
						/> */}
					</div>
					{/* <div className="mb-8 text-xs font-bold hover:underline text-gray-500 cursor-pointer">
						Resend otp
					</div> */}
					<div>
						<button className="p-3 text-white rounded-md bg-primary w-full flex justify-between text-xs font-bold items-center hover:opacity-70">
							<span className="font-bold">Withdraw</span>
							<span>&rarr;</span>
						</button>
					</div>
				</form>
			)}
			{step === 3 && <SuccessInfo message="Withdrawal Successful!" />}
		</>
	);
}
