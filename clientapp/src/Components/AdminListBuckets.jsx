import React, { Component } from "react";
import { Container, Card, CardBody, CardHeader, CardText, Table, Button } from 'reactstrap';

export default class AdminListBuckets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buckets: [],
        }
    }


    componentDidMount() {
        this.loadBuckets();
    }

    loadBuckets = async () => {
        // http://localhost:1323/api/listbuckets
        const resp = await fetch("/api/listbuckets");
        const data = await resp.json();
        this.setState({buckets: data});
    }

    deleteBucket = async (id) => {
        console.log("Deleting bucket..." + id);
        const resp = await fetch(`/api/bucket/${id}`, {
            method: "DELETE",
        })
        if(resp.ok) {
            this.loadBuckets();
        }
        
    }
    disconnectClient = async (id) => {
        console.log("Disconnects client. " + id);
        const resp = await fetch(`/api/client/${id}`, {
            method: "DELETE",
        })
        if(resp.ok) {
            this.loadBuckets();
        }
    }
    resetMsgs = async (id) => {
        console.log("Resets Msgs " + id);
        const resp = await fetch(`/api/msgs/${id}`, {
            method: "DELETE",
        })
        if(resp.ok) {
            this.loadBuckets();
        }
    }

    render() {
        const {buckets} = this.state;
        console.log(buckets)
        let bucketlist;
        if(buckets !== null){
            bucketlist = buckets.map((item) => {
                const online = item.online.toString();
                const stats = item.stats === 0 ? "0" : item.stats;
                return (<tr key={item.id}><th scope="row">{item.id}</th><th>{online}</th><th>{stats}</th><th><Button onClick={() =>this.deleteBucket(item.id)} color="danger">Delete</Button> <Button onClick={() => this.disconnectClient(item.id)} color="warning">Disconnect</Button> <Button onClick={() => this.resetMsgs(item.id)} color="warning">Reset Msgs</Button></th></tr>);
            })
        }
        return (
            <Container className="mb-4">
                <Card>
                    <CardHeader>Buckets</CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Online</th>
                                    <th>Count Messages</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bucketlist}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

            </Container>
        )
    }
}