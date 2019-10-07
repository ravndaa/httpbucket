import React, { Component, Fragment } from "react";
import { withStyles, Grid, Typography, CircularProgress } from "@material-ui/core";
import BucketRequest from "./BucketRequest";
import { grey } from "@material-ui/core/colors";

const styles = {
    root: {
        

    },
    cardheader: {
        backgroundColor: grey[200],
    },
    nocontent: {
        marginTop: '4rem',
    },
};

class BucketRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: [],
        }
        //this.ws = this.connectWS();
    }


    wsPrefix = () => {
        return window.document.location.protocol === "https:" ? "wss" : "ws"
    }

    connectWS = () => {

        const prefix = this.wsPrefix();
        const base = window.location.host;
        let uri = `${prefix}://${base}/b/ws?id=${this.props.match.params.id}`
        if (window.location.host === "localhost:3000") {
            console.log("LOCAL DEV");
            uri = "ws://localhost:1323/b/ws?id=" + this.props.match.params.id
        }

        const ws = new WebSocket(uri)

        //const uri = "ws://localhost:1323/api/ws?id=" + this.props.match.params.id
        ws.onerror = () => {
            this.setState({ connected: false })
        }

        ws.onopen = () => {
            //console.log('Connected')
            this.setState({ connected: true })
        }
        ws.onclose = () => {
            //console.log("closed");

            if (this.props.history.action !== "PUSH") {
                this.setState({ connected: false })
            }

        }

        ws.onmessage = (evt) => { this.addMsg(evt) };

        

    }

    closeWS = () => {
        if (this.ws.OPEN) {
            this.ws.close();
        };
    }

    addMsg = (evt) => {

        if (evt.data != null) {
            console.log(evt.data);

            let dataObj = JSON.parse(evt.data);

            if (this.state.requests === null) {
                this.setState({ requests: [dataObj] })
            } else {
                this.setState((state) => {
                    const requests = state.requests.concat(dataObj);
                    return { requests };
                })
            }


        }
    }
    

    getRequests = async () => {
        let resp = await fetch(`/b/list/${this.props.bucketid}`)
        if (resp.ok) {
            let data = await resp.json();
            this.setState({ requests: data.requests });
        }

    }

    componentDidMount() {
        if (this.state.connected !== true) {
            this.connectWS();
            this.getRequests();
        }
    }


    render() {
        const requests = this.state.requests;
        console.log(requests);
        let showThis;
        if ((requests !== null && requests !== undefined)) {

            showThis = this.state.requests.map((item, index) => {
                return (<BucketRequest key={index} data={item} />)
            })
        } else {
            return (
                <Fragment>
                    
                    <Grid container alignContent="center" alignItems="center" className={this.props.classes.nocontent}>
                        <CircularProgress color="secondary"/>
                        <Typography> Waiting for requests</Typography>
                    </Grid>
                    
                </Fragment>
            )
        }
        return (
            <Fragment>
                {showThis}
            </Fragment>
        )
    }
}

export default withStyles(styles)(BucketRequests);