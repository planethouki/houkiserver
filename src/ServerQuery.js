import React from 'react';

export default class ServerQuery extends React.Component {

    title = (<h3>基本情報</h3>)

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
            return <div>{this.title}Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{this.title}Loading...</div>;
        } else {
            return (
                <div>
                    {this.title}
                    <div>アドレス・・・houkiserver.com</div>
                    <div>バージョン・・・<span id="version">{data.version.name}</span></div>
                    <div>ユーザー・・・<span id="login-players">{data.players.online}</span>／<span id="max-players">{data.players.max}</span></div>
                </div>
            );
        }
    }
}
