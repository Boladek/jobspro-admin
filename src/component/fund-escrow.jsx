import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import { Overlay } from "./overlay-component";
import { BaseTextArea } from "./text-area";
import { formatNumber } from "../helpers/function";
import { UseAuth } from "../context/auth-context";
import profileAxios from "../helpers/profileAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function FundEscrow({ open, handleClose, amount, id }) {
	// console.log({ amount });
	const navigate = useNavigate();
	const { user } = UseAuth();
	const [loading, setLoading] = useState(false);
	// console.log({ user });
	const { handleSubmit } = useForm();
	// const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		setLoading(true);
		profileAxios
			.post("/gigs/fund-escrow", {
				amount: Number(amount),
				gigId: Number(id),
			})
			.then((res) => toast.success(res.message))
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Funding Escrow" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form
					className="p-4 h-full flex flex-col"
					style={{ maxWidth: 500, width: "100%" }}
					onSubmit={handleSubmit(onSubmit)}
				>
					{loading && <Overlay message="Updating Industry" />}

					<div className="py-4">
						<p className="text-sm text-gray-500">Amount</p>
						<p className={`text-primary text-3xl font-bold`}>
							N{formatNumber(amount, 2)}
						</p>
					</div>

					<div className="mb-8 p-4 pb-8 rounded-lg bg-[#78AD84] text-white relative">
						<p className="text-xs">Wallet Balance</p>
						<p className={`text-3xl font-bold`}>
							N{formatNumber(user.walletAmount || 0, 2)}
						</p>

						<span className="absolute top-4 right-4 px-3 py-1 rounded-full border bg-black/50 text-xs cursor-pointer hover:bg-black/30" onClick={() => navigate("/settings/earning")}>
							Fund Wallet &rarr;
						</span>
					</div>
					<div>
						<BaseButton type="submit" loading={false}>
							Fund Escrow
						</BaseButton>
					</div>
				</form>
			</Modal>
		</>
	);
}

FundEscrow.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	amount: PropTypes.string,
	id: PropTypes.number,
};
