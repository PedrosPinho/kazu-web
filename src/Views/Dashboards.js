import React, { useState } from "react";
import { get } from "idb-keyval";
import { FFS } from "../Firebase";
import { Grid } from "@material-ui/core";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import palette from "google-palette";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";


import ChartHeader from "../Components/ChartHeader";

const useStyles = makeStyles(theme => ({
  grid: {
    border: "1px solid #c9c9c9",
    padding: "10px 10px"
  }
}));

const Charts = props => {
  const classes = useStyles();
  const [chart, setChart] = useState(null);
  const [data_final, setData_final] = useState("");
  const [data_inicial, setData_inicial] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setData_final(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
        .toISOString()
        .split("T")[0]
    );
    setData_inicial(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split("T")[0]
    );
  }, []);

  const getG = async () => {
    function year(date) {
      return (
        Math.ceil(new Date(date).getTime() / 86400000) -
        Math.floor(
          new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
        )
      );
    }
    const user = await get("user");
    let kpinfo = {};
    let movimentacoes = [];
    const ref = await FFS.collection("user_movimentacao")
      .doc(user.id)
      .collection("movimentacoes")
      .get();
    if (!ref.empty)
      ref.forEach(doc => {
        movimentacoes.push(doc.data());
      });

    for (let i = 0; i < movimentacoes.length; i++) {
      try {
        const obj = movimentacoes[i];
        let graphs = ["Categoria", "Conta", "Tipo"];
        // eslint-disable-next-line
        graphs.forEach(g => {
          if (kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]]) {
            if (
              kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
                obj[g.toLowerCase()]
              ]
            ) {
              kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
                obj[g.toLowerCase()]
              ].forEach((item, index) => {
                if (index === 0 || index < year(obj.data)) return;
                kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
                  obj[g.toLowerCase()]
                ][index] += parseFloat(obj.balance);
              });
            } else {
              kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
                obj[g.toLowerCase()]
              ] = Array(366)
                .fill(0, 0, year(obj.data))
                .fill(parseFloat(obj.balance), year(obj.data));
            }
          } else {
            kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]] = {};
            kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
              obj[g.toLowerCase()]
            ] = Array(366)
              .fill(0, 0, year(obj.data))
              .fill(parseFloat(obj.balance), year(obj.data));
          }
        });
      } catch (err) {
        console.log("Err");
      }
    }
    const docRef = await FFS.collection("user_kpi")
      .doc(user.id)
      .collection("kpis");
    Object.keys(kpinfo).forEach(async kpi => {
      await docRef.doc(kpi).set(kpinfo[kpi]);
    });
    console.log("Graficos gerados");
    setTrigger(!trigger);
  };

  React.useEffect(() => {
    async function getGraph() {
      setLoading(true);
      let graph = {
        bar: [
          {
            data: {
              labels: [],
              datasets: [
                {
                  label: "Quantidade: ",
                  backgroundColor: palette("tol-dv", 15).map(function(hex) {
                    return "#" + hex;
                  }),
                  data: []
                }
              ]
            },
            options: {
              legend: { display: false },
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Contas"
              },
              scales: {
                xAxes: [
                  {
                    maxBarThickness: 50
                  }
                ],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          }
        ],
        pie: [
          {
            data: {
              labels: [],
              datasets: [
                {
                  backgroundColor: palette("tol-dv", 15).map(function(hex) {
                    return "#" + hex;
                  }),
                  data: []
                }
              ]
            },
            options: {
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Gasto por categorias"
              },
              legend: {
                display: false
              }
            }
          },
          {
            data: {
              labels: [],
              datasets: [
                {
                  backgroundColor: palette("tol-dv", 15).map(function(hex) {
                    return "#" + hex;
                  }),
                  data: []
                }
              ]
            },
            options: {
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Gastos totais"
              },
              legend: {
                display: false
              }
            }
          }
        ],
        line: [
          {
            data: {
              labels: [],
              backgroundColor: palette("tol-dv", 15).map(function(hex) {
                return "#" + hex;
              }),
              datasets: []
            },
            options: {
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Gasto por dia"
              }
            }
          }
        ]
      };

      const user = await get("user");
      const ref = await FFS.collection("user_kpi")
        .doc(user.id)
        .collection("kpis")
        .get();

      let kpinfo = {};

      let count_conta = {};
      let count_categoria = {};
      let count_tipo = {};

      const getNumber = info => {
        const idx_ini =
          Math.ceil(new Date(data_inicial).getTime() / 86400000) -
          Math.floor(
            new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
          );
        const idx_final =
          Math.ceil(new Date(data_final).getTime() / 86400000) -
          Math.floor(
            new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
          );
        return info[idx_final] - info[idx_ini - 1 === -1 ? 0 : idx_ini - 1];
      };

      const idxToDate = idx => {
        return new Date(
          Math.ceil(
            idx +
              Math.floor(
                new Date().setFullYear(new Date().getFullYear(), 0, 1) /
                  86400000
              )
          ) * 86400000
        )
          .toISOString()
          .split("T")[0];
      };

      if (!ref.empty) {
        ref.forEach(doc => {
          kpinfo = { ...kpinfo, [doc.id]: doc.data() };
        });
        Object.keys(kpinfo).forEach(kpi => {
          if (
            kpi.split("_")[0] === "conta" &&
            (kpi.split("_")[1] === data_inicial.split("-")[0] ||
              kpi.split("_")[1] === data_final.split("-")[0])
          ) {
            Object.keys(kpinfo[kpi]).forEach(k => {
              count_conta = { ...count_conta, [k]: getNumber(kpinfo[kpi][k]) };
            });
          } else if (
            kpi.split("_")[0] === "categoria" &&
            (kpi.split("_")[1] === data_inicial.split("-")[0] ||
              kpi.split("_")[1] === data_final.split("-")[0])
          ) {
            Object.keys(kpinfo[kpi]).forEach(k => {
              count_categoria = {
                ...count_categoria,
                [k]: getNumber(kpinfo[kpi][k])
              };
            });
          } else if (
            kpi.split("_")[0] === "tipo" &&
            (kpi.split("_")[1] === data_inicial.split("-")[0] ||
              kpi.split("_")[1] === data_final.split("-")[0])
          ) {
            Object.keys(kpinfo[kpi]).forEach(k => {
              count_tipo = {
                ...count_tipo,
                [k]: getNumber(kpinfo[kpi][k])
              };
            });
          }
          if (
            kpi.split("_")[0] === "tipo" &&
            (kpi.split("_")[1] === data_inicial.split("-")[0] ||
              kpi.split("_")[1] === data_final.split("-")[0])
          ) {
            const idx_ini =
              Math.ceil(new Date(data_inicial).getTime() / 86400000) -
              Math.floor(
                new Date().setFullYear(new Date().getFullYear(), 0, 1) /
                  86400000
              );
            const idx_final =
              Math.ceil(new Date(data_final).getTime() / 86400000) -
              Math.floor(
                new Date().setFullYear(new Date().getFullYear(), 0, 1) /
                  86400000
              );

            for (let i = idx_ini; i <= idx_final; i++) {
              graph.line[0].data.labels.push(idxToDate(i));
            }
            let color = palette("tol-dv", 10).map(function(hex) {
              return "#" + hex;
            });

            let temp = [];
            kpinfo[kpi]["receita"].forEach((info, i) => {
              if (i >= idx_ini && i <= idx_final) {
                temp.push(
                  kpinfo[kpi]["receita"][i] -
                    kpinfo[kpi]["receita"][i - 1] +
                    kpinfo[kpi]["despesa"][i] -
                    kpinfo[kpi]["despesa"][i - 1]
                );
              }
            });

            let dataset = {};
            dataset["Balanco"] = {
              label: "Balanço",
              borderColor: color[0],
              fill: false,
              data: temp
            };
            graph.line[0].data.datasets.push(dataset["Balanco"]);
          }
        });

        Object.keys(count_conta).forEach(a => {
          graph.bar[0].data.labels.push(a);
          graph.bar[0].data.datasets[0].data.push(count_conta[a]);
        });
        Object.keys(count_categoria).forEach(a => {
          graph.pie[0].data.labels.push(a);
          graph.pie[0].data.datasets[0].data.push(count_categoria[a]);
        });
        Object.keys(count_tipo).forEach(a => {
          graph.pie[1].data.labels.push(a);
          graph.pie[1].data.datasets[0].data.push(count_tipo[a]);
        });
      }
      setLoading(false);
      setChart(graph);
    }

    getGraph();
    // eslint-disable-next-line
  }, [data_inicial, data_final, trigger]);

  return (
    <div style={{ backgroundColor: "#d6d6d6" }}>
      <ChartHeader
        data_inicial={data_inicial}
        data_final={data_final}
        setData_final={newData => {
          setData_final(newData);
        }}
        setData_inicial={newData => {
          setData_inicial(newData);
        }}
        get_proc_data={getG}
      />
      {loading ? (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container>

            {chart != null
              ? chart.bar.map((chart_bar, i) => {
                  return (
                    <Grid item sm={6} xs={12} className={classes.grid}>
                      <Bar
                        key={i + "a"}
                        data={chart_bar.data}
                        options={chart_bar.options}
                        height={250}
                        width={250}
                      />
                    </Grid>
                  );
                })
              : null}
            {chart != null
              ? chart.line.map((chart_line, i) => {
                  return (
                    <Grid item sm={6} xs={12} className={classes.grid}>
                      <Line
                        key={i + "aaa"}
                        data={chart_line.data}
                        options={chart_line.options}
                        height={250}
                        width={250}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
          <Grid container>
            {chart != null
              ? chart.pie.map((chart_pie, i) => {
                  return (
                    <Grid item sm={6} xs={12} className={classes.grid}>
                      <Doughnut
                        key={i + "aa"}
                        data={chart_pie.data}
                        options={chart_pie.options}
                        height={250}
                        width={250}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Charts;
