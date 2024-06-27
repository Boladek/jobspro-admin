import { useDispatch, useSelector } from "react-redux";
import { Switch } from "../../component/switch";
import { UseAuth } from "../../context/auth-context";
import profileAxios from "../../helpers/profileAxios";
import { useState } from "react";
import { loginSuccess } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import { Overlay } from "../../component/overlay-component";

export function AccountSwitch() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleSwitch = () => {
		let switchType;
		if (user.userType === "pro") {
			switchType = "individual-business";
		} else {
			switchType = "pro";
		}
		setLoading(true);

		profileAxios
			.post("/profile/switch-account", {
				newType: switchType,
			})
			.then((res) => {
				const newDetails = { ...user, userType: res.data.userType };
				dispatch(loginSuccess(newDetails));
				toast.success(res.message);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Switching Account" />}
			<div className="flex gap-2 items-center">
				<div className="py-2 px-4 font-bold text-xs rounded-md bg-[#FFDE16]">
					{user.userType === "pro" ? "Pro" : "Business"} Account
				</div>
				{user.userType !== "business" && (
					<>
						<div className="inline-block w-fit text-xs">
							Switch to {user.userType === "pro" ? "Business" : "Pro"} Account
						</div>
						<div>
							<Switch
								checked={user.userType === "pro"}
								handleChecked={handleSwitch}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}
