import React from 'react';
import { Typography } from '@material-ui/core';

export default class TopPlayers extends React.Component {

    title = (<h3>McMMOレベルランキング</h3>);

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            totalLevelPlayers: [],
            totalLevelValues: []
        };
    }

    componentDidMount() {
        fetch("https://houkiserverstats.z31.web.core.windows.net/mcmmo.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        totalLevelPlayers: result.totalLevel.map((item) => item.playerName),
                        totalLevelValues: result.totalLevel.map((item) => item.level)
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
        const { error, isLoaded, totalLevelPlayers, totalLevelValues } = this.state;
        if (error) {
            return <div>{this.title}Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{this.title}Loading...</div>;
        } else {
            return (
                <div>
                    {this.title}
                    <Typography variant={'h5'} variantMapping={'span'}>
                        &#x1F947;
                        &nbsp;
                        {totalLevelPlayers[0]}
                        &nbsp;
                        <span style={{fontSize: '60%'}}>({totalLevelValues[0]})</span>
                    </Typography>
                    <Typography variant={'h6'}>
                        &#x1F948;
                        &nbsp;
                        {totalLevelPlayers[1]}
                        &nbsp;
                        <span style={{fontSize: '60%'}}>({totalLevelValues[1]})</span>
                    </Typography>
                    <Typography variant={'h6'}>
                        &#x1F949;
                        &nbsp;
                        {totalLevelPlayers[2]}
                        &nbsp;
                        <span style={{fontSize: '60%'}}>({totalLevelValues[2]})</span>
                    </Typography>
                    {totalLevelPlayers.map((playerName, index) => {
                        if (index < 3) return;
                        return (
                            <Typography key={playerName}>
                                {playerName}
                                &nbsp;
                                <small>({totalLevelValues[index]})</small>
                            </Typography>
                        )
                    })}
                </div>
            );
        }
    }
}
