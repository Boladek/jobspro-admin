import PropTypes from "prop-types";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LinkElement({ link }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isSelected = useMemo(() => {
    return link.url === pathname;
  }, [pathname, link.url]);

  return (
    <div
      key={link.title}
      className="flex gap-2 items-center p-4"
      onClick={() => navigate(link.url)}
    >
      <div>
        <link.icon fill={isSelected ? "#0030DC" : undefined} />
      </div>
      <div
        className={`text-[14px] font-[700] cursor-pointer hover:text-[#0030DC80] ${
          isSelected ? "text-[#0030DC]" : "text-[#667085]"
        }`}
      >
        {link.title}
      </div>
    </div>
  );
}

LinkElement.propTypes = {
  link: PropTypes.object.isRequired,
};
