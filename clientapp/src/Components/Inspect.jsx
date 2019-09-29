import React, { Component } from "react";
import Request from "./Request";
import {Spinner, Container} from 'reactstrap';

export default class Inspect extends Component {
    constructor(props) {
        super(props)


        this.state = {
            connected: false,
            requests: []
        }

        this.ws = undefined;
    }

    wsPrefix = () => {
        return window.document.location.protocol === "https:" ? "wss" : "ws"
    }

    connectWS = () => {
        const prefix = this.wsPrefix();
        const base = window.location.host;
        let uri = `${prefix}://${base}/bucket/ws?id=${this.props.match.params.id}`
        if(window.location.host === "localhost:3000")
        {
            console.log("LOCAL DEV");
            uri = "ws://localhost:1323/bucket/ws?id=" + this.props.match.params.id
        }
        //const uri = "ws://localhost:1323/api/ws?id=" + this.props.match.params.id
        this.ws = new WebSocket(uri)

        this.ws.onopen = function () {
            console.log('Connected')
            //this.setState({ connected: true })
        }
        this.ws.onclose = function () {
            console.log("closed");
            //this.setState({ connected: false })
        }

        this.ws.onmessage = (evt) => { this.addMsg(evt) };


    }

    addMsg = (evt) => {
        
        if (evt.data != null) {
            //console.log(evt.data);
            
            let dataObj = JSON.parse(evt.data);
            
            if(this.state.requests === null){
                this.setState({ requests: [dataObj] })
            } else {
                this.setState((state) => {
                    const requests = state.requests.concat(dataObj);
                    return {requests};
                })
            }
            

        }
    }


    componentDidMount() {
        this.connectWS();
        this.getRequests();
    }

    componentWillUnmount() {
        this.ws.close();
    }

    getRequests = async () => {
        let resp = await fetch(`/api/bucket/${this.props.match.params.id}`)
        let data = await resp.json();

        this.setState({ requests: data });
        //console.log(data);
    }


    render() {
        const id = this.props.match.params.id;
        const requests = this.state.requests;
        let showThis = [];

        if (requests !== null && requests.length !== 0) {
            
            showThis = requests.map((item, index) => {
                return (<Request key={index} data={item} />)
            })
        } else {
            showThis = <div><Spinner color="primary"/> Waiting for requests.</div>
        }
        const url = window.location.protocol+"//"+window.location.host+"/bucket/"+id
        return (
            <Container>
                
                Url= {url} <br />
                {showThis}
            </Container>
        )
    }
}