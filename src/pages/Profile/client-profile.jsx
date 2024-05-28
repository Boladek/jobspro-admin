import { useState } from "react";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../component/button";
import { BaseInput } from "../../component/input";
import avatar from "../../assets/profile-avatar.png";
import bump from "../../assets/bump.png";
import { BaseSelect } from "../../component/select";
import { Modal } from "../../component/modal";
import profileAxios from "../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { UploadProfilePicModal } from "../../component/upload-pic-modal";
import camera from "../../assets/camera.png";
// import useGeolocation from "../../hooks/use-geolocation-hook";
import { Overlay } from "../../component/overlay-component";
import { UseAuth } from "../../context/auth-context";
// import { useParams } from "react-router-dom";

export function ClientProfile() {
	const { user } = UseAuth();
	const [loading, setLoading] = useState(false);

	// const { latitude, longitude } = useGeolocation();
	const [open, setOpen] = useState(false);
	// const navigate = useNavigate();
	// const { role } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const watchCountry = watch("country", "");
	const watchState = watch("state", "");

	const { data: countries = [], isLoading: gettingCountries } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
	});

	const { data: states = [], isLoading: gettingStates } = useQuery({
		queryKey: [`states-${watchCountry}`, watchCountry],
		queryFn: () => profileAxios.get(`/location/states/${watchCountry}`),
		select: (data) => data.data,
		enabled: !!watchCountry,
	});

	const { data: cities = [], isLoading: gettingCities } = useQuery({
		queryKey: [`states-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
	});

	// console.log({ cities, states, countries });

	const [openSuccess, setOpenSuccess] = useState(false);
	const onSubmit = (data) => {
		setLoading(true);
		// console.log({ data });
		profileAxios
			.patch("profile/details", {
				// longitude: longitude,
				// latitude: latitude,
				address: data.address,
				postalCode: data.postalCode,
				stateId: Number(data.state),
				cityId: Number(data.city),
				countryId: Number(data.country),
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	return (
		<form
			style={{ width: "100%" }}
			className="p-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay message="Updating Profile Details" />}
			<p className={`text-primary text-3xl font-bold`}>Profile Details</p>
			<p className="text-sm text-gray-500 mb-4">
				More information should be placed here
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6"
			>
				<div className="relative rounded-full shadow-sm h-24 w-24 mx-auto overflow-hidden">
					<div
						className="absolute opacity-0 hover:opacity-100 w-full h-full hover:bg-black/50 rounded-full flex justify-center items-center cursor-pointer"
						onClick={() => setOpen(true)}
					>
						<img src={camera} className="h-6" alt="Camera Icon" />
					</div>
					<img
						src={user.profilePicture ?? avatar}
						alt="user avatar"
						className="h-24 w-full"
					/>
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
						label="Address"
						{...register("address", {
							required: "This field is required",
						})}
						error={errors.address}
						errorText={errors.address && errors.address.message}
					/>
				</div>
				<div className="flex justify-end">
					<div className="w-1/4">
						<BaseButton type="submit">Next</BaseButton>
					</div>
				</div>
			</div>

			{openSuccess && (
				<Modal open={openSuccess} handleClose={() => setOpenSuccess(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
							<div>
								<img src={bump} alt="Illustration" />
							</div>
							<p className={`font-bold text-black`}>Hey Nneka</p>
							<p className="text-xs text-gray-500 text-center">
								Go ahead and create a job post
							</p>
						</div>

						<div className="">
							<BaseButton>Done</BaseButton>
						</div>
					</div>
				</Modal>
			)}

			{open && (
				<UploadProfilePicModal
					picture={user.profilePicture ?? avatar}
					open={open}
					handleClose={() => setOpen(false)}
				/>
			)}
		</form>
	);
}

// export default ClientProfile;
