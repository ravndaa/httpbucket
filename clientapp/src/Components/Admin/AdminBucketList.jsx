import React, { Component } from "react";
import { createStyles, withStyles, Card, CardHeader, CardContent, Table, TableBody, TableCell, TableRow, TableHead, Button } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const styles = (theme) =>
    createStyles({
        root: {

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




class AdminBucketList extends Component {
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


    deleteBucket = async (id) => {
        console.log("Deleting bucket..." + id);
        const resp = await fetch(`/api/bucket/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': `Bearer ${this.getToken()}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
              }), 
        })
        if(resp.ok) {
            this.loadBuckets();
        }
        
    }
    disconnectClient = async (id) => {
        console.log("Disconnects client. " + id);
        const resp = await fetch(`/api/client/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': `Bearer ${this.getToken()}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
              }), 
        })
        if(resp.ok) {
            this.loadBuckets();
        }
    }
    resetMsgs = async (id) => {
        console.log("Resets Msgs " + id);
        const resp = await fetch(`/api/msgs/${id}`, {
            method: "DELETE",
            headers: new Headers({
                'Authorization': `Bearer ${this.getToken()}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
              }), 
        })
        if(resp.ok) {
            this.loadBuckets();
        }
    }

    componentDidMount() {
        this.loadBuckets();
    }
    render() {
        const rows = this.state.buckets;
        return (
            <div className={this.props.classes.root}>
                <Card elevation={20}>
                    <CardHeader className={this.props.classes.cardheader} title="Buckets" />
                    <CardContent>

                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell># ID</TableCell>
                                    <TableCell >Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.bucketid}>
                                        <TableCell component="th" scope="row">
                                            {row.bucketid}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined">Show Online Clients</Button>
                                            <Button className={this.props.classes.actionbuttons} variant="outlined">Show Messages</Button>
                                            <DeleteButton onClick={() =>this.deleteBucket(row.bucketid)} className={this.props.classes.actionbuttons} variant="outlined">Delete</DeleteButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </CardContent>

                </Card>
            </div>
        )
    }
}


export default withStyles(styles)(AdminBucketList);

const DeleteButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}))(Button);