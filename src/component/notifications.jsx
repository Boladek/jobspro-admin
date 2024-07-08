import { useRef, useState, useEffect } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { ProgressBar } from "./admin/progress-bar";
import { Notification } from "./notification";
import { generateArray } from "../helpers/function";

const tabs = ["All", "Gigs", "Wallet", "Profile", "Others"];

export function Notifications() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const dropdownRef = useRef(null);

	// Function to toggle dropdown visibility
	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
		// setIsDropdownOpen((prevState) => !prevState);
	};

	// Close dropdown when clicking outside of it
	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target) &&
			event.target.id !== "menu-button"
		) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className="relative">
				<div className="p-1 rounded-full absolute -right-2 -top-3 text-tiny bg-adminPrimary text-white w-fit">
					<span>20</span>
				</div>
				<BsFillBellFill
					className="text-2xl hover:text-gray-500 cursor-pointer"
					// ref={buttonRef}
					onClick={toggleDropdown}
				/>
				{isDropdownOpen && (
					<div
						className="absolute right-0 p-4 rounded-md shadow-sm border w-screen max-w-md bg-white z-10"
						ref={dropdownRef}
					>
						<div className="flex gap-4 items-center p-2">
							<p className="text-xs font-bold text-primary">Notifications</p>
							<div className="flex flex-1 justify-evenly">
								{tabs.map((tab) => (
									<div key={tab} onClick={() => setActiveTab(tab)}>
										<p
											className={`${
												activeTab === tab ? "font-semibold" : ""
											} text-xs w-10 cursor-pointer hover:font-semibold`}
										>
											{tab}
										</p>
										{activeTab === tab && (
											<div className="w-5">
												<ProgressBar color="#FEDF00" thickness={1.5} />
											</div>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="max-h-[70vh] overflow-y-auto">
							{generateArray(25).map(() => (
								<Notification key={Math.random()} />
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
