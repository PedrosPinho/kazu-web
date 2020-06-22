import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Tab, Tabs, TextField, Tooltip, Paper, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import qlqr from "./../assets/dinheros2.png";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import { FFS } from "../Firebase";
import { get } from "idb-keyval";
import Reactotron from "reactotron-react-js";
import theme_def from "../Config/_theme";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "auto"
    // color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  list: {
    overflowX: "auto",
    maxHeight: "80vh",
    backgroundColor: "white",
    width: "30vw",
    margin: "auto",
    borderRadius: theme.spacing(1)
  },
  title: {
    fontWeight: 54
  },
  pos: {
    marginBottom: 12
  },
  actions: {
    justifyContent: "flex-end"
  },
  bigIndicator: {
    height: 5
  },
  miniBooksGrid: {
    [theme.breakpoints.up("md")]: {
      display: "grid",
      justifyItems: "center",
      padding: "1% 0",
      gridTemplateColumns: "20% 20% 20% 20% 20%"
    },
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      justifyItems: "center",
      padding: "2% 0",
      gridTemplateColumns: "33.3% 33.3% 33.3%"
    },
    [theme.breakpoints.down("xs")]: {
      display: "grid",
      justifyItems: "center",
      gridTemplateColumns: "100%"
    }
  },
  paper: {
    position: "relative",
    width: "180px",
    backgroundColor: "white",
    cursor: "pointer",
    [theme.breakpoints.up("xl")]: {
      width: 260
    },
    [theme.breakpoints.down("xs")]: {
      width: 260
    },
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  },
  imgSize: {
    height: "160px",
    width: "180px",
    transition: "width 2s",
    color: "black",
    "&:hover": {
      color: "grey"
    },
    [theme.breakpoints.up("xl")]: {
      width: 260,
      height: 240
    },
    [theme.breakpoints.down("xs")]: {
      width: 260,
      height: 240
    }
  },
  tfEdit: {
    marginTop: "0.5vmin",
    position: "relative",
    width: 180,
    [theme.breakpoints.up("xl")]: {
      width: 260
    },
    [theme.breakpoints.down("xs")]: {
      width: 260
    }
  }
}));

const MiniExtract = () => {
  const classes = useStyles();

  const [info, setInfo] = useState([]);

  const [value, setValue] = React.useState(0);

  const [form, setForm] = React.useState(0);

  const [category, setCategory] = React.useState([]);

  const [editCat, setEditCat] = React.useState("");

  const [editCatInd, setEditCatInd] = React.useState();

  const [newCat, setNewCat] = React.useState("");

  const [, updateState] = React.useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const options = {
    responsive: "scrollFullHeight"
  };

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            backgroundColor: "transparent"
          },
          responsiveScrollFullHeight: {
            overflow: "auto",
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
              width: "100vw"
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
            fontSize: "2vmin",
            padding: "0 8px 0",
            textAlign: "left"
          }
          // #f0fdf4
        },
        MuiIconButton: {
          root: {
            color: "white",
            "&:hover": {
              color: "white",
              opacity: 0.7
            }
          }
        },
        MuiToolbar: {
          root: {
            height: 53,
            backgroundColor: theme_def.palette.secondary.main,
            ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
              height: 80
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
        },
        MuiTypography: {
          h6: {
            color: "white",
            fontWeight: "bold"
          }
        },
        MuiTableRow: {
          root: {
            "&:nth-of-type(odd)": {
              backgroundColor: "##f0fdf4"
            }
          }
        }
      }
    });

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function deleteCat(info) {
    try {
      const user = await get("user");
      await FFS.collection("user_categoria")
        .doc(user.id)
        .collection("categorias")
        .doc(info.id)
        .delete();
      let temp = category;
      temp.splice(
        category.findIndex(c => {
          return c.id === info.id;
        }),
        1
      );
      setCategory(temp);
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEditCat(info) {
    try {
      const user = await get("user");
      await FFS.collection("user_categoria")
        .doc(user.id)
        .collection("categorias")
        .doc(info.id)
        .set({ id: info.id, value: editCat });
      let temp = category;
      temp.splice(
        category.findIndex(c => {
          return c.id === info.id;
        }),
        1,
        { id: info.id, value: editCat }
      );
      setCategory(temp);
      setEditCat("");
      setForm(0);
      forceUpdate();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleNewCat() {
    try {
      const user = await get("user");
      let ref = await FFS.collection("user_categoria")
        .doc(user.id)
        .collection("categorias")
        .doc();
      ref.set({ id: ref.id, value: newCat });
      let temp = category;
      temp.push({ id: ref.id, value: newCat });
      setCategory(temp);
      setNewCat("");
      setForm(0);
      // forceUpdate()
    } catch (err) {
      console.log(err);
    }
  }

  function handleChangeEdit(i) {
    setForm(2);
    setEditCatInd(i);
  }

  useEffect(() => {
    async function getCat() {
      const user = await get("user");
      let resp = await FFS.collection("user_categoria")
        .doc(user.id)
        .collection("categorias")
        .get();
      Reactotron.log("CORNOOOOOOOOOOOOOOO EXTRACT");

      if (!resp.empty) {
        let temp = [];
        resp.forEach(r => {
          temp.push(r.data());
        });
        setCategory(temp);
      }
      let ref = await FFS.collection("user_movimentacao")
        .doc(user.id)
        .collection("movimentacoes")
        .orderBy("data", "desc")
        .get();
      Reactotron.log("CORNOOOOOOOOOOOOOOO EXTRACT");

      if (!ref.empty) {
        const new_columns = Object.keys(ref.docs[0].data()).filter(k => {
          if (k !== "id") return k;
          return false;
        });
        const new_colmap = {};
        new_columns.forEach((v, k) => {
          new_columns[k] = v.toUpperCase();
          new_colmap[v.toUpperCase()] = k;
        });
        const new_data = ref.docs.map(doc => {
          const d = doc.data();
          let row = new Array(new_columns.length).fill(null);
          Object.keys(d).forEach(k => {
            let ki = k.toUpperCase();
            if (new_columns.includes(ki)) {
              if (ki === "BALANCE") row[new_colmap[ki]] = "R$ " + d[k];
              else row[new_colmap[ki]] = d[k];
            }
          });
          return row;
        });
        const ndata = {
          columns: new_columns,
          data: new_data
        };
        setInfo(ndata);
      }
    }

    getCat();
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        style={{ backgroundColor: "white" }}
        classes={{ indicator: classes.bigIndicator }}
      >
        <Tab label="Extrato" />
        <Tab label="Categorias" />
      </Tabs>

      {value === 0 ? (
        info ? (
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={12}>
              <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                  title={"Movimentações"}
                  data={info.data}
                  columns={info.columns}
                  options={options}
                />
              </MuiThemeProvider>
            </Grid>
          </Grid>
        ) : null
      ) : (
        <Grid container className={classes.miniBooksGrid}>
          <div className={classes.screenNotSmall}>
            <Paper
              className={classes.paper}
              square={true}
              onClick={() => {
                newCat === ""
                  ? form === 1
                    ? setForm(0)
                    : setForm(1)
                  : handleNewCat();
              }}
            >
              <Add className={classes.imgSize} />
            </Paper>
            {form === 1 ? (
              <Grid container justify="center" className={classes.tfEdit}>
                <TextField
                  autoFocus
                  value={newCat}
                  placeholder="Nova categoria"
                  onChange={e => {
                    setNewCat(e.target.value);
                  }}
                />
                <Add
                  className={classes.svg}
                  style={{ position: "absolute", right: 5, top: 5 }}
                  onClick={() => {
                    newCat === ""
                      ? form === 1
                        ? setForm(0)
                        : setForm(1)
                      : handleNewCat();
                  }}
                />
              </Grid>
            ) : (
              <Grid container justify="center" style={{ marginTop: "0.5vmin" }}>
                <Grid item>Adicionar Categoria</Grid>
              </Grid>
            )}
          </div>
          {category.length !== 0
            ? category.map((b, i) => (
                <div key={i} className={classes.container}>
                  <Grid container>
                    <Paper square={true}>
                      <img
                        alt="Imagem da Categoria"
                        className={classes.imgSize}
                        src={qlqr}
                      />
                    </Paper>
                  </Grid>
                  {form === 2 && editCatInd === i ? (
                    <Grid container justify="center" className={classes.tfEdit}>
                      <TextField
                        autoFocus
                        value={editCat}
                        inputProps={{ maxLength: 16 }}
                        placeholder="Editar"
                        onChange={e => {
                          setEditCat(e.target.value);
                        }}
                      />
                      <Edit
                        className={classes.svg}
                        style={{ position: "absolute", right: 5, top: 5 }}
                        onClick={() => {
                          editCat === ""
                            ? form === 2
                              ? setForm(0)
                              : handleChangeEdit(i)
                            : handleEditCat(b);
                        }}
                      />
                    </Grid>
                  ) : (
                    <Grid
                      container
                      justify="center"
                      style={{ marginTop: "0.5vmin" }}
                    >
                      <Grid item>{b.value}</Grid>
                      <Grid item>
                        <Tooltip title="Editar Nome">
                          <Edit
                            className={classes.svg}
                            onClick={() => {
                              editCat === ""
                                ? form === 2
                                  ? setForm(0)
                                  : handleChangeEdit(i)
                                : handleEditCat(b);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Deletar MiniBook">
                          <Delete
                            className={classes.svg}
                            onClick={() => {
                              deleteCat(b);
                            }}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  )}
                </div>
              ))
            : null}
        </Grid>
      )}
    </div>
  );
};

export default MiniExtract;
