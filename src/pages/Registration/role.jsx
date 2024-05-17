import { BriefcaseIcon } from "../../assets/briefcase";
import hammer from "../../assets/hammer-icon.png";
import phone from "../../assets/phone-icon.png";
import search from "../../assets/phone-icon.png";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/search-icon";

function RolePage() {
	const navigate = useNavigate();
	const roles = [
		{
			role: "pro",
			description: "Available to work for the right price",
			image: hammer,
			color: "rgba(21, 111, 181, 1)",
			icon: BriefcaseIcon,
		},
		{
			role: "business",
			description: "I’m looking for a trustworthy Pro to work for me",
			image: search,
			color: "rgba(238, 21, 81, 1)",
			icon: SearchIcon,
		},
		// {
		// 	role: "agent",
		// 	description: "Available to manage Pros and earn commission",
		// 	image: phone,
		// },
	];

	const handleNavigate = (role) => {
		if (role === "business") {
			navigate(`${role}/select-customer`);
		} else {
			navigate(`${role}/create-account`);
		}
	};

	return (
		<div style={{ maxWidth: 400, width: "100%" }} className="py-6 px-4">
			<p className={`text-primary text-3xl font-bold mb-2`}>Join as a</p>
			<p className="text-sm text-gray-500 mb-4">
				Join the freelance ecosystem: Talent, agents, clients, together.
			</p>
			<div className="flex flex-col gap-3 w-full">
				{roles.map((role) => (
					<div
						onClick={() => handleNavigate(role.role)}
						key={Math.random()}
						className="border border-gray-200 rounded-full p-1.5 gap-2 flex items-center w-full hover:shadow-md cursor-pointer text-white"
						style={{
							background: role.color,
						}}
					>
						<div className={`p-4 rounded-full border bg-white`}>
							<role.icon fill={role.color} />
						</div>
						<div className="flex-1 text-white">
							<div className="capitalize text-lg font-bold">{role.role}</div>
							<div className="text-xs">{role.description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RolePage;
