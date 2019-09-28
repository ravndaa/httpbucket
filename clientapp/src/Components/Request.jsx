import React, { Component } from "react";
import { Container, Card, CardBody, CardText, CardTitle, CardHeader } from "reactstrap";

export default class Request extends Component {
constructor(props) {
super(props)
this.state = {

}
}


componentDidMount() {


}


render() {
    const data = this.props.data;
    const headers = data.headers;
    return(
        <Container className="mt-3">
            <Card >
                <CardHeader className="bg-info">
                    <span className="font-weight-bold">{data.method}</span> 
                    <span className="ml-1 font-weight-bold">{data.url}</span> 
                    <span className="ml-3 text-black-50">[{data.datetime}]</span> 
                    <span className="float-right">{data.fromip}</span> 
                </CardHeader>
                <CardBody>{data.client}</CardBody>
            
            </Card>
        </Container>
    )
}
}