import { createMuiTheme } from "@material-ui/core/styles";

const theme_def = createMuiTheme({
  palette: {
    primary: {
      main: "#010038"
    },
    secondary: {
      main: "#293a80"
    },
    backgroundMain: { main: "#d6d6d6" },
    textSideMenu: { main: "#757575" },
    bgTxtSideMenu: { main: "#FFF" },
    fontColorIcon: { main: "#FFF" },
    txtWithBg: { main: "#FFF" },
    txtPrimary: { main: "#000" },
    txtSecondary: { main: "#404040" },
    button: { main: "#f39422" }
  }
});

export default theme_def;
