import React, { Component } from "react";
import { createStyles, withStyles, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableRow, TableHead, Button } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const styles = (theme) =>
    createStyles({
        root: {
            marginTop: '2rem',
        },
        cardheader: {
            backgroundColor: grey[200],

        },
        table: {
            minWidth: 650,
          },
          actionbuttons: {
              marginLeft: '1rem',
          },
    });




class AdminBucketClients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buckets: [],
        }
    }

    getToken = () => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            return null
        }
    }

    loadBuckets = async () => {
        // http://localhost:1323/api/listbuckets
        const resp = await fetch("/api/listbuckets", {
            headers: new Headers({
                'Authorization': `Bearer ${this.getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });
        if (resp.ok) {
            const data = await resp.json();
            this.setState({ buckets: data });
        }

    }

    loadBucketClients = async (id) => {
        
        const resp = await fetch(`/api/bucketClients/${id}`, {
            headers: new Headers({
                'Authorization': `Bearer ${this.getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
        });
        if (resp.ok) {
            const data = await resp.json();
            this.setState({ bucketMessages: data });
        }

    }

    componentDidMount() {
        this.loadBucketClients(this.props.bucketid)
    }
    render() {
        const rows = this.state.buckets;
        return (
            <div className={this.props.classes.root}>
                <Card elevation={20}>
                    <CardHeader className={this.props.classes.cardheader} title={"Clients for #"+this.props.bucketid} />
                    <CardContent>


                    </CardContent>

                </Card>
            </div>
        )
    }
}


export default withStyles(styles)(AdminBucketClients);
