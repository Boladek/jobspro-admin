import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
// import { Checkbox } from "../../component/checkbox";
import { Overlay } from "../../component/overlay-component";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";
import login from "../../assets/login.png";
import finclusionIcon from "../../assets/finclusion.png";
import customAxios from "../../helpers/customAxios";
import { toast } from "react-toastify";
import StorageService from "../../helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import profileAxios from "../../helpers/profileAxios";

function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const [finLogin, setFinLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [password, setPassword] = useState(true);
	// const [remember, setRemember] = useState(false);
	const onSubmit = (data) => {
		// console.log({ data });
		// return;
		setLoading(true);
		profileAxios
			.post("/auth/login", {
				username: data.username.trim(),
				password: data.password.trim(),
				platformId: 5,
			})
			.then((res) => {
				StorageService.setToken(res.token);
				dispatch(loginSuccess(res.user));
				navigate("/dashboard");
			})
			.catch((err) => {
				console.log({ err });
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
		// setTimeout(() => {
		// 	setLoading(false);
		// 	navigate("/dashboard");
		// }, 3000);
		// console.log({ data });
	};

	useEffect(() => {
		document.title = "Jobs Pro | Login";
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/dashboard");
		}
	}, [isAuthenticated, navigate]);

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

			{finLogin ? (
				<>
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
				</>
			) : (
				<div className="mb-4">
					<BaseInput
						label="Finclusion ID"
						{...register("finclusionID", {
							required: "This field is required",
						})}
						placeholder="Enter Finclusion ID"
						error={errors.finclusionID}
						errorText={errors.finclusionID && errors.finclusionID.message}
					/>
				</div>
			)}
			<div className="flex items-center justify-between mb-8">
				<div>
					{/* <Checkbox
						textPosition="right"
						value={remember}
						onChange={(e) => setRemember(e.target.checked)}
						label="Remember me for 30 days"
					/> */}
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
			<div className="flex items-center mb-4 text-xs text-gray-400 gap-2">
				<div
					className="flex-1 bg-gray-200 rounded-full"
					style={{
						height: 1,
					}}
				/>
				<span>Or continue with</span>
				<div
					className="flex-1 bg-gray-200 rounded-full"
					style={{
						height: 1,
					}}
				/>
			</div>
			<div className="flex justify-center">
				<div
					onClick={() => setFinLogin((prev) => !prev)}
					className="select-none flex items-center text-xs p-2 rounded-full bg-gray-100 gap-2 cursor-pointer hover:bg-gray-200"
				>
					<img
						src={finLogin ? finclusionIcon : login}
						alt="Form Icon"
						className="h-4"
					/>
					<span>
						{finLogin
							? "Login with Finclusion ID"
							: "your email or phone number"}
					</span>
				</div>
			</div>
		</form>
	);
}

export default LoginPage;
