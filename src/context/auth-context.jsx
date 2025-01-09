import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import storage from "../helpers/storage";

// Create AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const UseAuth = () => {
  return useContext(AuthContext);
};

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const user = storage.getUser();

  const value = {
    user: user ?? {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
