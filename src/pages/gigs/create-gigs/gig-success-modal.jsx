import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import illustration from "../../../assets/illustration.png";
import { useNavigate, useParams } from "react-router-dom";

export function GigSuccessModal({ open, handleClose, openEscrow }) {
	const role = useParams();
	const navigate = useNavigate();
	return (
		<Modal open={open} handleClose={() => null}>
			<didv className="w-full p-2">
				<div className="flex justify-center">
					<img src={illustration} className="h-24" />
				</div>
				<div className="py-4 text-center text-sm text-gray-400">
					<p>You&apos;ve done your part</p>
					<p>Now let&apos;s help you find a pro</p>
				</div>
				<hr />
				<div className="flex justify-center gap-2 mt-4">
					<div className="w-1/2">
						<BaseButton
							variant="sec"
							type="button"
							onClick={() => {
								navigate(`/gigs/${role}`);
								handleClose();
							}}
						>
							Skip
						</BaseButton>
					</div>
					<div className="w-1/2">
						<BaseButton
							type="submit"
							onClick={() => {
								// navigate(`/settings/earning/fund-wallet`);
								handleClose();
								openEscrow();
							}}
						>
							Fund Escrow
						</BaseButton>
					</div>
				</div>
			</didv>
		</Modal>
	);
}

GigSuccessModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	openEscrow: PropTypes.func,
};
