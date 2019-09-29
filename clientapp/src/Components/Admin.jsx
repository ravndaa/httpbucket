import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {Container, Spinner} from 'reactstrap';

export default class Admin extends Component {
constructor(props) {
super(props)
this.state = {
    
}
}


componentDidMount() {
    
}


render() {

    return(
        <Container className="text-center">
            <div><Spinner color="primary"/> Under development</div>
        </Container>
    )
}
}