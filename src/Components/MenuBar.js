import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InsertChart from "@material-ui/icons/InsertChart";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ProfileIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import { logout } from "../Store/Action/user";
import { del_info } from "../Store/Action/info";
import { connect, useDispatch } from "react-redux";
import { FA } from "../Firebase";
import kazuBranco from "../assets/kazu-escrita.png"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("sm")]: {
      minHeight: 64
    }
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      zIndex: "1000",
      position: "fixed"
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 73,
    [theme.breakpoints.down("sm")]: {
      width: 0
    }
  },
  toolbar: {
    height: 64,
    display: "flex"
  },
  background: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: drawerWidth,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    transition: "background 2s",
    zIndex: 100000,
    overflow: "hidden"
  }
}));

const MenuBar = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleLogout() {
    dispatch(logout());
    dispatch(del_info());
    FA.signOut();
    props.history.push("/login");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar style={{ position: "relative" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={kazuBranco}
            alt="KAZU"
            style={{
              position: "relative",
              width: "100px",
            }}
          />
          <IconButton
            style={{ position: "absolute", right: "20px" }}
            color="inherit"
            edge="end"
          >
            <Link
              href="/perfil"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ProfileIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={handleDrawerClose}
            style={{ borderRadius: "0px" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ padding: "0px" }}>
          <Link href="/home" style={{ color: "black", textDecoration: "none" }}>
            <ListItem
              style={{ paddingRight: 24, paddingLeft: 24 }}
              button
              href="/home"
            >
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          {/* <Link href='/home/minha-carteira' style={{color: 'black', textDecoration: 'none'}}>
                        <ListItem button>
                            <ListItemIcon>{<WalletIcon />}</ListItemIcon>
                            <ListItemText primary={"Minha Carteira"} />
                        </ListItem>
                    </Link> */}
          <Link
            href="/extrato"
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem style={{ paddingRight: 24, paddingLeft: 24 }} button>
              <ListItemIcon>{<WalletIcon />}</ListItemIcon>
              <ListItemText primary={"Extrato"} />
            </ListItem>
          </Link>
          <Link
            href="/dashboards"
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem style={{ paddingRight: 24, paddingLeft: 24 }} button>
              <ListItemIcon>{<InsertChart />}</ListItemIcon>
              <ListItemText primary={"Indicadores"} />
            </ListItem>
          </Link>
          <ListItem
            style={{ paddingRight: 24, paddingLeft: 24 }}
            button
            onClick={handleLogout}
          >
            <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <div
        onClick={handleDrawerClose}
        className={open ? classes.background : null}
      />
    </div>
  );
};

export default withRouter(connect()(MenuBar));
