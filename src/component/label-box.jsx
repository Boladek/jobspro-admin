import PropTypes from "prop-types";

export function LabelBox({
  label,
  value,
  color = "#FFDE16",
  textColor = "#000000",
}) {
  return (
    <div className="relative p-2 px-6 border text-[12px] rounded-[8px] border-[#D0D5DD] font-[600]">
      {label}
      <div
        className="absolute top-[-10px] right-[-5px] h-[24px] min-w-[24px] w-fit flex items-center justify-center rounded-md font-[700]"
        style={{ color: textColor, background: color }}
      >
        {value}
      </div>
    </div>
  );
}

LabelBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
