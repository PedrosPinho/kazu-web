import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CardActions, Divider, Button, Card } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "auto",
    height: "100%",
    [theme.breakpoints.up("lg")]: {
      height: "auto"
    }
    // color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  title: {
    fontWeight: 54
  },
  menu: {
    display: "flex",
    justifyContent: "space-between"
  },
  pos: {
    marginBottom: 12
  },
  actions: {
    justifyContent: "flex-start"
  }
}));

const MiniExtract = props => {
  const classes = useStyles();

  const [info, setInfo] = useState({});

  useEffect(() => {
    setInfo(props.refFB);
  }, [props.refFB]);

  const options = {
    selectableRows: "none",
    responsive: "scrollFullHeight"
  };

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none"
          },
          responsiveScrollFullHeight: {
            height: 200,
            overflow: "auto",
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
              width: "96vw"
            }
          }
        },
        MUIDataTableHeadCell: {
          root: {
            padding: "0px 8px 0px"
          }
        },
        MUIDataTableCell: {
          root: {
            padding: "0px 16px 0px 0px"
          }
        },
        MUIDataTableBodyRow: {
          root: {
            padding: "4px"
          }
        },
        MUIDataTableBodyCell: {
          root: {
            // fontSize: "2vmin",
            padding: "0 8px 0",
            textAlign: "left"
          }
        },
        MuiIconButton: {
          root: {
            padding: 0,
            margin: "0px 10px",
            color: "white",
            "&:hover": {
              color: "white",
              opacity: 0.7
            }
          }
        },
        MuiTypography: {
          h6: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold"
          }
        },
        MuiToolbar: {
          root: {
            height: 53,
            backgroundColor: theme_def.palette.secondary.main,
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
              height: 70
            }
          },
          regular: {
            minHeight: "0px !important"
          }
        },
        MuiTablePagination: {
          toolbar: {
            backgroundColor: "white !important"
          }
        }
      }
    });

  return (
    <Card className={classes.root}>
      {info ? (
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Resumo das movimentações do mês"}
            data={info.data}
            columns={info.columns}
            options={options}
            responsive="scrollFullHeight"
          />
        </MuiThemeProvider>
      ) : null}
      <Divider />
      <CardActions className={classes.actions}>
        <Button href="/extrato" color="primary" size="small" variant="text">
          Ver tudo <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default MiniExtract;
