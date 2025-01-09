import PropTypes from "prop-types";
import { LuSearch } from "react-icons/lu";

export function NoInfo({ className, message }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 justify-center ${
        className || ""
      }`}
    >
      <LuSearch className="text-[44px] text-[#808080]" />
      <p className="text-[12px] font-[500] text-[#808080]">{message}</p>
    </div>
  );
}

NoInfo.propTypes = {
  height: PropTypes.string,
  className: PropTypes.string,
  message: PropTypes.string,
};
