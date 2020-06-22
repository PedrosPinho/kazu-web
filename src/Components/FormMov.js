import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { FFS } from "../Firebase";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "60vw",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
    outline: 0,
    boxShadow: theme.shadows[5],
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 30%)",
    [theme.breakpoints.down("sm")]: {
      width: "80vw"
    },
    [theme.breakpoints.down("xs")]: {
      width: "95vw",
      transform: "translate(-50%, 20%)"
    }
  },
  padClass: {
    padding: theme.spacing(2, 4, 3)
  },
  speedDial: {
    bottom: 15,
    right: 15,
    position: "fixed"
  },
  title: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    color: "white",
    textAlign: "center",
    padding: theme.spacing(2)
  },
  resize: {
    fontSize: "50px"
  },
  green: { backgroundColor: "green" },
  red: { backgroundColor: "#ff3333" },
  blue: { backgroundColor: "#1c5ca3" }
}));

export default function FormMov(props) {
  const classes = useStyles();

  const [catSelect, setCatSelect] = useState("");
  const [conSelect, setConSelect] = useState("");
  const [money, setMoney] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  function returnType() {
    if (props.open.type === "Nova Despesa") return classes.red;
    else if (props.open.type === "Nova Receita") return classes.green;
    else return classes.blue;
  }

  async function simpleMov() {
    const user = props.user;

    let con = JSON.parse(conSelect);
    let cat = JSON.parse(catSelect);

    let c = await FFS.collection("user_conta")
      .doc(user.id)
      .collection("contas")
      .doc(con.id);

    let ref = await FFS.collection("user_movimentacao")
      .doc(user.id)
      .collection("movimentacoes")
      .doc();

    await ref.set({
      id: ref.id,
      descricao: desc,
      balance:
        props.open.type === "Nova Despesa"
          ? -Math.abs(money)
          : props.open.type === "Nova Receita"
          ? Math.abs(money)
          : "",
      conta: con.nome,
      categoria: cat.nome,
      data: date,
      tipo:
        props.open.type === "Nova Despesa"
          ? "despesa"
          : props.open.type === "Nova Receita"
          ? "receita"
          : ""
    });

    return FFS.runTransaction(function(transaction) {
      // This code may get re-run multiple times if there are conflicts.
      return transaction.get(c).then(function(sfDoc) {
        if (!sfDoc.exists) {
          throw new Error("Document does not exist!");
        }
        var newBal = parseFloat(sfDoc.data().balance);
        if (props.open.type === "Nova Despesa") {
          newBal -= parseFloat(money);
        } else newBal += parseFloat(money);
        transaction.update(c, { balance: newBal });
      });
    })
      .then(function() {
        alert("Movimentação feita!");
        setCatSelect("");
        setConSelect("");
        setMoney("");
        setDesc("");
        props.getNewInfo();
        props.setOpen({ bool: false, type: "" });
      })
      .catch(function(error) {
        console.log("Transaction failed: ", error);
      });
  }

  return (
    <div className={classes.paper}>
      <Typography
        variant="h5"
        gutterBottom
        className={clsx(classes.title, returnType())}
      >
        {props.open.type}
      </Typography>
      <Grid className={classes.padClass} container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            value={money}
            onChange={e => {
              setMoney(e.target.value);
            }}
            fullWidth
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "50px", color: "grey" }}>R$</span>
                </InputAdornment>
              ),
              classes: {
                input: classes.resize
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel>Categoria</InputLabel>
          <Select
            style={{ width: "100%" }}
            value={catSelect}
            onChange={e => {
              setCatSelect(e.target.value);
            }}
            inputProps={{
              name: "Categoria",
              id: "cat-simple"
            }}
          >
            <MenuItem disabled value={null}>
              Selecione uma categoria
            </MenuItem>
            {props.categorias.map((cat, i) => (
              <MenuItem
                key={i}
                value={JSON.stringify({ id: cat.id, nome: cat.value })}
              >
                {cat.value}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Conta</InputLabel>
          <Select
            style={{ width: "100%" }}
            value={conSelect}
            onChange={e => {
              setConSelect(e.target.value);
            }}
            inputProps={{
              name: "Conta",
              id: "con-simple"
            }}
          >
            <MenuItem disabled value={null}>
              Selecione uma conta
            </MenuItem>
            {props.contas.map((con, i) => (
              <MenuItem
                key={i}
                value={JSON.stringify({ id: con.id, nome: con.nome })}
              >
                {con.nome}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={desc}
            onChange={e => {
              setDesc(e.target.value);
            }}
            id="description"
            name="description"
            label="Descrição"
            fullWidth
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
            style={{ width: "100%" }}
            id="date11"
            label="Data"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid container justify="flex-end">
          <Button
            style={{ color: "white" }}
            type="submit"
            variant="contained"
            className={returnType()}
            onClick={simpleMov}
          >
            Atualizar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
