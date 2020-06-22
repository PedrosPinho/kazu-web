import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, CssBaseline } from "@material-ui/core";
import dinheros from "./../assets/dinheros.png"
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  root: {
    height: "50%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white"
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 28,
    width: 28
  },
  icon: {
    height: 16,
    width: 16
  },
  paper: {
    height: "100%",
    position: 'relative',
    backgroundColor: theme_def.palette.secondary.main,
    
  },
  price: {
    fontWeight: "bold",
    fontSize: "6vmin",
    color: "white",
    [theme.breakpoints.down('xs')]: {
      fontSize: "8vmin"
    }
  },
  bg: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: `url(${dinheros})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "350px",
    width: "100%",
    height: "100%",
    opacity: "0.1",
    "&:before": {
      backgroundImage: "white",
      backgroundSize: "cover",
      content: "",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1
    }
    // }
  }
}));

const MoneyBox = props => {
  const classes = useStyles();

  let [info, setInfo] = React.useState({});

  React.useEffect(() => {
    if (props.info) setInfo(props.info);
  }, [props]);

  return (
    <>
      <CssBaseline />
      <Card className={classes.paper}>
        <div className={classes.bg} />
        <CardContent style={{ height: "100%" }}>
          <Grid container alignItems="center" style={{ height: "100%" }}>
            <Grid container>
              <Typography className={classes.title} color="inherit">
                {info.title}
              </Typography>
            </Grid>
            <Grid container justify="center">
              <Typography className={classes.price} color="inherit">
                {info.qtd}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

// TotalProfit.propTypes = {
//   className: PropTypes.string
// };

export default MoneyBox;
