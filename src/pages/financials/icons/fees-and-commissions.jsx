import PropTypes from "prop-types";

export function FeesAndCommissionsIcon({ fill = "#667085" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.499 9.49905L11.5 21.001L6.25006 21.0017C4.51701 21.0017 3.10076 19.6454 3.00514 17.9362L3 17.7518V9.49905H11.499ZM12.999 15.499H21.5L21.5008 17.7518C21.5006 19.5466 20.0456 21.0017 18.2507 21.0017L13 21.001L12.999 15.499ZM18.2514 2.49805C19.9844 2.49805 21.4007 3.8544 21.4963 5.56354L21.5014 5.74797L21.5 13.999H12.999L13 2.49805H18.2514ZM11.5 2.49805L11.499 7.99905H3L3.0006 5.74799C3.00081 3.95316 4.45582 2.49805 6.25065 2.49805H11.5Z"
        fill={fill}
      />
    </svg>
  );
}

FeesAndCommissionsIcon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};
