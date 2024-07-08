import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import profileAxios from "../../../helpers/profileAxios";
import { BaseSelect } from "../../../component/select";
import { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";
import { UseAuth } from "../../../context/auth-context";

const extractAddressComponents = (addressComponents) => {
	let city = "";
	let state = "";
	let country = "";
	let postalCode = "";

	addressComponents.forEach((component) => {
		const types = component.types;
		if (types.includes("locality")) {
			city = component.long_name;
		} else if (types.includes("administrative_area_level_1")) {
			state = component.long_name;
		} else if (types.includes("country")) {
			country = component.long_name;
		} else if (types.includes("postal_code")) {
			postalCode = component.long_name;
		}
	});

	return { city, state, country, postalCode };
};
export function BusinessLocation({ open, handleClose }) {
	const inputRef = useRef();
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [details, setDetails] = useState({});
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset,
		setValue,
	} = useForm();

	const watchCountry = watch("country", "");
	const watchState = watch("state", "");

	const { data: countries = [] } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
		staleTime: Infinity,
	});

	const { data: states = [] } = useQuery({
		queryKey: [`states-${watchCountry}`, watchCountry],
		queryFn: () => profileAxios.get(`/location/states/${watchCountry}`),
		select: (data) => data.data,
		enabled: !!watchCountry,
		staleTime: Infinity,
	});

	const { data: cities = [] } = useQuery({
		queryKey: [`states-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
		staleTime: Infinity,
	});

	const onSubmit = (data) => {
		setLoading(true);
		profileAxios
			.patch("/profile/location", {
				longitude: details.lng,
				latitude: details.lat,
				address: details.address,
				postalCode: data.postalCode,
				stateId: Number(data.state),
				cityId: Number(data.city),
				countryId: Number(data.country),
			})
			.then((res) => {
				toast.success(res.message);
				reset();
				refetch();
				handleClose();
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyBW5n6FBHUtMCABUGs4I-93IV8uceI8Y48",
		libraries: ["places"],
	});

	console.log({ details });

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
							Enter Street Name
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
									const { city, state, country, postalCode } =
										extractAddressComponents(place.address_components);

									setValue("postalCode", postalCode);
									setDetails({
										lat,
										lng,
										address: destination,
										city,
										state,
										country,
										postalCode,
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
