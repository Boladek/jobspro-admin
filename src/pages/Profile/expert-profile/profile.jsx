import { useState } from "react";
import { useForm } from "react-hook-form";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import avatar from "../../../assets/profile-avatar.png";
import bump from "../../../assets/bump.png";
import { BaseSelect } from "../../../component/select";
import { Modal } from "../../../component/modal";
import { UploadProfilePicModal } from "../../../component/upload-pic-modal";
import camera from "../../../assets/camera.png";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../helpers/profileAxios";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";
import { UseAuth } from "../../../context/auth-context";

export function Profile() {
	// eslint-disable-next-line no-unused-vars
	const { user } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	// const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const watchCountry = watch("country", "");
	const watchState = watch("state", "");

	const onSubmit = (data) => {
		setLoading(true);
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
			.then((res) => {
				toast.success(res.message);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	// const handleFile = (e) => {
	// 	const reader = new FileReader();
	// 	reader.onload = () => {
	// 		setPreview(reader.result);
	// 	};
	// 	reader.readAsDataURL(e.target.files[0]);
	// 	setFile(e.target.files[0]);
	// };

	const { data: countries = [], isLoading: gettingCountries } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
		staleTime: Infinity,
	});

	const { data: states = [], isLoading: gettingStates } = useQuery({
		queryKey: [`states-${watchCountry}`, watchCountry],
		queryFn: () => profileAxios.get(`/location/states/${watchCountry}`),
		select: (data) => data.data,
		enabled: !!watchCountry,
		staleTime: Infinity,
	});

	const { data: cities = [], isLoading: gettingCities } = useQuery({
		queryKey: [`states-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
		staleTime: Infinity,
	});

	return (
		<form
			style={{ width: "100%" }}
			className="p-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay message="Updating Profile" />}
			<p className={`text-primary text-3xl font-bold`}>Profile Details</p>
			<p className="text-sm text-gray-500 mb-4">
				More information should be placed here
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6"
			>
				{/* <label
					id="profile-upload"
					className="w-full flex justify-center mb-2"
					onClick={() => setOpen(true)}
				>
					<div className="border rounded-full w-24 overflow-hidden">
						<img src={preview ?? avatar} className="h-24 w-24" />
					</div>
					<input
						id="profile-upload"
						type="file"
						className="hidden absolute z-1"
						onChange={handleFile}
						accept="image/*"
					/>
				</label> */}
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
					<BaseInput
						label="Birth Day"
						{...register("birthday", {
							required: "This field is required",
						})}
						error={errors.birthday}
						errorText={errors.birthday && errors.birthday.message}
						type="date"
						defaultValue={new Date().toISOString().split("T")[0]}
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
					<div className="w-full md:w-1/4">
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
					open={open}
					handleClose={() => setOpen(false)}
					picture={user.profilePicture ?? avatar}
				/>
			)}
		</form>
	);
}
