import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Spinner } from 'reactstrap';

export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedOut: false,
        }
    }


    componentDidMount() {
        const isLoggedout = this.props.authservice.LogOut();
        this.setState({isLoggedOut: isLoggedout});
    }


    render() {
        if(this.state.isLoggedOut === true) {
            return (<Redirect to="/" />)
        }
        return (
            <Container className="text-center">
                <div><Spinner color="primary" /> Logging out...</div>
            </Container>
        )
    }
}