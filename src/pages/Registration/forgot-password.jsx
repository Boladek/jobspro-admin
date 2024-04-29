import { useState } from "react";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { useNavigate } from "react-router-dom";
import { Overlay } from "../../component/overlay-component";

function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate("/reset-password", {
				state: {
					info,
				},
			});
		}, 3000);
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			{loading && <Overlay />}
			<p className={`text-primary text-3xl font-bold`}>Forgot Password</p>
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
