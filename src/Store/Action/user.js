import { set } from "idb-keyval";
// import { loginF, logoutF } from "../../Fetch/user";

export const login = user => {
  return async dispatch => {
    try {
      set("user", user);
      console.log("Login with redux -> Success");
      return dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      console.log("Login with redux -> Failed");
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: "LOGOUT" });
    set("user", null);
  };
};
