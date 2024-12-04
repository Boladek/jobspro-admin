import PropTypes from "prop-types";

export function ChartIcon({ fill = "#667085", size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7276 0.215749C10.8731 0.0745085 11.0696 -0.00179166 11.2723 0.00423834C16.0267 0.145748 19.8545 3.97351 19.996 8.72785C20.002 8.93055 19.9257 9.12705 19.7844 9.27255C19.6432 9.41805 19.4491 9.50015 19.2463 9.50015H11.25C10.8358 9.50015 10.5 9.16445 10.5 8.75015V0.753908C10.5 0.551128 10.5821 0.356989 10.7276 0.215749ZM9 2.78394C9 2.57332 8.9114 2.37241 8.756 2.23032C8.6005 2.08824 8.3925 2.01807 8.1827 2.03697C3.59476 2.45041 0 6.30514 0 11.0003C0 15.9708 4.02944 20.0003 9 20.0003C13.6952 20.0003 17.5499 16.4055 17.9633 11.8176C17.9822 11.6078 17.9121 11.3998 17.77 11.2443C17.6279 11.0888 17.427 11.0003 17.2164 11.0003H9V2.78394Z"
        fill={fill}
      />
    </svg>
  );
}

ChartIcon.propTypes = {
  fill: PropTypes.string, // The fill color of the icon
  size: PropTypes.number,
};
