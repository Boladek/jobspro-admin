import { useState } from "react";
import { BillingsPage } from "./billings-page";
import { TaxInformationPage } from "./tax-information-page";

const tabs = [
	{ title: "Billings Information", value: "billings" },
	{ title: "Tax Information", value: "tax" },
	{ title: "Password & Security", value: "password" },
	{ title: "Notification", value: "notification" },
	{ title: "Accessibility", value: "accessibility" },
	{ title: "Privacy Polity", value: "privacy" },
	{ title: "Terms of Service", value: "terms" },
];

function PreferencePage() {
	const [currentTab, setCurrentTab] = useState(tabs[0].value);

	return (
		<div className="p-4">
			<div className="flex justify-center border-b pb-4">
				<div className="flex bg-[#F3F8FF] rounded-full p-1 overflow-x-auto">
					{tabs.map((item) => (
						<div
							key={item.value}
							onClick={() => setCurrentTab(item.value)}
							className={`p-2 text-xs md:text-sm cursor-pointer flex justify-center items-center text-center ${
								item.value === currentTab
									? "bg-primary text-white rounded-full"
									: "text-[#789DB8]"
							}`}
						>
							{item.title}
						</div>
					))}
				</div>
			</div>
			<div>
				{currentTab === "billings" && <BillingsPage />}
				{currentTab === "tax" && <TaxInformationPage />}
			</div>
		</div>
	);
}

export default PreferencePage;
