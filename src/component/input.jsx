import React from "react";
import PropTypes from "prop-types";

export const BaseInput = React.forwardRef(
  ({ label, id, handleChange, value, error, errorText, ...rest }, ref) => {
    return (
      <div className="w-full">
        <label className="inline-block text-gray-600 text-xs mb-1" htmlFor={id}>
          {label}
        </label>
        <input
          className="bg-gray-100 disabled:opacity-75 disabled:text-gray-600 w-full p-3 border border-black/50 text-xs bg-white rounded-md focus:outline-none focus:border-primary"
          ref={ref}
          id={id}
          value={value}
          onChange={handleChange}
          {...rest}
        />
        {error && errorText && (
          <p className="text-xs text-red-600 mt-1">{errorText}</p>
        )}
      </div>
    );
  }
);

BaseInput.displayName = "NativeInput";

BaseInput.propTypes = {
  label: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  error: PropTypes.bool,
  children: PropTypes.any,
};
