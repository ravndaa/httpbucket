import React, { Component } from "react";
import {Container, Card, CardBody,CardHeader, CardText} from 'reactstrap';

export default class BucketInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {

    }


    render() {
        const {url, id} = this.props;
        return(
            <Container className="mb-4">
                <Card>
                    <CardHeader>Your ID: <b>{id}</b></CardHeader>
                    <CardBody>
                        <CardText>Url: <b>{url}</b></CardText>
                    </CardBody>
                </Card>
                
            </Container>
        )
    }
}