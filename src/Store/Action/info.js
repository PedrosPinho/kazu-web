import { FFS } from "../../Firebase";

export const get_info = user => {
  return async dispatch => {
    try {
      let [ini, fin] = _getDates();

      let ref = await FFS.collection("user_movimentacao")
        .doc(user.id)
        .collection("movimentacoes")
        .where("data", ">", ini.toISOString().split("T")[0])
        .where("data", "<", fin.toISOString().split("T")[0])
        .orderBy("data", "desc")
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
          if (data.categoria !== "Transferencia")
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
      let _ref = await filterRef(ref);
      let info = { info: inf, conta: tempc, ref: _ref };
      // debugger;
      dispatch({ type: "GET_INFO", payload: info });
    } catch (error) {
      console.log(
        "There was a problem while getting the user information, check redux!"
      );
    }
  };
};

export const del_info = (redirect, target) => {
  return dispatch => {
    dispatch({ type: "DEL_INFO" });
  };
};

const _getDates = () => {
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
  return [ini, fin];
};

const filterRef = async ref => {
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
    return {
      columns: new_columns,
      data: new_data
    };
  }
};
