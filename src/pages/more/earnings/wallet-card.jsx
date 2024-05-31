import PropTypes from "prop-types";
import { formatNumber } from "../../../helpers/function";

export function WalletCard({ title, value, button = null }) {
	return (
		<div className="p-2 w-56 border rounded-lg bg-primary h-32 relative">
			{button && <div className="absolute top-2 right-2">{button}</div>}
			<div className="absolute bottom-2 right-2 text-white text-center">
				<p className="text-xs font-extralight">{title}</p>
				<p className="font-bold">{formatNumber(value)}</p>
			</div>
		</div>
	);
}

WalletCard.propTypes = {
	title: PropTypes.string,
	value: PropTypes.number,
	button: PropTypes.node,
};
