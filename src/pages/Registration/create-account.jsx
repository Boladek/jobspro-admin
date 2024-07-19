import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { BaseSelect } from "../../component/select";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";
import google from "../../assets/google.png";
import { countriesCode } from "../../helpers/countries";
import { Overlay } from "../../component/overlay-component";
import { colors } from "../../helpers/theme";
import profileAxios from "../../helpers/profileAxios";

function CreateAccountPage() {
	const navigate = useNavigate();
	const { role } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm();
	const watchCode = watch("code", "");
	const watchPassword = watch("password", "");
	const watchConfirmPassword = watch("confirmPassword", "");
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(true);
	const [remember, setRemember] = useState(false);

	const [specialCharCheck, setSpecialCharCheck] = useState(false);
	const [numberCharCheck, setNumberCharCheck] = useState(false);
	const [capitalCheck, setCapitalCheck] = useState(false);
	const isUpperCase = (string) => /[A-Z]/.test(string);

	const onSubmit = (data) => {
		if (data.confirmPassword !== data.password) {
			toast.error(
				"Please ensure that both password and confirm password match."
			);
			return;
		}
		setLoading(true);
		profileAxios
			.post("/auth/signup", {
				email: data.email.trim(),
				password: data.password,
				firstName: data.firstName || "",
				lastName: data.lastName || "",
				phone: data.code + data.phoneNumber,
				companyName: data.companyName || "",
				countryCode: "NG",
				userType: role,
				appCode: "JP",
			})
			.then(() => {
				// console.log(res);
				navigate(`/verify-email/${data.email.trim()}/`);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	// const responseFacebook = (res) => {
	// 	// console.log(res);
	// 	setValue("lastName", res.data.first_name);
	// 	setValue("firstName", res.data.last_name);
	// 	setValue("email", res.data.email);
	// };

	const googeLogin = useGoogleLogin({
		onSuccess: (codeResponse) => {
			axios
				.get(
					`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${codeResponse.access_token}`,
							Accept: "application/json",
						},
					}
				)
				.then((res) => {
					// setProfile(res.data);
					// console.log({ res });
					setValue("lastName", res.data.family_name);
					setValue("firstName", res.data.given_name);
					setValue("email", res.data.email);
					// setValue("companyName", res.data.name);
				})
				.catch((err) => console.log(err));
		},
		onError: (error) => console.log("Login Failed:", error),
	});

	// const mirosoftLogin = async () => {
	// 	const loginRequest = {
	// 		scopes: ["openid", "profile", "User.Read"],
	// 	};
	// 	try {
	// 		const loginResponse = await msalInstance.loginPopup(loginRequest);
	// 		console.log("loginResponse", loginResponse);
	// 	} catch (error) {
	// 		console.log("loginError", error);
	// 	}
	// };

	// useEffect(() => {
	// 	async function initializeMsal() {
	// 		try {
	// 			console.log("Initializing MSAL...");
	// 			await msalInstance.handleRedirectPromise();
	// 			console.log("MSAL initialized successfully.");
	// 		} catch (error) {
	// 			console.error("MSAL initialization error:", error);
	// 		}
	// 	}

	// 	if (!msalInstance.isInitialized()) {
	// 		initializeMsal();
	// 	}
	// }, [msalInstance]);

	useEffect(() => {
		const handleChange = (value) => {
			setSpecialCharCheck(checkForSpecialChar(value));
			setNumberCharCheck(checkForNumber(value));
			setCapitalCheck(isUpperCase(value));
		};
		if (watchPassword) handleChange(watchPassword);
	}, [watchPassword]);

	useEffect(() => {
		const handleConfirmPasswordChange = (value) => {
			setSpecialCharCheck(checkForSpecialChar(value));
			setNumberCharCheck(checkForNumber(value));
			setCapitalCheck(isUpperCase(value));
		};

		if (watchConfirmPassword) handleConfirmPasswordChange(watchConfirmPassword);
	}, [watchConfirmPassword]);

	useEffect(() => {
		document.title = "Jobs Pro | Signup";
	}, []);

	// const onLoginStart = useCallback(() => {
	// 	alert("login start");
	// }, []);

	// const onLogoutSuccess = useCallback(() => {
	// 	// setProfile(null);
	// 	// setProvider("");
	// 	// alert("logout success");
	// }, []);

	// const onLogout = useCallback(() => {}, []);

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="px-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay />}
			<p className={`text-primary text-3xl font-bold`}>
				{role === "pro" && "Sign up to a find gig"}
				{(role === "business" || role === "individual") &&
					"Sign up to hire Pros"}
				{role === "agent" && "Sign up to manage Pros"}
			</p>
			<p className="text-sm text-gray-500">Let’s get to know you better</p>
			<br />
			{role !== "business" && (
				<>
					<div className="flex justify-between gap-2 mb-4">
						<div
							className="flex-1 flex gap-1 items-center bg-gray-200 p-2 text-xs rounded-full justify-center hover:bg-gray-100 hover:outline hover:outline-1"
							onClick={googeLogin}
						>
							<img src={google} className="h-5" alt="Google login" />{" "}
							<span className="cursor-pointer">Google</span>
						</div>
					</div>
					<div className="flex items-center mb-4 text-xs text-gray-400 gap-2">
						<div
							className="flex-1 bg-gray-200 rounded-full"
							style={{
								height: 1,
							}}
						/>
						<span>Or</span>
						<div
							className="flex-1 bg-gray-200 rounded-full"
							style={{
								height: 1,
							}}
						/>
					</div>
				</>
			)}

			{role === "business" ? (
				<div className="mb-2">
					<BaseInput
						label="Company Name"
						{...register("companyName", {
							required: "This field is required",
							minLength: {
								value: 2,
								message: "Atleast minimum of 2 characters is required",
							},
							setValueAs: (v) => v.trim(),
						})}
						error={errors.companyName}
						errorText={errors.companyName && errors.companyName.message}
					/>
				</div>
			) : (
				<>
					<div className="mb-2">
						<BaseInput
							label="First Name"
							{...register("firstName", {
								required: "This field is required",
								minLength: {
									value: 2,
									message: "Atleast minimum of 2 characters is required",
								},
								setValueAs: (v) => v.trim(),
							})}
							error={errors.firstName}
							errorText={errors.firstName && errors.firstName.message}
						/>
					</div>
					<div className="mb-2">
						<BaseInput
							label="Last Name"
							{...register("lastName", {
								required: "This field is required",
								minLength: {
									value: 2,
									message: "Atleast minimum of 2 characters is required",
								},
								setValueAs: (v) => v.trim(),
							})}
							error={errors.lastName}
							errorText={errors.lastName && errors.lastName.message}
						/>
					</div>
				</>
			)}

			<div className="mb-2">
				<BaseInput
					label="Email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "invalid email address",
						},
						setValueAs: (value) => value.trim(),
					})}
					error={errors.email}
					errorText={errors.email && errors.email.message}
				/>
			</div>

			{role !== "business" && (
				<>
					<div className="relative mb-2">
						<BaseSelect
							label="Country Code"
							{...register("code", {
								required: "The field is required",
							})}
							error={errors.code}
							errorText={errors.code && errors.code.message}
						>
							<option></option>
							{countriesCode.map((country) => (
								<option key={country.name} value={country.dial_code}>
									{country.name} ({country.dial_code})
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="relative mb-2">
						<BaseInput
							label="Phone Number"
							{...register("phoneNumber", {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.phoneNumber}
							errorText={errors.phoneNumber && errors.phoneNumber.message}
							style={{
								paddingLeft: "3rem",
							}}
						/>
						<span
							className="absolute cursor-pointer transition-all ease-linear duration-300 text-sm"
							style={{
								left: "0.5rem",
								top: "2.5rem",
							}}
						>
							{watchCode}
						</span>
					</div>
				</>
			)}
			<div className="relative mb-2">
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
			<div className="mb-2 italic">
				<p
					className="text-xs"
					style={{ color: watchPassword.length >= 6 ? colors.primary : "red" }}
				>
					At least 6 characters.
				</p>
				<p
					className="text-xs"
					style={{ color: capitalCheck ? colors.primary : "red" }}
				>
					A minimum of 1 upper case
				</p>
				<p
					className="text-xs"
					style={{ color: numberCharCheck ? colors.primary : "red" }}
				>
					1 numeric character [0-9]
				</p>
				<p
					className="text-xs"
					style={{ color: specialCharCheck ? colors.primary : "red" }}
				>
					A minimum of 1 special character: ~`!@#$%^&*()-_+={}[]
				</p>
				<p
					className="text-xs"
					style={{
						color:
							watchPassword === watchConfirmPassword ? colors.primary : "red",
					}}
				>
					Password and Confirm Password Match
				</p>
			</div>
			<div className="relative mb-2">
				<BaseInput
					label="Confirm Password"
					type={confirmPassword ? "password" : "text"}
					{...register("confirmPassword", {
						required: "The field is required",
					})}
					error={errors.confirmPassword}
					errorText={errors.confirmPassword && errors.confirmPassword.message}
				/>
				<img
					src={confirmPassword ? eye : eyeSlash}
					onClick={() => setConfirmPassword(!confirmPassword)}
					className={`absolute cursor-pointer ${
						confirmPassword ? "h-5" : "h-7"
					} transition-all ease-linear duration-300`}
					style={{
						top: confirmPassword ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<input
						value={remember}
						onChange={(e) => setRemember(e.target.checked)}
						type="checkbox"
						required
						className="form-checkbox h-5 w-5 text-indigo-600 border-indigo-600 rounded"
					/>
					<label className="text-xs">
						Yes, I understand and agree to the{" "}
						<span className={`text-primary underline`}>
							Upwork Terms of Service
						</span>
						, including the{" "}
						<span className={`text-primary underline`}>User Agreement</span> and{" "}
						<span className={`text-primary underline`}>Privacy Policy</span>.
					</label>
				</div>
			</div>
			<div className="">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default CreateAccountPage;

function checkForSpecialChar(string) {
	const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
	for (let i = 0; i < specialChars.length; i++) {
		if (string.indexOf(specialChars[i]) > -1) {
			return true;
		}
	}
	return false;
}

function checkForNumber(string) {
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(Number(string[i]))) return true;
	}
	return false;
}

/*

<div
							className="flex-1 flex gap-1 items-center bg-gray-200 p-2 text-xs rounded-full justify-center hover:bg-gray-100 hover:outline hover:outline-1"
							// onClick={googeLogin}
						>
							{/* <img src={facebook} className="h-5" alt="Facebook login" />{" "}
							<FacebookLogin
								appId="608413574262901"
								autoLoad={true}
								fields="name,email,picture"
								cssClass="text-xs cursor-pointer hover:underline"
								// onClick={componentClicked}
								callback={responseFacebook}
								textButton="Facebook"
							/> 
						
							<LoginSocialFacebook
								appId="608413574262901"
								fieldsProfile={
									"id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
								}
								onLoginStart={onLoginStart}
								onLogoutSuccess={onLogoutSuccess}
								redirect_uri={REDIRECT_URI}
								onResolve={({ provider, data }) => {
									// setProvider(provider);
									// setProfile(data);
									console.log({ provider, data });
								}}
								onReject={(err) => {
									console.log(err);
								}}
							>
								<FacebookLoginButton />
							</LoginSocialFacebook>
						</div>

							{/*
						<div
							className="flex-1 flex gap-1 items-center bg-gray-200 p-2 text-xs rounded-full justify-center hover:bg-gray-100 hover:outline hover:outline-1 cursor-pointer"
							onClick={mirosoftLogin}
						>
							
							<LoginSocialMicrosoft
								client_id="833ec980-62e1-40a3-ac75-a082e2edd517"
								redirect_uri={REDIRECT_URI}
								onLoginStart={onLoginStart}
								onResolve={({ provider, data }) => {
									// setProvider(provider);
									// setProfile(data);
									console.log({ data, provider });
								}}
								onReject={(err) => {
									console.log(err);
								}}
							>
								<MicrosoftLoginButton />
							</LoginSocialMicrosoft> 
							{/* <img src={microsoft} className="h-5" alt="Google login" />{" "}
							<span className="cursor-pointer">Microsoft</span> 
						{/* </div> 
*/
