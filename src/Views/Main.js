import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//eslint-disable-next-line
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../Router/Routes";

import MenuBar from "../Components/MenuBar";
import Movimentations from "../Components/Movimentations";
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100vh"
  },
  toolbar: {
    display: "flex",
    alignItems: "center"
    // justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    marginTop: "64px",
    height: "calc(100vh - 64px)",
    backgroundColor: theme_def.palette.backgroundMain.main,
    [theme.breakpoints.down('sm')]: {
      height: "auto"
    }
  }
}));

const Main = props => {
  const classes = useStyles();

  function handleLogout() {
    props.onLogout();
  }

  if (props.user)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar onLogout={handleLogout} />
        <main className={classes.content}>
          <Switch>
            {props.routes.map((route, i) => {
              return <RouteWithSubRoutes key={i} {...route} />;
            })}
          </Switch>
          <Movimentations />
        </main>
      </div>
    );
  else return <></>;
};

const mapStateToProps = store => ({
  user: store.user.user
});

export default connect(mapStateToProps)(Main);
