import React from 'react';
import { Typography, Grid } from '@material-ui/core';

export default class TopPlayers extends React.Component {

    title_mcmmo = (<h3>McMMO合計レベルランキング</h3>);
    title_jobs = (<h3>Jobs総合ポイントランキング</h3>);

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            totalLevelPlayers: [],
            totalLevelValues: [],
            totalPointPlayers: [],
            totalPointValues: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("https://houkiserverstats.z31.web.core.windows.net/mcmmo.json"),
            fetch("https://houkiserverstats.z31.web.core.windows.net/jobs_point.json")
        ])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(
                (results) => {
                    const mcmmo = results[0];
                    const jobs = results[1];
                    this.setState({
                        isLoaded: true,
                        totalLevelPlayers: mcmmo.totalLevel.map((item) => item.playerName),
                        totalLevelValues: mcmmo.totalLevel.map((item) => item.level),
                        totalPointPlayers: jobs.slice(0, 10).map((item) => item.username),
                        totalPointValues: jobs.slice(0, 10).map((item) => Math.floor(item.totalpoints))
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {
            error, isLoaded,
            totalLevelPlayers, totalLevelValues,
            totalPointPlayers, totalPointValues
        } = this.state;
        if (error) {
            return <div>{this.title_mcmmo}{this.title_jobs}Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{this.title_mcmmo}Loading...{this.title_jobs}Loading...</div>;
        } else {
            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item>
                        {this.title_mcmmo}
                        <Typography variant="h5">
                            <span role="img" aria-label="1st">&#x1F947;</span>
                            &nbsp;
                            {totalLevelPlayers[0]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalLevelValues[0]})</span>
                        </Typography>
                        <Typography variant="h6">
                            <span role="img" aria-label="2nd">&#x1F948;</span>
                            &nbsp;
                            {totalLevelPlayers[1]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalLevelValues[1]})</span>
                        </Typography>
                        <Typography variant="h6">
                            <span role="img" aria-label="3rd">&#x1F949;</span>
                            &nbsp;
                            {totalLevelPlayers[2]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalLevelValues[2]})</span>
                        </Typography>
                        {totalLevelPlayers.map((playerName, index) => {
                            if (index < 3) return null;
                            return (
                                <Typography key={playerName}>
                                    {playerName}
                                    &nbsp;
                                    <small>({totalLevelValues[index]})</small>
                                </Typography>
                            )
                        })}
                    </Grid>
                    <Grid item>
                        {this.title_jobs}
                        <Typography variant="h5">
                            <span role="img" aria-label="1st">&#x1F947;</span>
                            &nbsp;
                            {totalPointPlayers[0]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalPointValues[0]})</span>
                        </Typography>
                        <Typography variant="h6">
                            <span role="img" aria-label="2nd">&#x1F948;</span>
                            &nbsp;
                            {totalPointPlayers[1]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalPointValues[1]})</span>
                        </Typography>
                        <Typography variant="h6">
                            <span role="img" aria-label="2nd">&#x1F949;</span>
                            &nbsp;
                            {totalPointPlayers[2]}
                            &nbsp;
                            <span style={{fontSize: '60%'}}>({totalPointValues[2]})</span>
                        </Typography>
                        {totalPointPlayers.map((playerName, index) => {
                            if (index < 3) return null;
                            return (
                                <Typography key={playerName}>
                                    {playerName}
                                    &nbsp;
                                    <small>({totalPointValues[index]})</small>
                                </Typography>
                            )
                        })}
                    </Grid>
                </Grid>
            );
        }
    }
}
