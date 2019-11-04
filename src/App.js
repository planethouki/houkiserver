import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: "#EEFCCE",
        },
        secondary: {
            main: "#C4B7CB",
        }
    },
    status: {
        danger: 'orange',
    },
});

const styles = {
    appBar: {
        position: 'relative',
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
    },
    heroButtons: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(4),
    },
    heroDescription: {
        marginTop: theme.spacing(4),
        textAlign: 'center'
    },
    heroRanking: {
        textAlign: 'center'
    },
    heroBanners: {
        marginTop: theme.spacing(4),
    },
    w100: {
        width: '100%',
    }
};

function App(props) {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            ほうき鯖
                        </Typography>
                    </Toolbar>
                </AppBar>
                <BrowserRouter>
                    <Route exact path='/' render={() => (<Home classes={classes} />)} />
                </BrowserRouter>
            </React.Fragment>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
