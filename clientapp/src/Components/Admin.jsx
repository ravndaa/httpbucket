import React, { Component } from "react";
import {Container, Spinner} from 'reactstrap';
import AdminListBuckets from "./AdminListBuckets";

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
        <Container >
            
            <AdminListBuckets />
           
        </Container>
    )
}
}