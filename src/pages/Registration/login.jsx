import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { Checkbox } from "../../component/checkbox";
import { Overlay } from "../../component/overlay-component";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";

function LoginPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [password, setPassword] = useState(true);
	const [remember, setRemember] = useState(false);
	const onSubmit = (data) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate("/dashboard");
		}, 3000);
		console.log({ data });
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay />}
			<p className={"text-primary text-3xl font-bold"}>Welcome Back</p>
			<p className="text-sm text-gray-500">
				Continue with your email or Phone Number
			</p>
			<br />
			<div className="mb-4">
				<BaseInput
					label="Email or Phone Number"
					{...register("username", {
						required: "This field is required",
					})}
					error={errors.username}
					errorText={errors.username && errors.username.message}
				/>
			</div>
			<div className="relative mb-4">
				<BaseInput
					label="Password"
					type={password ? "password" : "text"}
					{...register("password", {
						required: "The field is required",
					})}
					error={errors.password}
					errorText={errors.password && errors.password.message}
				/>
				<img
					src={password ? eye : eyeSlash}
					onClick={() => setPassword(!password)}
					className={`absolute cursor-pointer ${
						password ? "h-5" : "h-7"
					} transition-all ease-linear duration-300`}
					style={{
						top: password ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="flex items-center justify-between mb-8">
				<div>
					<Checkbox
						textPosition="right"
						value={remember}
						onChange={(e) => setRemember(e.target.checked)}
						label="Remember me for 30 days"
					/>
				</div>
				<div
					className={`text-sm text-primary font-semibold hover:underline`}
					onClick={() => navigate("/forgot-password")}
				>
					forgot password
				</div>
			</div>
			<div className="mb-4">
				<BaseButton type="submit">Login</BaseButton>
			</div>
		</form>
	);
}

export default LoginPage;
