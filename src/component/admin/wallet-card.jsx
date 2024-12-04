import PropTypes from "prop-types";
import { formatNumber } from "../../helpers/function";
import { WalletIcon } from "../../assets/admin/wallet-icon";

export function WalletCard({ title, value, bg, fill, cardBg }) {
  return (
    <div
      className="w-full px-4 py-8 rounded-xl flex items-center gap-2"
      style={{
        background: bg,
      }}
    >
      <div>
        <span
          className="p-4 flex justify-center items-center rounded-full"
          style={{ background: cardBg }}
        >
          <WalletIcon fill={fill} />
        </span>
      </div>
      <div>
        <p className="text-xs font-extralight">{title}</p>
        <p className="text-2xl font-bold text-gray-600">{value}</p>
      </div>
    </div>
  );
}

WalletCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  bg: PropTypes.string,
  fill: PropTypes.string,
  cardBg: PropTypes.string,
};
