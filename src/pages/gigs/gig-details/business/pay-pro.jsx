import { bool, func, object } from "prop-types";
import { Modal } from "../../../../component/modal";
import { formatNumber } from "../../../../helpers/function";
import { useState } from "react";
import { SquareButton } from "../../../../component/square-button";

export function PayPro({ open, handleClose, gig, openOtp }) {
	const [openBreakDown, setOpenBreakDown] = useState(false);
	const [accepted, setAccepted] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		openOtp();
		handleClose();
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form className="p-4 h-full flex flex-col" onSubmit={submit}>
				<p className={`text-primary text-3xl font-bold mb-4`}>Payout</p>
				<div className="flex items-center gap-2 text-xs mb-4">
					<input
						type="checkbox"
						id="accept"
						className="rounded-sm"
						required
						onChange={(e) => setAccepted(e.target.checked)}
						checked={accepted}
					/>
					<label htmlFor="accept">
						I accept the work done is <strong>satisfactory</strong>
					</label>
				</div>
				<div className="p-4 border rounded-md text-xs mb-4">
					<p className="mb-4">
						The sum of NGN{" "}
						<span className="font-semibold">
							{formatNumber(gig.totalBudget)}
						</span>{" "}
						will be deducted from your escrow account
					</p>
					<p
						className="text-adminPrimary font-bold cursor-pointer hover:underline select-none mb-2"
						onClick={() => setOpenBreakDown((prev) => !prev)}
					>
						{openBreakDown ? "Close Breakdown" : "See Fee Breakdown"}
					</p>
					{openBreakDown && (
						<div>
							<div className="flex gap-2 mb-2">
								<div className="w-2/5">Gig Amount</div>
								<div className="flex-1">NGN {formatNumber(gig.budget)} </div>
							</div>
							<div className="flex gap-2 mb-2">
								<div className="w-2/5">Tip</div>
								<div className="flex-1">NGN {formatNumber(gig.tips)} </div>
							</div>
							<div className="flex gap-2 mb-2">
								<div className="w-2/5">Escrow Fee</div>
								<div className="flex-1">
									NGN {formatNumber(gig.escrowFee, 2)}{" "}
								</div>
							</div>
							<div className="flex gap-2 mb-2">
								<div className="w-2/5">Jobs Pro Fee</div>
								<div className="flex-1">
									NGN {formatNumber(gig.jobProFee, 2)}{" "}
								</div>
							</div>
							<div className="flex gap-2 text-sm text-primary">
								<div className="w-2/5 font-bold">Total</div>
								<div className="flex-1 font-bold">
									NGN {formatNumber(gig.payoutFee, 2)}
								</div>
							</div>
						</div>
					)}
				</div>
				<div>
					<SquareButton type="submit">Confirm Payment</SquareButton>
				</div>
			</form>
		</Modal>
	);
}

PayPro.propTypes = {
	open: bool.isRequired,
	handleClose: func.isRequired, // Proper usage of PropTypes
	gig: object,
	openOtp: func,
};
