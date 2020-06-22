import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MoneyBox from "../Components/MoneyBox";
import MiniExtract from "../Components/MiniExtract";
import BanksHome from "../Components/BanksHome";
import { get_info } from "../Store/Action/info";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  rootTop: {
    display: "flex",
    minHeight: 171.3,
    height: "calc(30vh - 64px)",
    // backgroundColor: "#ececec",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },
  rootBot: {
    display: "flex",
    minHeight: 171.3,
    height: "calc(70vh - 64px)",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },
  moneyBox: {
    padding: "20px 10px",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0px"
    }
  },
  MiniExtract: {
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0px"
    }
  },
  Banks: {
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      padding: "5px 0px"
    }
  }
}));

const HomeUser = props => {
  const classes = useStyles();
  let [_ref, setRef] = React.useState({ empty: true });
  let [usrconta, setUsrconta] = React.useState([]);
  let [info, setInfo] = React.useState({});

  let dispatch = useDispatch();

  React.useEffect(() => {
    if (props.info) {
      setUsrconta(props.info.conta);
      setInfo(props.info.info);
      setRef(props.info.ref);
    } else {
      dispatch(get_info(props.user));
    }
    //eslint-disable-next-line
  }, [props.info]);

  return (
    <Grid container justify="center">
      <Grid item xl={10} lg={12}>
        <Grid container className={classes.rootTop}>
          <Grid item xs={12} sm={6} md={3} className={classes.moneyBox}>
            <MoneyBox info={info[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.moneyBox}>
            <MoneyBox info={info[1]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.moneyBox}>
            <MoneyBox info={info[2]} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.moneyBox}>
            <MoneyBox info={info[3]} />
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.rootBot}>
          <Grid item xs={12} sm={12} md={4} className={classes.Banks}>
            <BanksHome conta={usrconta} />
          </Grid>
          <Grid item xs={12} sm={12} md={8} className={classes.MiniExtract}>
            <MiniExtract refFB={_ref} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = store => ({
  info: store.info.information,
  user: store.user.user
});
export default connect(mapStateToProps)(HomeUser);
