import { useState, useRef, useEffect } from "react";
import avatar from "../assets/profile-avatar.png";
import tickIcon from "../assets/tick-circle.png";
import available from "../assets/available.png";
import referral from "../assets/referral.png";
import settings from "../assets/settings-icon.png";
import logout from "../assets/logout.png";
import { BaseButton } from "./button";
import { Switch } from "./switch";

export function AvatarSection() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [availableCheck, setAvailableCheck] = useState(false);
	const dropdownRef = useRef(null);

	// Function to toggle dropdown visibility
	const toggleDropdown = () => {
		setIsDropdownOpen((prevState) => !prevState);
	};

	// Close dropdown when clicking outside of it
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
		<div className="relative">
			<img
				src={avatar}
				className="h-9 cursor-pointer hover:opacity-80"
				id="menu-button"
				aria-haspopup="true"
				onClick={toggleDropdown}
				alt="Avatar"
				aria-expanded={isDropdownOpen}
				title="Click to see more information"
			/>

			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="absolute right-0 z-10 mt-2 w-56 origin-top-right p-3 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
				>
					<div className="flex gap-1 items-center mb-4" role="none">
						<div>
							<img
								src={avatar}
								className="h-12 cursor-pointer hover:opacity-80"
								alt="Avatar"
							/>
						</div>
						<div>
							<div className="text-sm font-bold flex gap-1 items-center">
								<span>Nneka Adeniyi</span>
								<img src={tickIcon} alt="Tick circle" className="h-5" />
							</div>
							<span
								className="bg-[#42BE65] px-2 rounded-full text-white text-xs vertical-align"
								style={{
									padding: ".125rem .5rem",
								}}
							>
								Pro
							</span>
						</div>
					</div>
					<div className="mb-4">
						<BaseButton variant="sec" size="small">
							Switch to Business
						</BaseButton>
					</div>
					<hr />
					<div className="mt-4">
						<div className="flex justify-between items-center p-1">
							<div className="flex gap-2 items-center">
								<img src={available} alt="Availability" className="h-6" />
								<span className="text-xs text-gray-500">Availability</span>
							</div>
							<div>
								<Switch
									checked={availableCheck}
									handleChecked={() => setAvailableCheck((prev) => !prev)}
								/>
							</div>
						</div>
						<div className="p-1">
							<div className="flex gap-2 items-center cursor-pointer">
								<img src={referral} alt="Referrals" className="h-6" />
								<span className="text-xs text-gray-500 hover:text-black">
									Referrals
								</span>
							</div>
						</div>
						<div className="p-1">
							<div className="flex gap-2 items-center cursor-pointer">
								<img src={settings} alt="Settings" className="h-6" />
								<span className="text-xs text-gray-500 hover:text-black">
									Settings
								</span>
							</div>
						</div>
						<div className="p-1">
							<div className="flex gap-2 items-center cursor-pointer">
								<img src={logout} alt="Logout" className="h-6" />
								<span className="text-xs text-red-500 hover:text-red-700">
									Logout
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
