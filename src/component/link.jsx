import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export function LinkElement({ link }) {
	const location = useLocation();
	const pathname = location.pathname;
	const isSelected = pathname.includes(link);

	const handleLink = () => {};

	return (
		<div
			onClick={handleLink}
			className={`cursor-pointer rounded-md capitalize px-2 py-2 text-base md:text-xs ${
				isSelected ? "bg-[#206DB0] text-white" : ""
			} hover:bg-[#206DB0] hover:text-white transition duration-300 ease-in-out`}
		>
			{link}
		</div>
	);
}

LinkElement.propTypes = {
	link: PropTypes.string,
	isSelected: PropTypes.bool,
	handleLink: PropTypes.func,
};
