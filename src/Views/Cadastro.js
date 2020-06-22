import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Image from "../assets/bg.jpg";
import { withRouter } from "react-router-dom";
<<<<<<< HEAD

import { FA, FFS } from "../Firebase";
=======
import kazu from "../assets/kazu.png"
import { FA, FFS } from "../Firebase";
import theme_def from "../Config/_theme";
>>>>>>> f72704338c2c818ec78aec445fc13c045609e7cd

const useStyles = makeStyles(theme => ({
  root: {
    //   backgroundColor: theme.palette.common.white,
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: "10px 20px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme_def.palette.button.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme_def.palette.button.main,
      opacity: 0.8
    }
  },
  azul: {
    backgroundColor: theme_def.palette.backgroundMain.main,
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    opacity: 0.8
  }
}));

function Cadastro(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleCadastro = async () => {
    try {
      setLoading(true);
      let userCredentials = await FA.createUserWithEmailAndPassword(
        email,
        password
      );
      await FFS.collection("users")
        .doc(userCredentials.user.uid)
        .set({
          email: email,
          first: firstName,
          last: lastName,
          id: userCredentials.user.uid
        });
      let con = await FFS.collection("user_conta")
        .doc(userCredentials.user.uid)
        .collection("contas")
        .doc();
      let cat = await FFS.collection("user_categoria")
        .doc(userCredentials.user.uid)
        .collection("categorias")
        .doc();
      await cat.set({
        id: cat.id,
        value: "Padrão"
      });
      await con.set({
        nome: "Carteira",
        sigla: "Ca",
        balance: "0",
        id: con.id
      });
      setLoading(false);
      return (
        userCredentials.user.updateProfile({
<<<<<<< HEAD
          displayName: firstName,
        }) && alert("acho que deu")
=======
          displayName: firstName
        }) && props.history.push("/login")
>>>>>>> f72704338c2c818ec78aec445fc13c045609e7cd
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <div className={classes.azul} />
      <CssBaseline />
<<<<<<< HEAD
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form onSubmit={e => { e.preventDefault(); }} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => { setFirstName(e.target.value) }}
                value={firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Primeiro nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={e => { setLastName(e.target.value) }}
                value={lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={e => { setEmail(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={e => { setPassword(e.target.value) }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCadastro}
=======
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        style={{ zIndex: 1 }}
        elevation={6}
        square
      >
        <div style={{display: "flex", justifyContent: "center"}}>
          <img
            src={kazu}
            alt="KAZU"
            style={{
              position: "relative",
              width: "70%",
              height: "50%",
              padding: "5% 0"
            }}
          />
        </div>
        <div className={classes.paper}>
          <Grid container style={{ padding: "10px 20px", display: "block" }}>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontWeight: "bold", lineHeight: 1 }}
            >
              Faça seu cadastro
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              style={{ paddingTop: 5, fontSize: "1rem", lineHeight: 1 }}
            >
              e acompanhe seus gastos!
            </Typography>
          </Grid>
          <div
            style={{
              border: `1px solid ${theme_def.palette.button.main} `,
              width: "60%",
              margin: 10
            }}
          />
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
            className={classes.form}
            noValidate
>>>>>>> f72704338c2c818ec78aec445fc13c045609e7cd
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={e => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Primeiro nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={e => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  floatingLabelFixed={true}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  floatingLabelFixed={true}
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
<<<<<<< HEAD
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCadastro}
            >
              {loading ? (
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              ) : (
                <> Cadastrar</>
              )}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Voltar
                </Link>
              </Grid>
=======
>>>>>>> f72704338c2c818ec78aec445fc13c045609e7cd
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCadastro}
            >
              {loading ? (
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              ) : (
                <> Cadastrar</>
              )}
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Voltar
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Grid>
  );
}

export default withRouter(Cadastro);
