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




class AdminBucketMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bucketMessages: [],
        }
    }

    getToken = () => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            return null
        }
    }

    loadBucketMessages = async (id) => {
        
        const resp = await fetch(`/api/bucketMessages/${id}`, {
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
        this.setState({bucketid: this.props.bucketid})
        this.loadBucketMessages(this.props.bucketid);
    }
    render() {
        const rows = this.state.bucketMessages;
        let list = [];
        if(rows !== undefined && rows !== null) {
            list = rows.map((item, index) => {
                return (<div key={index}>{item.method}</div>)
            })
        }

        return (
            <div className={this.props.classes.root}>
                <Card elevation={20}>
                    <CardHeader className={this.props.classes.cardheader} title={"Messages for #"+this.props.bucketid} />
                    <CardContent>

                        {list}

                    </CardContent>

                </Card>
            </div>
        )
    }
}


export default withStyles(styles)(AdminBucketMessages);
