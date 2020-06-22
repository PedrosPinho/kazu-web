import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  TextField,
  ListItemText,
  Button,
  Fab
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { FFS } from "../Firebase";
import { get } from "idb-keyval";
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0,
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      height: "auto"
    }
  },
  content: {
    padding: 0,
    height: "260px",
    overflowY: "auto"
  },
  menu: {
    display: "flex",
    justifyContent: "space-between"
  },
  actions: {
    justifyContent: "flex-end"
  },
  header: {
    position: "sticky",
    top: 0,
    color: "white",
    backgroundColor: theme_def.palette.secondary.main,
    "& span": {
      fontSize: 16,
      fontWeight: "bold"
    }
  },
  listItem: {
    padding: "0px 10px",
    "&:hover": {
      backgroundColor: "#ededed"
    }
  }
}));

const BanksHome = props => {
  const classes = useStyles();

  const [, setAnchorMenu] = useState(null);
  const [addTxt, setAddTxt] = useState(false);
  const [newConta, setNewConta] = useState("");
  const [balance, setBalance] = useState("");
  const [banks, setBanks] = useState([]);
  const [, updateState] = React.useState();

  useEffect(() => {
    setBanks(props.conta);
  }, [props.conta]);

  function handleCloseMenu() {
    setAnchorMenu(null);
  }

  const forceUpdate = React.useCallback(() => updateState({}), []);

  async function addConta() {
    try {
      const user = await get("user");
      const ref = await FFS.collection("user_conta")
        .doc(user.id)
        .collection("contas")
        .doc();
      ref.set({
        sigla: newConta.substring(0, 2),
        nome: newConta,
        id: ref.id,
        balance
      });
      let temp = banks;
      temp.push({
        id: ref.id,
        nome: newConta,
        sigla: newConta.substring(0, 2),
        balance
      });
      setBanks(temp);
      setNewConta("");
      setBalance("");
      setAddTxt(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteC(info) {
    try {
      const user = await get("user");
      await FFS.collection("user_conta")
        .doc(user.id)
        .collection("contas")
        .doc(info.id)
        .delete();
      let temp = banks;
      temp.splice(
        banks.findIndex(c => {
          return c.id === info.id;
        }),
        1
      );
      setBanks(temp);
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Resumo das Contas" className={classes.header} />
      <Divider />
      <CardContent className={classes.content}>
        <List style={{ padding: 0 }}>
          {banks.map((b, index) => (
            <ListItem key={index} className={classes.listItem}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <ListItemText primary={b.nome} secondary={"R$ " + b.balance} />
                <div>
                  <Delete
                    onClick={() => {
                      deleteC(b);
                      handleCloseMenu();
                    }}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        {addTxt ? (
          <div style={{ display: "flex" }}>
            <TextField
              autoFocus
              value={newConta}
              placeholder="Nova conta"
              inputProps={{ maxLength: 16 }}
              onChange={e => {
                setNewConta(e.target.value);
              }}
            />
            <TextField
              value={balance}
              placeholder="Saldo"
              onChange={e => {
                setBalance(e.target.value);
              }}
            />
          </div>
        ) : null}
        {!addTxt ? (
          <Button
            onClick={() => {
              setAddTxt(!addTxt);
            }}
            color="primary"
            size="small"
            variant="text"
          >
            Adicionar Nova Conta
          </Button>
        ) : (
          <div style={{ display: "flex" }}>
            <Fab
              color="secondary"
              onClick={() => {
                setAddTxt(!addTxt);
              }}
              className={classes.margin}
              style={{
                color: "white",
                height: 30,
                minHeight: "auto",
                width: 30
              }}
              size="small"
            >
              <Close />
            </Fab>
            <Fab
              color="primary"
              onClick={() => {
                addConta();
                setAddTxt(!addTxt);
              }}
              className={classes.margin}
              style={{
                color: "white",
                height: 30,
                minHeight: "auto",
                width: 30
              }}
              size="small"
            >
              <Add />
            </Fab>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default BanksHome;
