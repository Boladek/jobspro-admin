import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

export function LinkElement({ link }) {
	const navigage = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;
	const isSelected = pathname.includes(link.title);

	const handleLink = () => {
		navigage(link.url);
	};

	return (
		<div
			onClick={handleLink}
			className={`cursor-pointer rounded-lg capitalize px-6 py-2 text-base md:text-xs flex gap-1 items-center ${
				isSelected ? "bg-[#E5EEFF] text-adminPrimary font-semibold" : ""
			} hover:bg-adminPrimary/5 hover:text-adminPrimary transition-all ease-linear duration-300`}
		>
			<link.icon filled={isSelected} />
			{link.title}
		</div>
	);
}

LinkElement.propTypes = {
	link: PropTypes.object,
	isSelected: PropTypes.bool,
	handleLink: PropTypes.func,
};
