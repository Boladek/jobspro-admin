import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { useRef, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { configKeys } from "../../../helpers/config";

const extractAddressComponents = (addressComponents) => {
	let city = "";
	let state = "";
	let country = "";

	addressComponents.forEach((component) => {
		const types = component.types;
		if (types.includes("locality")) {
			city = component.long_name;
		} else if (types.includes("administrative_area_level_1")) {
			state = component.long_name;
		} else if (types.includes("country")) {
			country = component.long_name;
		}
	});

	return { city, state, country };
};
export function GigLocation({ open, handleClose, handleAddress }) {
	const inputRef = useRef();
	// const { refetch } = UseAuth();
	const [details, setDetails] = useState({});

	const submit = (e) => {
		e.preventDefault();
		handleAddress(details);
		handleClose();
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: configKeys.placesApiID,
		libraries: ["places"],
	});

	// console.log({ details });

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form className="w-full p-2 grid grid-cols-1 gap-4" onSubmit={submit}>
				<div>
					<p className="font-bold text-primary text-2xl">Enter Address</p>
					<p className="text-xs text-gray-400">
						More information should be placed here
					</p>
				</div>
				<div>
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
								const { city, state, country } = extractAddressComponents(
									place.address_components
								);

								setDetails({
									lat,
									lng,
									address: destination,
									city,
									state,
									country,
								});
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
	);
}

GigLocation.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	handleAddress: PropTypes.func.isRequired,
};
