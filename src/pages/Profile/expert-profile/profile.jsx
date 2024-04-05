import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import avatar from "../../../assets/profile-avatar.png";
import bump from "../../../assets/bump.png";
import { BaseSelect } from "../../../component/select";
import { Modal } from "../../../component/modal";

export function Profile() {
	// eslint-disable-next-line no-unused-vars
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	// const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [openSuccess, setOpenSuccess] = useState(false);
	const onSubmit = (data) => {
		console.log({ data });
	};

	const handleFile = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	return (
		<form
			style={{ width: "100%" }}
			className="p-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Profile Details
			</p>
			<p className="text-sm text-gray-500 mb-4">
				More information should be placed here
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6"
			>
				<label id="profile-upload" className="w-full flex justify-center mb-2">
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
				</label>
				<div className="mb-2">
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
		</form>
	);
}
