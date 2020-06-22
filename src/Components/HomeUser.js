import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MoneyBox from "./MoneyBox";
import MiniExtract from "./MiniExtract";
import BanksHome from "./BanksHome";
import { FFS } from "../Firebase";
import { get } from "idb-keyval";

const useStyles = makeStyles(theme => ({
  rootTop: {
    display: "flex",
    minHeight: 171.3,
    height: "30%",
    backgroundColor: "#ececec",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },
  rootBot: {
    display: "flex",
    minHeight: 171.3,
    height: "70%",
    [theme.breakpoints.down("sm")]: {
      height: "auto"
    }
  },
  moneyBox: {
    padding: "20px 10px",
    [theme.breakpoints.down('xs')]: {
      padding: "5px 10px"
    }
  },
  MiniExtract: {
    padding: "20px 10px",
  },
  Banks: {
    padding: "20px 10px",
  }
}));

export default function HomeUser() {
  const classes = useStyles();
  let [_ref, setRef] = React.useState({ empty: true });
  let [usrconta, setUsrconta] = React.useState([]);
  let [info, setInfo] = React.useState([
    {
      title: "Saldo",
      qtd: ""
    },
    {
      title: "Receitas do mês",
      qtd: ""
    },
    {
      title: "Despesas do mês",
      qtd: ""
    },
    {
      title: "Balanço do mês",
      qtd: ""
    }
  ]);

  React.useEffect(() => {
    async function getD() {
      const user = await get("user");
      let fin = new Date(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          .toISOString()
          .split("T")[0]
      );
      let ini = new Date(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split("T")[0]
      );

      ini.setDate(ini.getDate() - 1);
      fin.setDate(fin.getDate() + 1);

      let ref = await FFS.collection("user_movimentacao")
        .doc(user.id)
        .collection("movimentacoes")
        .where("data", ">", ini.toISOString().split("T")[0])
        .where("data", "<", fin.toISOString().split("T")[0])
        .get();

      let cont = await FFS.collection("user_conta")
        .doc(user.id)
        .collection("contas")
        .get();
      let rec = 0;
      let desp = 0;
      let sal = 0;
      let tempc = [];
      if (!cont.empty) {
        cont.docs.forEach(doc => {
          let a = doc.data();
          tempc.push(a);
          sal += parseFloat(a.balance);
        });
      }

      if (!ref.empty) {
        ref.docs.forEach(doc => {
          let data = doc.data();
          if (data.tipo === "receita") {
            rec += parseFloat(data.balance);
          } else if (data.tipo === "despesa") {
            desp += parseFloat(data.balance);
          }
        });
      }
      let inf = [
        {
          title: "Saldo em conta",
          qtd: ""
        },
        {
          title: "Receitas do mês",
          qtd: ""
        },
        {
          title: "Despesas do mês",
          qtd: ""
        },
        {
          title: "Balanço do mês",
          qtd: ""
        }
      ];
      inf[0].qtd = "R$ " + sal;
      inf[1].qtd = "R$ " + rec;
      inf[2].qtd = "R$ " + desp;
      inf[3].qtd = "R$ " + (rec + desp);
      setInfo(inf);
      setUsrconta(tempc);
    }
    getD();
  }, []);

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
            <MiniExtract />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
