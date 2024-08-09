import PropTypes from "prop-types";
import { IncreaseIcon } from "../../../assets/admin/increase-icon.jsx";
import { ProgressBar } from "../../../component/admin/progress-bar.jsx";
import { formatNumber } from "../../../helpers/function.js";

export function StatsCard({
	bg,
	bgColor = "#4A02E3",
	title,
	subTitle,
	value,
	percent,
}) {
	return (
		<div
			className="bg-cover bg-center h-[120px] p-4 rounded-xl text-white min-w-56"
			style={{ backgroundImage: `url(${bg})`, backgroundColor: bgColor }}
		>
			<div className="flex items-center h-1/2 justify-between">
				<div>
					<p className="font-bold text-xs">{title}</p>
					<p className="font-extralight text-sm">{subTitle}</p>
				</div>
				<div className="flex items-center gap-1">
					{value > 0 && <IncreaseIcon />}
					<p className="text-2xl font-bold">{formatNumber(value)}</p>
				</div>
			</div>
			<div className="flex items-center h-1/2 justify-between pt-6">
				<div className="w-24">
					<ProgressBar percent={formatNumber(percent)} color="#00DE74" />
				</div>
				<div className="flex items-center gap-2 text-[9px]">
					<span className="font-light">Today</span>
					<span className="py-0.5 px-2 bg-white rounded-full text-primary font-bold">
						{formatNumber(percent)}%
					</span>
				</div>
			</div>
		</div>
	);
}

StatsCard.propTypes = {
	bg: PropTypes.any,
	bgColor: PropTypes.string,
	title: PropTypes.string,
	subTitle: PropTypes.string,
	value: PropTypes.number,
	percent: PropTypes.number,
};
