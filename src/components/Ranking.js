import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

const cardGrid = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 3
};

function indexToIcon(index) {
    switch (index) {
        case 0:
            return (<span>&#x1F947;</span>);
        case 1:
            return (<span>&#x1F948;</span>);
        case 2:
            return (<span>&#x1F949;</span>);
        default:
            return (<span>{index + 1}</span>);
    }
}

function mcMmoTypeToName(type) {
    switch (type.toLowerCase()) {
        case 'acrobatics':
            return "\u30a2\u30af\u30ed\u30d0\u30c6\u30a3\u30c3\u30af";
        case 'alchemy':
            return "\u932c\u91d1\u8853";
        case 'archery':
            return "\u5f13";
        case 'axes':
            return "\u65a7";
        case 'excavation':
            return "\u6398\u524a";
        case 'fishing':
            return "\u91e3\u308a";
        case 'herbalism':
            return "\u8fb2\u696d";
        case 'mining':
            return "\u63a1\u6398";
        case 'repair':
            return "\u4fee\u7406";
        case 'salvage':
            return "\u30b5\u30eb\u30d9\u30fc\u30b8";
        case 'smelting':
            return "\u7cbe\u932c";
        case 'swords':
            return "\u5263";
        case 'taming':
            return "\u8abf\u6559";
        case 'unarmed':
            return "\u7d20\u624b";
        case 'woodcutting':
            return "\u6728\u3053\u308a";
        case 'totallevel':
            return "合計レベル";
        default:
            return "Unknown";
    }
}

export default class Ranking extends React.Component {

    title_mcmmo = 'McMMOレベルランキング';
    title_jobs_point = 'Jobsポイントランキング';
    title_jobs_rank = 'Jobsレベルランキング';

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            mcmmo: {},
            jobs_rank: {},
            jobs_point: {}
        };
        this.classes = props.classes;
    }

    componentDidMount() {
        Promise.all([
            fetch("https://houkiserverstats.z31.web.core.windows.net/mcmmo.json"),
            fetch("https://houkiserverstats.z31.web.core.windows.net/jobs_point.json"),
            fetch("https://houkiserverstats.z31.web.core.windows.net/jobs_rank.json")
        ])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(
                (results) => {
                    const mcmmo = results[0];
                    const jobs_point = results[1];
                    const jobs_rank = results[2];
                    this.setState({
                        isLoaded: true,
                        mcmmo,
                        jobs_point,
                        jobs_rank,
                    });
                },
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
            mcmmo, jobs_rank, jobs_point
        } = this.state;
        if (error) {
            return <div>{this.title_mcmmo}{this.title_jobs}Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{this.title_mcmmo}Loading...{this.title_jobs}Loading...</div>;
        } else {
            return (
                <div>
                    <div style={{padding: '20px'}}>
                        <Typography component="h3" variant="h5" style={{marginTop: 10, marginBottom: 10}}>
                            {this.title_mcmmo}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            spacing={5}
                        >
                            {
                                Object.keys(mcmmo).map((key) => {
                                    const keyRank = mcmmo[key].slice(0, 10).map((item, index) => {
                                        return (
                                            <Box display="flex" justifyContent="space-between" key={item.playerName}>
                                                <div>
                                                    <span style={{width: '2rem', display: 'inline-block', textAlign: 'center'}}>
                                                        {indexToIcon(index)}
                                                    </span>
                                                    <span>
                                                        {item.playerName}
                                                    </span>
                                                </div>
                                                <span style={{marginLeft: '5px', fontSize: '80%'}}>
                                                    {item.level}
                                                </span>
                                            </Box>
                                        )
                                    });
                                    return (
                                        <Grid item key={key} {...cardGrid}>
                                            <Card>
                                                <CardContent>
                                                    <Typography component="h4" variant="h6">
                                                        {mcMmoTypeToName(key)}
                                                    </Typography>
                                                    {keyRank}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                    <div style={{padding: '20px'}}>
                        <Typography component="h3" variant="h5" style={{marginTop: 10, marginBottom: 10}}>
                            {this.title_jobs_rank}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            spacing={5}
                        >
                            {
                                Object.keys(jobs_rank).map((key) => {
                                    const keyRank = jobs_rank[key].map((item, index) => {
                                        return (
                                            <Box display="flex" justifyContent="space-between" key={item.username}>
                                                <div>
                                                    <span style={{width: '2rem', display: 'inline-block', textAlign: 'center'}}>
                                                        {indexToIcon(index)}
                                                    </span>
                                                    <span>
                                                        {item.username}
                                                    </span>
                                                </div>
                                                <span style={{marginLeft: '5px', fontSize: '80%'}}>
                                                    {item.level}
                                                </span>
                                            </Box>
                                        )
                                    }).slice(0, 10);
                                    return (
                                        <Grid item key={key} {...cardGrid}>
                                            <Card>
                                                <CardContent>
                                                    <Typography component="h5">{key}</Typography>
                                                    {keyRank}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                    <div>
                        <div style={{padding: 20}}>
                            <Typography component="h3" variant="h5" style={{marginTop: 10, marginBottom: 10}}>
                                {this.title_jobs_point}
                            </Typography>
                            <Grid {...cardGrid}>
                                <Card>
                                    <CardContent>
                                        {
                                            jobs_point.slice(0, 20).map((item, index) => {
                                                return (
                                                    <Box display="flex" justifyContent="space-between" key={item.username}>
                                                        <div>
                                                    <span style={{width: '2rem', display: 'inline-block', textAlign: 'center'}}>
                                                        {indexToIcon(index)}
                                                    </span>
                                                            <span>
                                                        {item.username}
                                                    </span>
                                                        </div>
                                                        <span style={{marginLeft: '5px', fontSize: '80%'}}>
                                                            {Math.floor(item.totalpoints)}
                                                        </span>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
