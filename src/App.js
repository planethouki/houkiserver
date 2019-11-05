import React from 'react';
import { BrowserRouter, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Ranking from './components/Ranking';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { AppBar, Button, CssBaseline, Toolbar, Typography } from '@material-ui/core';


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
    toolBar: {
        justifyContent: 'space-between'
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
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

const LinkTo = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

function App(props) {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={theme}>
            <React.Fragment>
                <BrowserRouter>
                    <CssBaseline />
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar className={classes.toolBar}>
                            <Button component={LinkTo} to="/">
                                <Typography variant="h6" color="inherit" noWrap>
                                    ほうき鯖
                                </Typography>
                            </Button>
                            <div>
                                <Button color="inherit" component={LinkTo} to="/ranking">
                                    Ranking
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Route exact path='/' render={() => (<Home classes={classes} />)} />
                    <Route exact path='/ranking' render={() => (<Ranking classes={classes} />)} />
                </BrowserRouter>
            </React.Fragment>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
