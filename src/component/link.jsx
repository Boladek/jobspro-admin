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
			className={`cursor-pointer rounded-md capitalize px-2 py-2 text-base md:text-xs ${
				isSelected ? "bg-[#206DB0] text-white" : ""
			} hover:bg-[#206DB0] hover:text-white transition-all ease-linear duration-300`}
		>
			{link.title}
		</div>
	);
}

LinkElement.propTypes = {
	link: PropTypes.string,
	isSelected: PropTypes.bool,
	handleLink: PropTypes.func,
};
