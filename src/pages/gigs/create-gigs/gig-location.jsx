import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import profileAxios from "../../../helpers/profileAxios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";
import { UseAuth } from "../../../context/auth-context";
import { BaseInput } from "../../../component/input";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

export function GigLocation({ open, handleClose, handleAddress }) {
	const inputRef = useRef();
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState({});

	const submit = (e) => {
		e.preventDefault();
		// setLoading(true);
		handleAddress(details);
		handleClose();
		// profileAxios
		// 	.patch("/profile/bio", {
		// 		bio: about,
		// 	})
		// 	.then((res) => {
		// 		toast.success(res.message);
		// 		refetch();
		// 	})
		// 	.catch((err) => {
		// 		toast.error(err.response.data.message);
		// 		console.log(err);
		// 	})
		// 	.finally(() => setLoading(false));
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyBW5n6FBHUtMCABUGs4I-93IV8uceI8Y48",
		libraries: ["places"],
	});

	return (
		<>
			{loading && <Overlay message="Updating Bio" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={submit}>
					<p className="font-bold text-primary text-2xl">Enter Address</p>
					<p className="text-xs text-gray-400">
						More information should be placed here
					</p>
					<br />
					<div className="mb-2">
						{/* <BaseInput
							label="Enter Address"
							placeholder="We are a..."
							onChange={(e) => setAbout(e.target.value)}
							required
						/> */}

						<label className="block text-gray-600 text-sm mb-1">
							Enter gig location
						</label>
						{isLoaded && (
							<Autocomplete
								onLoad={(autocomplete) => {
									inputRef.current = autocomplete;
								}}
								onPlaceChanged={() => {
									const place = inputRef.current.getPlace();
									const lat = place.geometry.location.lat();
									const lng = place.geometry.location.lng();
									const destination = place.formatted_address;
									setDetails({ lat, lng, address: destination });
								}}
							>
								<input
									ref={inputRef}
									className="bg-gray-100 disabled:opacity-75 disabled:text-gray-600 w-full px-3 py-3 border text-sm rounded-lg focus:outline-none focus:border-primary"
									required
								/>
							</Autocomplete>
						)}
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

GigLocation.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	handleAddress: PropTypes.func.isRequired,
};
