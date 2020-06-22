import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, TextField } from "@material-ui/core";
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  btn: {
    // fontSize: "2vmin",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      margin: "5px 0px",
    }
  },
  btn_p: {
    backgroundColor: theme_def.palette.button.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme_def.palette.button.main,
      opacity: 0.8
    }
  },
  tf: {
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      padding: "0px 5px"
    }
  },
  justify: {
    justifyContent: "flex-end",
    [theme.breakpoints.down('xs')]: {
      justifyContent: "center"
    }
  }
}));

export default function ChartHeader(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Grid item xs={11}>
        <Grid container justify="center">
          <Grid item sm={2} xs={6}>
            <TextField
              value={props.data_inicial}
              onChange={e => {
                props.setData_inicial(e.target.value);
              }}
              id="dateIni"
              label="Data inicial"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              className={classes.tf}
            />
          </Grid>
          <Grid item sm={2} xs={6}>
            <TextField
              value={props.data_final}
              onChange={e => {
                props.setData_final(e.target.value);
              }}
              id="dateFin"
              label="Data final"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              className={classes.tf}
            />
          </Grid>

          <Grid item sm={8} xs={12}
          >
            <Grid container className={classes.justify}>
              <Button
                className={clsx(classes.btn, classes.btn_p)}
                onClick={() => {
                  props.get_proc_data();
                }}
                // size="small"
              >
                Atualizar Informações
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
