import PropTypes from "prop-types";

export function ChatsIcon({ fill = "#667085", size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 5C5.16827 5 5.08708 5.00231 5.00648 5.00686C5.58328 4.10095 6.59644 3.5 7.74996 3.5H15.75C18.9256 3.5 21.5 6.07436 21.5 9.25V13.25C21.5 14.4035 20.899 15.4166 19.9931 15.9934C19.9977 15.9129 20 15.8317 20 15.75V9.25C20 6.90279 18.0972 5 15.75 5H5.25ZM2 9.25C2 7.45507 3.45507 6 5.25 6H15.75C17.5449 6 19 7.45507 19 9.25V15.75C19 17.5449 17.5449 19 15.75 19H10.7475L6.98989 21.7595C6.16433 22.3657 5 21.7762 5 20.752V18.9905C3.32189 18.8629 2 17.4608 2 15.75V9.25Z"
        fill={fill}
      />
    </svg>
  );
}

ChatsIcon.propTypes = {
  fill: PropTypes.string, // The fill color of the icon
  size: PropTypes.number,
};
