import PropTypes from "prop-types";
import { formatNumber } from "../../../helpers/function";

export function WalletCard({ title, value, button = null }) {
	return (
		<div className="p-4 rounded-lg bg-[#78AD84] text-white relative w-full max-w-sm h-32">
			{button && <span className="absolute top-2 right-2">{button}</span>}
			<div className="absolute bottom-2 right-2 text-white text-right">
				<p className="text-xs font-extralight">{title}</p>
				<p className="font-bold text-2xl">N{formatNumber(value)}</p>
			</div>
		</div>
	);
}

WalletCard.propTypes = {
	title: PropTypes.string,
	value: PropTypes.number,
	button: PropTypes.node,
};
