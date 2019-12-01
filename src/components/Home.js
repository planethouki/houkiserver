import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import ServerQuery from './ServerQuery';
import TopPlayers from './TopPlayers';

const DYNMAP_URL = "https://map.houkiserver.com";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        const classes = this.classes;
        return (
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        ほうき鯖
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        A Minecraft Server.
                    </Typography>
                    <div style={{textAlign: 'center'}}>
                        <Button variant="contained" color="primary" href={DYNMAP_URL} target="_blank">
                            dynmap
                        </Button>
                    </div>
                    <div className={classes.heroDescription}>
                        <ServerQuery />
                    </div>
                    <div className={classes.heroRanking}>
                        <TopPlayers />
                    </div>
                    <div className={classes.heroBanners}>
                        <a href="https://minecraft.jp/servers/planethouki.ddns.net" target="_blank" rel="noopener noreferrer">
                            <img src="https://minecraft.jp/servers/planethouki.ddns.net/banner/1/560x95.png" alt=""  className={classes.w100} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
