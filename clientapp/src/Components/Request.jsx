import React, { Component } from "react";
import { Container, Card, CardBody, CardHeader } from "reactstrap";

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
    
    const headerslist = Object.keys(headers).map(key =>  {
        return <ListHeader key={key} keyname={key} value={headers[key]} />
    })

    return(
        <Container className="mt-3">
            <Card >
                <CardHeader className="bg-info">
                    <span className="font-weight-bold">{data.method}</span> 
                    <span className="ml-1 font-weight-bold">{data.url}</span> 
                    <span className="ml-3 text-black-50">[{data.datetime}]</span> 
                    <span className="float-right">{data.fromip}</span> 
                </CardHeader>
                <CardBody>
                    {headerslist}
                    <br />
                    <Container>
                        {data.body}
                    </Container>
                    
                </CardBody>
            
            </Card>
        </Container>
    )
}
}


function ListHeader(props) {
    const keyname = props.keyname;
    const value = props.value;
        return(
            <Container>
                <span className="font-weight-bold">{keyname}:</span> {value}
            </Container>
        );
    
}