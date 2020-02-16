import React from 'react';
import { BrowserRouter, Route, Link as RouterLink } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Ranking from './components/Ranking';
import Contact from './components/Contact';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import {
    AppBar,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


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
    drawer: {
        width: 300
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
    const [state, setState] = React.useState({
        drawer: false
    });
    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, drawer: open });
    };
    return (
        <MuiThemeProvider theme={theme}>
            <React.Fragment>
                <BrowserRouter basename="/">
                    <CssBaseline />
                    <Drawer open={state.drawer} onClose={toggleDrawer(false)}>
                        <div
                            className={classes.drawer}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                <ListItem button component={LinkTo} to="/">
                                    ほうき鯖
                                </ListItem>
                                <ListItem button component={LinkTo} to="/ranking">
                                    ランキング
                                </ListItem>
                                <ListItem button component={LinkTo} to="/contact">
                                    お問い合わせ
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar className={classes.toolBar}>
                            <div>
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                    <MenuIcon />
                                </IconButton>
                                <Button component={LinkTo} to="/">
                                    <Typography variant="h6" color="inherit" noWrap>
                                        ほうき鯖
                                    </Typography>
                                </Button>
                            </div>
                            <div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Route exact path='/' render={() => (<Home classes={classes} />)} />
                    <Route exact path='/ranking' render={() => (<Ranking classes={classes} />)} />
                    <Route exact path='/contact' render={() => (<Contact classes={classes} />)} />
                </BrowserRouter>
            </React.Fragment>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
