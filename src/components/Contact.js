import React from 'react';
import { Container, Typography } from '@material-ui/core';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
        this.myRef = React.createRef();
    }

    render() {
        const onLoad = () => {
            const mojoWidgetCss = "#content_for_layout, body {background-color: #f8f8f8;}#content_for_layout a { color: #428bca;}.section-head { background-color: #2a88ad; color: #fff;}.padding-for-content { font-style: italic;}label { color: #2a88ad;}.form-control { background-color: azure;}.form-footer { background-color: #f8f8f8;}.btn-success { background-color: #2a88ad; border: 1px solid #257c9e; color: #fff;}.glyphicon-exclamation-sign {  color: #ff7777;}";
            const node = this.myRef.current;
            node.contentWindow.postMessage({'css':mojoWidgetCss}, '*')
        };
        return (
            <Container>
                <Typography variant="h6" color="textSecondary" style={{margin: '1rem 0'}}>
                    お問い合わせ
                </Typography>
                <div>
                    <iframe
                        title="contact"
                        src='https://houkiserver.mojohelpdesk.com/widgets/create_request#/ticket-form/51178'
                        ref={this.myRef}
                        style={{width:"100%", height: "600px", overflow: "hidden", border: 0}}
                        onLoad={onLoad}></iframe>
                </div>
            </Container>
        )
    }
}
