import { ForwardIcon } from "../../../assets/forward-icon";
import { RewindIcon } from "../../../assets/rewind-icon";
import PropTypes from "prop-types";

export function SectionCard({
	isReversed = true,
	progressSection,
	title,
	text,
}) {
	return (
		<div className="w-full p-3 border rounded-lg bg-white border-primary flex gap-2 items-center">
			<div className="p-3 rounded-lg bg-[#FEDF00]">
				{isReversed ? <RewindIcon /> : <ForwardIcon />}
			</div>
			<div className="flex-1">
				<p className="text-primary font-semibold text-sm">{title}</p>
				<p className="text-xs">{text}</p>
			</div>
			<div className="w-1/5">{progressSection}</div>
		</div>
	);
}

SectionCard.propTypes = {
	fill: PropTypes.string,
	isReversed: PropTypes.bool,
	progressSection: PropTypes.node,
	title: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
