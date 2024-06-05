import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseTextArea } from "../../../component/text-area";
import profileAxios from "../../../helpers/profileAxios";
import { useState } from "react";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";

export function AboutUs({ open, handleClose }) {
	const [loading, setLoading] = useState(false);
	const [about, setAbout] = useState("");

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		profileAxios
			.patch("profile/bio", {
				bio: about,
			})
			.then((res) => {
				toast.success(res.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Uploading Info" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={submit}>
					<p className="font-bold text-primary text-2xl">About us</p>
					<p className="text-xs text-gray-400">
						More information should be placed here
					</p>
					<br />
					<div className="mb-2">
						<BaseTextArea
							placeholder="We are a..."
							onChange={(e) => setAbout(e.target.value)}
							required
						/>
					</div>

					<div className="flex gap-2 mt-4">
						<div className="w-1/2">
							<BaseButton variant="sec" type="button" onClick={handleClose}>
								Cancel
							</BaseButton>
						</div>
						<div className="w-1/2">
							<BaseButton type="submit">Save</BaseButton>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}

AboutUs.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
