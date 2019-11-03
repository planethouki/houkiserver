import React from 'react';
import './App.css';

import ServerQuery from './ServerQuery';
import TopPlayers from './TopPlayers';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const DYNMAP_URL = "https://houkiserver.com";

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
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
    },
    heroDescription: {
        marginTop: theme.spacing.unit * 4,
        textAlign: 'center'
    },
    heroRanking: {
        textAlign: 'center'
    },
    heroBanners: {
        marginTop: theme.spacing.unit * 4,
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
                <main>
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                ほうき鯖
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                A Minecraft Server.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={16} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" href={DYNMAP_URL} target="_blank">
                                            dynmap
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.heroDescription}>
                                <ServerQuery />
                            </div>
                            <div className={classes.heroRanking}>
                                <TopPlayers />
                            </div>
                            <div className={classes.heroBanners}>
                                <a href="https://minecraft.jp/servers/planethouki.ddns.net" target="_blank">
                                    <img src="https://minecraft.jp/servers/planethouki.ddns.net/banner/1/560x95.png" alt=""  className={classes.w100} />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
