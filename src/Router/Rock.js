import React from "react";
import { withRouter, Route } from "react-router-dom";
import { FA } from "../Firebase";

const Rock = props => {
  return (
    <Route
      exact
      path="/"
      render={() => {
        FA.onAuthStateChanged(user => {
          if (user) {
            props.history.push("/home");
          } else {
            props.history.push("/login");
          }
        });
      }}
    />
  );
};
export default withRouter(Rock);
