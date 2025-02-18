import PropTypes from "prop-types";
import { formatNumber } from "../../helpers/function";

export function EngagementCard({ title }) {
    return (
        <div className="border border-[#8851FF] rounded-[12px] p-8 relative">
            {title}

            <div className="flex items-center gap-4">
                <div className="text-[10px] p-4 font-[700] bg-[#7E42FF] text-white rounded-[6px]">
                    BUS
                </div>
                <div className="text-[#667085]">
                    <p className="text-[12px]">Payouts</p>
                    <p className="text-[13px]">
                        NGN <strong>{formatNumber(400000, 2)}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

EngagementCard.propTypes = {
    title: PropTypes.node.isRequired,
};
