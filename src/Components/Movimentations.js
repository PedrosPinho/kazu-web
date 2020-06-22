import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { ArrowUpward, ArrowDownward, SwapVert } from "@material-ui/icons";
import FormMov from "./FormMov";
import FormTransfer from "./FormTransfer";
import Reactotron from "reactotron-react-js";
import { FFS } from "../Firebase";
import { get } from "idb-keyval";
import theme_def from "../Config/_theme";
import { get_info } from "../Store/Action/info";
import { connect, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    width: 900,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
    outline: 0,
    boxShadow: theme.shadows[5],
    margin: "60px auto"
  },
  padClass: {
    padding: theme.spacing(2, 4, 3)
  },
  speedDial: {
    bottom: 15,
    right: 15,
    position: "fixed",
    
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
  green: { 
    backgroundColor: "green", 
    color: "white" ,
    "&:hover": {
      backgroundColor: "green",
      opacity: 0.7
    }
  },
  red: { 
    backgroundColor: "#ff3333", 
    color: "white" ,
    "&:hover": {
      backgroundColor: "#ff3333",
      opacity: 0.7
    }
  },
  blue: { 
    backgroundColor: "#1c5ca3", 
    color: "white",
    "&:hover": {
      backgroundColor: "#1c5ca3",
      opacity: 0.7
    }
  },
  teste: {
    backgroundColor: theme_def.palette.button.main,
    "&:hover": {
      backgroundColor: theme_def.palette.button.main,
      opacity: 0.7
    }
  }
}));

const Movimentations = props => {
  const classes = useStyles();
  let dispatch = useDispatch();

  const [open, setOpen] = useState({ bool: false, type: "" });
  const [openIc, setOpenIc] = useState(false);
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [_user, setUser] = useState();

  const [hidden] = useState(false);

  const getNewInfo = () => {
    dispatch(get_info(props.user));
  };

  const handleOpen = async val => {
    const user = await get("user");
    let ref = await FFS.collection("user_conta")
      .doc(user.id)
      .collection("contas")
      .get();
    Reactotron.log("CORNOOOOOOOOOOOOOOO MOVIMENTATION");

    let temp = [];
    ref.docs.forEach(doc => {
      temp.push(doc.data());
    });
    setContas(temp);
    ref = await FFS.collection("user_categoria")
      .doc(user.id)
      .collection("categorias")
      .get();
    Reactotron.log("CORNOOOOOOOOOOOOOOO MOVIMENTATION1");

    temp = [];
    ref.docs.forEach(doc => {
      temp.push(doc.data());
    });
    setCategorias(temp);
    setUser(user);
    setOpen({ bool: true, type: val });
  };

  const handleClose = () => {
    setOpen({ bool: false, type: "" });
  };

  function handleOpenIc() {
    if (!hidden) setOpenIc(true);
  }

  function handleCloseIc() {
    setOpenIc(false);
  }

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial"
        className={classes.speedDial}
        classes={{fab:classes.teste}}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onBlur={handleCloseIc}
        onClose={handleCloseIc}
        onFocus={handleOpenIc}
        onMouseEnter={handleOpenIc}
        onMouseLeave={handleCloseIc}
        open={openIc}
        onClick={handleOpenIc}
      >
        <SpeedDialAction
          icon={<ArrowDownward />}
          tooltipTitle={"Nova Despesa"}
          tooltipOpen
          onClick={() => handleOpen("Nova Despesa")}
          className={classes.red}
        />
        <SpeedDialAction
          icon={<ArrowUpward />}
          tooltipTitle={"Nova Receita"}
          tooltipOpen
          onClick={() => handleOpen("Nova Receita")}
          className={classes.green}
        />
        <SpeedDialAction
          icon={<SwapVert />}
          tooltipTitle={"Nova Transferencia"}
          tooltipOpen
          onClick={() => handleOpen("Nova Transferencia")}
          className={classes.blue}
        />
      </SpeedDial>

      <Modal open={open.bool} onClose={handleClose}>
        <>
          {open.type === "Nova Transferencia" ? (
            <FormTransfer
              open={open}
              user={_user}
              contas={contas}
              getNewInfo={getNewInfo}
              setOpen={e => {
                setOpen(e);
              }}
            />
          ) : (
            <FormMov
              open={open}
              user={_user}
              categorias={categorias}
              getNewInfo={getNewInfo}
              contas={contas}
              setOpen={e => {
                setOpen(e);
              }}
            />
          )}
        </>
      </Modal>
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user.user
});

export default connect(mapStateToProps)(Movimentations);
