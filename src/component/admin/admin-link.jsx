import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// fill={isSelected ? "#1A68FF" : "#667085"}
export function AdminLink({ link, isSelected }) {
  const navigate = useNavigate();
  const Icon = link.icon;
  return (
    <div
      className={`px-3 py-2 rounded-lg flex gap-2 items-center text-[14px] cursor-pointer hover:bg-[#E5EEFF] transition-all ease-linear 300s ${
        isSelected ? "bg-[#E5EEFF]" : ""
      }`}
      onClick={() => navigate(link.url)}
    >
      <span
        className={`${
          isSelected
            ? "bg-[#E5EEFF] text-[#1A68FF] font-[600]"
            : "font-[300] text-[#667085]"
        }`}
      >
        {link.title}
      </span>
      <link.icon fill={isSelected ? "#1A68FF" : "#667085"} />
    </div>
  );
}

AdminLink.propTypes = {
  link: PropTypes.object,
  isSelected: PropTypes.bool,
};
