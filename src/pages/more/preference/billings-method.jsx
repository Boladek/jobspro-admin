import { useState } from "react";
import { BaseInput } from "../../../component/input";
import { BaseSelect } from "../../../component/select";
import { BaseButton } from "../../../component/button";
import { EditIcon } from "../../../assets/edit-icon";
import { DeleteIcon } from "../../../assets/delete-icon";

export function BillingsMethod() {
	const [openSideBar, setOpenSideBar] = useState(false);

	function handleSideBar() {
		setOpenSideBar((prev) => !prev);
	}

	return (
		<div>
			<p className="font-bold">Manage billing methods</p>
			<p className="text-xs font-extralight mb-2">
				Add, update, or remove your billing methods.
			</p>
			<div className="flex gap-1 items-center cursor-pointer mb-4">
				<span
					className="bg-primary rounded-full flex items-center justify-center w-8 h-8 text-white"
					onClick={handleSideBar}
				>
					+
				</span>
				<span
					className="text-xs hover:underline text-primary"
					onClick={handleSideBar}
				>
					Add a billing method
				</span>
			</div>
			<div>
				{[
					{
						default: true,
						expDate: new Date(),
						cardNumber: "1234567890",
						type: "visa",
					},
					{
						default: false,
						expDate: new Date(2025, 1, 1),
						cardNumber: "0987654321",
						type: "visa",
					},
				].map((card) => (
					<div
						key={card.cardNumber}
						className="p-2 sm:p-4 bg-white mb-2 rounded-lg shadow-sm flex gap-4 items-center"
					>
						<div>
							<p className="text-3xl font-bold italic">VISA</p>
						</div>
						<div className="block sm:flex gap-4 items-center justify-between flex-1">
							<div className="text-right sm:text-left">
								<p className="text-sm sm:text-base font-bold">
									Visa ending with {card.cardNumber.slice(-4)}
								</p>
								<p className="text-xs text-gray-400 font-extralight">
									Exp. date {new Date(card.expDate).toISOString().split("T")[0]}
								</p>
							</div>
							<div className="flex justify-end mt-1 sm:mt-0 sm:justify-normal items-center gap-4">
								<div
									className={`px-3 py-2 rounded-full text-xs sm:text-sm ${
										card.default
											? "bg-[#E5FFDE] text-[#01A22F] cursor-default"
											: "bg-light text-primary cursor-pointer"
									}`}
								>
									{card.default ? "Default" : "Make Default"}
								</div>
								<div className="flex gap-2">
									<EditIcon />
									<DeleteIcon />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{openSideBar && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
					style={{
						zIndex: 10000,
					}}
				>
					<div className="bg-white p-2 w-full max-w-lg flex flex-col">
						<div className="flex justify-end">
							<span
								className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
								onClick={handleSideBar}
							>
								&times;
							</span>
						</div>
						<div className="p-2 flex-1 min-h-96 overflow-y-auto">
							<p className="font-bold">Billings methods</p>
							<p className="text-xs text-gray-400">
								Easily manage your payments methods through our secure system.
							</p>
							<div className="mb-4"></div>
							<form>
								<div className="mb-2">
									<BaseInput label="Name of Card" />
								</div>
								<div className="mb-2">
									<BaseInput label="Card Number" />
								</div>
								<div className="flex gap-4 mb-4">
									<div className="flex-1">
										<BaseInput label="Exp Date" type="date" />
									</div>
									<div className="flex-1">
										<BaseInput label="CVV" placeholder="566" />
									</div>
								</div>
								<p className="mb-4 font-bold">Billing Address</p>
								<div className="mb-2">
									<BaseSelect className="Country">
										<option>Nigeria</option>
									</BaseSelect>
								</div>
								<div className="mb-2">
									<BaseInput label="Address line" />
								</div>
								<div className="flex gap-4 mb-8">
									<div className="flex-1">
										<BaseSelect label="City">
											<option>Lagos</option>
										</BaseSelect>
									</div>
									<div className="flex-1">
										<BaseInput label="Postal Code" />
									</div>
								</div>
								<div>
									<BaseButton>Submit</BaseButton>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
