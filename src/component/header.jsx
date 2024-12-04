import logo from "../assets/logo.svg";
// import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
	// const navigate = useNavigate();
	// const location = useLocation();
	// const pathname = location.pathname;
	return (
		<div className="py-3 px-2 gap-2 sm:px-6 w-full flex justify-between items-center border-gray-300 border-b sticky top-0 bg-white">
			<img src={logo} alt="Favicon" className="h-8" />
			{/* {pathname === "/" && (
				<div className="text-xs">
					I don’t have a Job’s Pro account?{" "}
					<span
						onClick={() => navigate("/sign-up")}
						className={`text-primary underline cursor-pointer font-bold`}
					>
						Register{" "}
					</span>
					to get started
				</div>
			)}
			{pathname !== "/" && (
				<div className="text-xs">
					Already a JobsPro member?{" "}
					<span
						onClick={() => navigate("/")}
						className={`text-primary underline cursor-pointer font-bold`}
					>
						Login
					</span>
				</div>
			)} */}
		</div>
	);
}
