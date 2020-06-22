import React from "react";
import theme_def from "./Config/_theme.jsx";

import { makeStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Rock from "./Router/Rock.js";
import { RouteWithSubRoutes, routes } from "./Router/Routes";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#ededed"
    }
  }
}));

function App() {
  useStyles();

  return (
    <ThemeProvider theme={theme_def}>
      <Router basename="/">
        <Switch>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />;
          })}
          <Rock />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
