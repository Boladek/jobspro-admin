import React, { useState } from "react";
import { colors } from "../../helpers/theme";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [info, setInfo] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/verify-email", {
			state: {
				info,
			},
		});
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Forgot Password
			</p>
			<p className="text-sm text-gray-500">
				Insert your registered email or phone number
			</p>
			<br />
			<div className="mb-8">
				<BaseInput
					label="Email or Phone Number"
					onChange={(e) => setInfo(e.target.value)}
					value={info}
					required
				/>
			</div>
			<div className="mb-4">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default ForgotPasswordPage;
