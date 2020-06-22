import React from "react";
// import Loadable from "react-loadable";
//eslint-disable-next-line
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FA } from "../Firebase";
import { get } from "idb-keyval";
import Login from "../Views/Login.js";
import Cadastro from "../Views/Cadastro.js";
import Main from "../Views/Main.js";
import HomeUser from "../Views/HomeUser.js";
import Dashboards from "../Views/Dashboards.js";
import Extrato from "../Views/Extract.js";
import Profile from "../Views/Profile.js";

export const RouteWithSubRoutes = route => (
  <Route
    exact={route.exact}
    path={route.path}
    render={props => {
      if (route.hasOwnProperty("beforeEnter")) {
        route.beforeEnter(props);
      }
      return <route.component {...props} routes={route.routes} />;
    }}
  />
);

export const routes = [
  {
    path: "/login",
    component: Login,
    exact: false
  },
  {
    path: "/cadastro",
    component: Cadastro,
    exact: false
  },
  {
    path: "/",
    exact: false,
    component: Main,
    routes: [
      {
        path: "/home",
        component: HomeUser,
        exact: true,
        //   icon: HomeOutlined,
        alias: "Home"
      },
      {
        path: "/extrato",
        component: Extrato,
        exact: true,
        //   icon: HomeOutlined,
        alias: "Extrato"
      },
      {
        path: "/dashboards",
        component: Dashboards,
        exact: true,
        //   icon: HomeOutlined,
        alias: "Dashboards"
      },
      {
        path: "/perfil",
        component: Profile,
        exact: true,
        //   icon: HomeOutlined,
        alias: "Profile"
      }
    ],
    /* eslint-disable no-debugger, no-console*/
    beforeEnter: async props => {
      // debugger;
      const indexedDB = await get("user");
      var user = FA.currentUser;
      // Verificando se Store e IndexedDB não esta setado user
      if ((indexedDB === undefined || indexedDB === null) && !user) {
        props.history.push("/login");
      }
    }
  }
];

// export default connect()(RouteWithSubRoutes);
