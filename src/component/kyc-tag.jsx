import kyctag from "../assets/kyc-tag.png";
import PropTypes from "prop-types";

export function KycTag({ text = "Tier 1" }) {
	return (
		<span className="flex gap-1 rounded-full p-2 bg-[#FFF9D6] text-xs items-center justify-center w-fit">
			<img src={kyctag} alt="Kyc Tag" className="h-4" />
			<span>{text}</span>
		</span>
	);
}

KycTag.propTypes = {
	text: PropTypes.string,
};
