import hammer from "../../assets/hammer-icon.png";
import phone from "../../assets/phone-icon.png";
import search from "../../assets/phone-icon.png";
import { useNavigate } from "react-router-dom";

function RolePage() {
	const navigate = useNavigate();
	const roles = [
		{
			role: "pros",
			description: "Available to work for the right price",
			image: hammer,
		},
		{
			role: "customer",
			description: "I’m looking for a trustworthy Pro to work for me",
			image: search,
		},
		{
			role: "agent",
			description: "Available to manage Pros and earn commission",
			image: phone,
		},
	];

	const handleNavigate = (role) => {
		if (role === "customer") {
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
						className="border border-gray-200 rounded-md p-4 flex items-center w-full hover:shadow-md cursor-pointer"
					>
						<div className="w-1/5">
							<img src={role.image} alt={role.description} />
						</div>
						<div className="w-4/5">
							<div className={`text-primary capitalize text-2xl font-bold`}>
								{role.role}
							</div>
							<div className="text-xs text-gray-500">{role.description}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RolePage;
