import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import profile from "../../assets/profile.png";
import earnings from "../../assets/earnings.png";
import settings from "../../assets/settings-icon.png";
import stats from "../../assets/stats.png";
import favourites from "../../assets/favourites.png";
import help from "../../assets/help.png";
import { BaseSelect } from "../../component/select";

const links = [
	{ title: "Profile", img: profile, url: "profile" },
	{ title: "Earning", img: earnings, url: "earning" },
	{ title: "Preferences", img: settings, url: "preferences" },
	// { title: "Stats", img: stats, url: "stats" },
	{ title: "KYC", img: stats, url: "kyc" },
	// { title: "Favourites", img: favourites, url: "favourites" },
	// { title: "Help & Support", img: help, url: "help-and-support" },
];

function MorePage() {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname.split("/").pop();
	// const [pathValue, setPathValue] = useState(path);

	const title = links.find((item) => item.url === path)?.title;

	useEffect(() => {
		document.title = "Job Pro | Settings";
	}, []);

	return (
		<div className="flex w-full flex-col md:flex-row min-h-full bg-[#EAECF0]">
			<div className="w-full p-2 md:w-64 md:p-4 relative">
				<div className="sticky top-20">
					<p className="text-2xl mb-2 md:mb-4">Settings</p>
					<div className="hidden md:block">
						{links.map((item) => (
							<div
								key={item.title}
								className={`flex gap-2 items-center p-2 rounded-md cursor-pointer transition-all ease-linear 300s hover:bg-gray-300 mb-2 ${
									path === item.url
										? "bg-gray-300 font-bold text-dark"
										: "text-gray-500"
								}`}
								onClick={() => navigate(`/settings/${item.url}`)}
							>
								<img src={item.img} alt={item.title} className="h-8" />
								<span className="text-sm">{item.title}</span>
							</div>
						))}
					</div>
					<div className="block md:hidden">
						<div className="">
							<BaseSelect
								onChange={(e) => {
									// setPathValue(e.target.value);
									navigate(`/settings/${e.target.value}`);
								}}
								value={path}
							>
								<option>{title}</option>
								{links
									.filter((link) => link.url !== path)
									.map((item) => {
										return (
											<option key={item.title} value={item.url}>
												{item.title}
											</option>
										);
									})}
							</BaseSelect>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-1 p-2">
				<div className="bg-white h-full w-full rounded-md overflow-hidden">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default MorePage;
