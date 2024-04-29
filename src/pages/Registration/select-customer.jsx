import { useNavigate, useParams } from "react-router-dom";

function SelectCustomerTypePage() {
	const navigate = useNavigate();
	const { role } = useParams();
	const tabs = ["individual", "business"];

	const handleNavigate = (acct) => {
		navigate(`/sign-up/${role}/create-account`, {
			state: {
				accountType: acct,
			},
		});
	};

	return (
		<div style={{ maxWidth: 400, width: "100%" }} className="py-6 px-4">
			<p className={`text-primary text-3xl font-bold mb-2`}>
				Are you Individual or Registered Business?
			</p>
			<p className="text-sm text-gray-500 mb-6">
				More information should be placed here
			</p>
			<div className="flex gap-3 w-full">
				{tabs.map((item) => (
					<div
						key={item}
						onClick={() => handleNavigate(item)}
						className={`capitalize p-4 flex-1 border-2 border-[#206DB0] text-primary rounded-xl text-center hover:bg-[#206DB0] hover:text-white cursor-pointer font-bold`}
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}

export default SelectCustomerTypePage;
