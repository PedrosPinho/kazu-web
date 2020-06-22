import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { get } from 'idb-keyval';
import { FFS } from '../Firebase';


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        backgroundColor: theme.palette.common.white,
        borderRadius: theme.spacing(2),
        padding: theme.spacing(5),
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '66%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        width: "33%",
        margin: theme.spacing(3, 0, 2),
    },
    password: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Profile() {
    const classes = useStyles();

    const [first, setfirst] = React.useState("");
    const [last, setlast] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [data, setData] = React.useState("");
    const [id, setUsrId] = React.useState("");


    React.useEffect(() => {
        const getUser = async () => {
            const usr = await get("user");
            const ref = await FFS.collection("users").doc(usr.id).get();
            if (ref.exists) {
                const u = ref.data();
                debugger
                setEmail(u.email);
                setfirst(u.first);
                setlast(u.last);
                setSexo(u.sexo);
                setData(u.data);
                setUsrId(u.id)
            }
        }
        getUser();
    }, []);

    const handleChange = async () => {
        await FFS.collection("users").doc(id).update({email, first, last, data, sexo})
    }

    return (
        <div>

            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Perfil
                </Typography>
                <form onSubmit={e => { e.preventDefault(); }} className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={first}
                                onChange={e => { setfirst(e.target.value) }}
                                autoComplete="fname"
                                name="first"
                                variant="outlined"
                                required
                                fullWidth
                                id="first"
                                label="Primeiro nome"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={last}
                                onChange={e => { setlast(e.target.value) }}
                                variant="outlined"
                                required
                                fullWidth
                                id="last"
                                label="Sobrenome"
                                name="last"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Sexo</InputLabel>
                            <Select
                                value={sexo}
                                onChange={e => { setSexo(e.target.value) }}
                                style={{ width: '100%' }}
                                // value={values.age}
                                // onChange={handleChange}
                                inputProps={{
                                    name: 'Sexo',
                                    id: 'sex-simple',
                                }}
                            >
                                <MenuItem value={'masculino'}>Sith</MenuItem>
                                <MenuItem value={'feminino'}>Jedi</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={data}
                                onChange={e => { setData(e.target.value) }}
                                style={{ width: '100%' }}
                                id="date"
                                label="Data de nascimento"
                                type="date"
                                defaultValue="1990-01-01"
                                // className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.password}
                    >
                        Alterar senha
          </Button>
                    <Button
                        onClick={handleChange}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Atualizar
          </Button>
                </form>
            </div>
        </div>

    );
}