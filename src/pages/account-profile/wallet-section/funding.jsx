import { useEffect, useState } from "react";
import { BaseInput } from "../../../component/input";
import { formatNumber } from "../../../helpers/function";
import { useForm } from "react-hook-form";
import profileAxios from "../../../helpers/profileAxios";
import { UseAuth } from "../../../context/auth-context";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";
import { UseModal } from "../../../context/modal-context";
import { SuccessInfo } from "../../../component/success-info";
import { SquareButton } from "../../../component/square-button";
import { BaseSelect } from "../../../component/select";

const amounts = [20000, 10000, 5000, 1000];

export function Funding() {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const { refetch } = UseAuth();
	const { handleCloseWallet } = UseModal();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		reset,
		watch,
	} = useForm();
	const watchCard = watch("cardNo", "");
	const watchExp = watch("expiryDate", "");

	function parseDate(v) {
		const [month, year] = v.split("/").map((item) => parseInt(item, 10));
		// Adding 1 to the month because JavaScript months are zero-indexed
		const expiryDate = new Date(year + 2000, month);
		// const newDate = new Date(expiryDate);
		const formatter = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
		const parts = formatter.formatToParts(expiryDate);
		const monthFormat = parts
			.find((part) => part.type === "month")
			.value.padStart(2, "0");
		const day = parts
			.find((part) => part.type === "day")
			.value.padStart(2, "0");
		const yearFormat = parts.find((part) => part.type === "year").value;
		return `${yearFormat}-${monthFormat}-${day}`;
	}

	const onSubmit = (data) => {
		data.expiryDate = parseDate(data.expiryDate);
		setLoading(true);
		profileAxios
			.post("/gigs/fund-wallet", {
				amount: Number(data.amount),
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
				reset();
				setStep(2);
				setTimeout(() => {
					handleCloseWallet();
				}, 5000);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		const formatCardNumber = (value) => {
			return value
				.replace(/\D/g, "")
				.replace(/(.{4})/g, "$1 ")
				.trim();
		};

		if (watchCard) {
			const newValue = formatCardNumber(watchCard);
			setValue("cardNo", newValue);
		}
	}, [watchCard, setValue]);

	useEffect(() => {
		const formatExpiryDate = (value) => {
			// Remove non-numeric characters
			const numericValue = value.replace(/\D/g, "");

			// Limit to four numeric characters
			const formattedValue = numericValue.slice(0, 4);

			// Add the '/' separator after the first two characters
			if (formattedValue.length > 2) {
				return formattedValue.slice(0, 2) + " / " + formattedValue.slice(2);
			} else {
				return formattedValue;
			}
		};

		if (watchExp) {
			const newValue = formatExpiryDate(watchExp);
			setValue("expiryDate", newValue);
		}
	}, [watchExp, setValue]);

	return (
		<form
			className="p-2 grid grid-cols-1 gap-4 pr-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay message="funding Wallet" />}
			{step === 1 && (
				<>
					<div className="flex gap-1">
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
					<div>
						<BaseInput
							label="Enter Amount"
							id="amount"
							placeholder="1,0000,000"
							{...register("amount", {
								required: "Amount is required",
							})}
							error={errors.amount}
							errorText={errors.amount && errors.amount.message}
						/>
					</div>
					<div>
						<BaseSelect
							label="Select Bank"
							{...register("bank", {
								required: "Bank is required",
							})}
							error={errors.bank}
							errorText={errors.bank && errors.bank.message}
						>
							<option>Zenith</option>
						</BaseSelect>
					</div>
					<div>
						<BaseInput
							label="Enter Card Number"
							id="cardNo"
							placeholder="0000 0000 0000"
							{...register("cardNo", {
								required: "Card No is required",
							})}
							error={errors.cardNo}
							errorText={errors.cardNo && errors.cardNo.message}
						/>
					</div>
					<div className="flex gap-4">
						<div className="flex-1">
							<BaseInput
								label="Expiry Date"
								id="expiryDate"
								placeholder="MM/YY"
								{...register("expiryDate", {
									required: "Expirty Date is required",
									validate: {
										isValidFormat: (v) => {
											const [month, year] = v
												.split("/")
												.map((item) => parseInt(item, 10));
											if (
												!month ||
												!year ||
												month < 1 ||
												month > 12 ||
												year < 0 ||
												year > 99
											) {
												return "Invalid date format";
											}
											return true;
										},
										isNotExpired: (v) => {
											const [month, year] = v
												.split("/")
												.map((item) => parseInt(item, 10));
											const currentDate = new Date();
											const expiryDate = new Date(year + 2000, month, 0); // last day of the month
											if (expiryDate < currentDate) {
												return "The expiry date is in the past";
											}
											return true;
										},
									},
								})}
								error={errors.expiryDate}
								errorText={errors.expiryDate && errors.expiryDate.message}
							/>
						</div>
						<div className="flex-1">
							<BaseInput
								label="CVV"
								id="cvv"
								placeholder="123"
								{...register("cvv", {
									required: "Expirty Date is required",
									minLength: {
										value: 3,
										message: "CVV must be 3 characters long",
									},
									maxLength: {
										value: 3,
										message: "CVV must be 3 characters long",
									},
								})}
								maxLength="3"
								error={errors.cvv}
								errorText={errors.cvv && errors.cvv.message}
							/>
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
						<SquareButton>Next</SquareButton>
					</div>
				</>
			)}
			{step === 2 && <SuccessInfo message="Wallet Funded" />}
		</form>
	);
}
