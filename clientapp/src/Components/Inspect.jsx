import React, { Component } from "react";
import Request from "./Request";
import {Spinner, Container} from 'reactstrap';
import BucketInfo from "./BucketInfo";

export default class Inspect extends Component {
    ws = undefined;
    constructor(props) {
        super(props)


        this.state = {
            connected: false,
            requests: []

        }

        
    }

    wsPrefix = () => {
        return window.document.location.protocol === "https:" ? "wss" : "ws"
    }

    closeWS = () => {
        //this.setState({ connected: false })
        this.ws.close();
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
        
            this.ws = new WebSocket(uri)
    
        //const uri = "ws://localhost:1323/api/ws?id=" + this.props.match.params.id
        this.ws.onerror = () => {
            this.setState({ connected: false })
        }

        this.ws.onopen = () => {
            console.log('Connected')
            this.setState({ connected: true })
        }
        this.ws.onclose = () => {
            console.log("closed");
            if(this.props.history.action !== "PUSH") {
                this.setState({ connected: false })
            }
            
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
        if(this.state.connected !== true) {
            this.connectWS();
            this.getRequests();
        }
        
        
    }

    componentWillUnmount() {
        this.closeWS();
        console.log(this.props)
    }

    

    getRequests = async () => {
        let resp = await fetch(`/api/bucket/${this.props.match.params.id}`)
        if(resp.ok) {
            let data = await resp.json();
            this.setState({ requests: data });
        }
        
        //console.log(data);
    }


    render() {
        if(this.state.connected === false) {
            return (<div>Not Connected</div>)
        }
        const id = this.props.match.params.id;
        const requests = this.state.requests;
        let showThis = [];

        if (requests !== null && requests.length !== 0) {
            
            showThis = requests.map((item, index) => {
                return (<Request key={index} data={item} />)
            })
        } else {
            showThis = <div className="text-center"><Spinner color="primary"/> Waiting for requests.</div>
        }
        const url = window.location.protocol+"//"+window.location.host+"/bucket/"+id
        return (
            <Container>
                <BucketInfo url={url} id={id} />
                
                {showThis}
            </Container>
        )
    }
}