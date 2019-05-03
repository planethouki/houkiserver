import React from 'react';

export default class ServerQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {
                version: null,
                players: null
            },
        };
    }

    componentDidMount() {
        fetch("https://houkiserverquery.azurewebsites.net/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
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
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    <li>アドレス・・・houkiserver.com</li>
                    <li>バージョン・・・<span id="version">{data.version.name}</span></li>
                    <li>ユーザー・・・<span id="login-players">{data.players.online}</span>／<span id="max-players">{data.players.max}</span></li>
                </ul>
            );
        }
    }
}
