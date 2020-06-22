import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },    
}));

export default function Profile() {
    const classes = useStyles();

    return (
        <div>

            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Minha carteira
                </Typography>
                
            </div>
        </div>

    );
}