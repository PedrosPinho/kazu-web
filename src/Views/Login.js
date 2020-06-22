import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "../assets/bg.jpg";
import { FA, FFS } from "../Firebase";
import theme_def from "../Config/_theme";
import { login } from "../Store/Action/user";
import { get_info } from "../Store/Action/info";
import { connect, useDispatch } from "react-redux";
import kazu from "../assets/kazu.png"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  image: {
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
    backgroundColor: "Green"
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

const Login = props => {
  const classes = useStyles();

  let dispatch = useDispatch();
  let [userPsswd, setUserPsswd] = React.useState();
  let [userMail, setUserMail] = React.useState();
  let [loading, setLoading] = React.useState(false);
  let [error, setError] = React.useState(false);

  function handleChange() {
    try {
      setLoading(true);
      FA.signInWithEmailAndPassword(userMail, userPsswd);

      FA.onAuthStateChanged(async user => {
        if (user) {
          let usr = await FFS.collection("users")
            .doc(user.uid)
            .get();
          usr = await usr.data();
          await dispatch(login(usr));
          await dispatch(get_info(usr));
          props.history.push("/home");
        } else {
          props.history.push("/login");
        }
      });
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Grid
      container
      component="main"
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <div className={classes.azul} />
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
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
              Seja Bem-Vindo(a)!
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              style={{ paddingTop: 5, fontSize: "1rem", lineHeight: 1 }}
            >
              Faça o login e confira seus gastos!
            </Typography>
          </Grid>
          <div
            style={{
              border: `1px solid ${theme_def.palette.button.main} `,
              width: "60%",
              margin: 10
            }}
          />
          {/* Logo aqui em baixo
          <Typography component="h2" variant="h5">
            KAZU
          </Typography> */}
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
            className={classes.form}
            noValidate
          >
            {error ? (
              <Typography
                component="h1"
                variant="h5"
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "1rem",
                  lineHeight: 1
                }}
              >
                Ocorreu um erro no login, tente novamente!
              </Typography>
            ) : null}
            <TextField
              onChange={e => {
                setUserMail(e.target.value);
              }}
              value={userMail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={e => {
                setUserPsswd(e.target.value);
              }}
              value={userPsswd}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // color="primary"
              className={classes.submit}
              onClick={handleChange}
            >
              {loading ? (
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              ) : (
                <> Login</>
              )}
            </Button>
            <Grid container justify="flex-end">
              {/* <Grid item xs>
                <Link href="/esqueci_minha_senha" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/cadastro" variant="body2">
                  {"Ainda não é cadastrado? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(connect()(Login));
