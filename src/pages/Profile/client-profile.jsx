import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { colors } from "../../helpers/theme";
import { BaseButton } from "../../component/button";
import { BaseInput } from "../../component/input";
import avatar from "../../assets/profile-avatar.png";
import bump from "../../assets/bump.png";
import info from "../../assets/info.png";
import illustration from "../../assets/illustration.png";
import { BaseSelect } from "../../component/select";
import { Modal } from "../../component/modal";

function ClientProfile() {
	// const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(true);
	// const [password, setPassword] = useState(true);
	// const [remember, setRemember] = useState(false);
	const onSubmit = (data) => {
		console.log({ data });
	};

	return (
		<form
			style={{ width: "100%" }}
			className="p-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<p className={`text-primary text-3xl font-bold`}>Profile Details</p>
			<p className="text-sm text-gray-500 mb-4">
				More information should be placed here
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6"
			>
				<div className="w-full flex justify-center mb-2">
					<img src={avatar} className="h-24" />
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
					</BaseSelect>
				</div>
				<div className="mb-2">
					<BaseInput
						label="Postal Code"
						{...register("username", {
							required: "This field is required",
						})}
						error={errors.username}
						errorText={errors.username && errors.username.message}
					/>
				</div>
				<div className="mb-4">
					<BaseInput
						label="Address"
						{...register("username", {
							required: "This field is required",
						})}
						error={errors.username}
						errorText={errors.username && errors.username.message}
					/>
				</div>
				<div className="flex justify-end">
					<div className="w-1/4">
						<BaseButton type="submit">Next</BaseButton>
					</div>
				</div>
			</div>

			{open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
							<div>
								<img src={illustration} alt="Illustration" />
							</div>
							<p className={`font-bold text-black`}>Hey Nneka</p>
							<p className="text-xs text-gray-500 text-center">
								Please click Get started to complete the setup your profile
							</p>
						</div>
						<div className="flex gap-1 items-center border rounded-md p-2 mb-4">
							<img src={info} alt="Information" />
							<div className="w-4/5 text-xs text-gray-500">
								You only need 1-2 minutes, and you can make edits later.
								We&lsquo;ll save your progress as you go.
							</div>
						</div>
						<div className="flex gap-2">
							<div className="mb-4 w-1/2">
								<BaseButton>Skip</BaseButton>
							</div>
							<div className="mb-4 w-1/2">
								<BaseButton>Get Started</BaseButton>
							</div>
						</div>
					</div>
				</Modal>
			)}
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
		</form>
	);
}

export default ClientProfile;
