import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import profileAxios from "../../../helpers/profileAxios";
import { BaseSelect } from "../../../component/select";
import { useState, useCallback } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
// import { LoadScript } from "@react-google-maps/api";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";
import { UseAuth } from "../../../context/auth-context";

// const libraries = ["places"];

export function BusinessLocation({ open, handleClose }) {
	const { refresh } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [selectedPlace, setSelectedPlace] = useState({ lat: null, lng: null });
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	const watchCountry = watch("country", "");
	const watchState = watch("state", "");

	const { data: countries = [] } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
	});

	const { data: states = [] } = useQuery({
		queryKey: [`states-${watchCountry}`, watchCountry],
		queryFn: () => profileAxios.get(`/location/states/${watchCountry}`),
		select: (data) => data.data,
		enabled: !!watchCountry,
	});

	const { data: cities = [] } = useQuery({
		queryKey: [`states-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
	});

	const onSubmit = (data) => {
		setLoading(true);
		profileAxios
			.patch("/profile/location", {
				longitude: selectedPlace.long,
				latitude: selectedPlace.lat,
				address: data.address,
				postalCode: data.postalCode,
				stateId: Number(data.state),
				cityId: Number(data.city),
				countryId: Number(data.country),
			})
			.then((res) => {
				toast.success(res.message);
				reset();
				refresh();
				handleClose();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	const onLoad = useCallback((autocomplete) => {
		console.log("Autocomplete: ", autocomplete);
	}, []);

	const onPlaceSelected = (place) => {
		console.log({ place });
		console.log("Place selected: ", place);
		const lat = place.geometry.location.lat();
		const lng = place.geometry.location.lng();
		setSelectedPlace({ lat, lng });
		console.log("Place selected: ", place);
		console.log("Latitude: ", lat, "Longitude: ", lng);
	};

	const { ref } = usePlacesWidget({
		apiKey: "AIzaSyBW5n6FBHUtMCABUGs4I-93IV8uceI8Y48",
		options: {
			types: ["streets"],
			componentRestrictions: { country: "ng" },
		},
		defaultValue: "Lagos",
		onPlaceSelected: (place) => {
			console.log({ place });
			// console.log("Place selected: ", place);
			const lat = place.geometry.location.lat();
			const lng = place.geometry.location.lng();
			setSelectedPlace({ lat, lng });
			// console.log("Place selected: ", place);
			// console.log("Latitude: ", lat, "Longitude: ", lng);
		},
	});

	return (
		<>
			{loading && <Overlay message="Updating Business Location" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={handleSubmit(onSubmit)}>
					<p className="font-bold text-primary text-2xl">Business Location</p>
					<p className="text-xs text-gray-400">
						More information should be placed here
					</p>
					<br />
					<div className="mb-2">
						<label className="block text-gray-600 text-sm mb-1">
							Enter Popular Location
						</label>
						<input
							ref={ref}
							className="bg-gray-100 disabled:opacity-75 disabled:text-gray-600 w-full px-3 py-3 border text-sm rounded-lg focus:outline-none focus:border-primary"
							required
						/>
						{/* <LoadScript
							googleMapsApiKey="AIzaSyBW5n6FBHUtMCABUGs4I-93IV8uceI8Y48"
							libraries={libraries}
						>
							<Autocomplete
								onLoad={onLoad}
								onPlaceSelected={(p) => {
									console.log(p);
								}}
								className="p-3 w-full bg-gray-100 rounded-lg"
								options={{
									types: ["address"],
									componentRestrictions: { country: "ng" },
								}}
							/>
						</LoadScript> */}
					</div>
					<div className="mb-2">
						<BaseSelect
							label="Country"
							{...register("country", {
								required: "This field is required",
							})}
							error={errors.country}
							errorText={errors.country && errors.country.message}
						>
							<option></option>
							{countries.map((item) => (
								<option key={item.uuid} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseSelect
							label="State"
							{...register("state", {
								required: "This field is required",
							})}
							error={errors.state}
							errorText={errors.state && errors.state.message}
						>
							<option></option>
							{states.map((item) => (
								<option key={item.uuid} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseSelect
							label="City"
							{...register("city", {
								required: "This field is required",
							})}
							error={errors.city}
							errorText={errors.city && errors.city.message}
						>
							<option></option>
							{cities.map((item) => (
								<option key={item.uuid} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseInput
							label="Postal Code"
							{...register("postalCode", {
								required: "This field is required",
							})}
							error={errors.postalCode}
							errorText={errors.postalCode && errors.postalCode.message}
						/>
					</div>
					<div className="mb-4">
						<BaseInput
							label="Street Address"
							{...register("address", {
								required: "This field is required",
							})}
							error={errors.address}
							errorText={errors.address && errors.address.message}
						/>
					</div>

					<div className="flex gap-2 mt-4">
						<div className="w-1/2">
							<BaseButton variant="sec" type="button" onClick={handleClose}>
								Cancel
							</BaseButton>
						</div>
						<div className="w-1/2" type="submit">
							<BaseButton>Save</BaseButton>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}

BusinessLocation.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
