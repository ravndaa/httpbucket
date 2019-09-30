import React, { Component } from "react";
import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "admin@local",
            password: "admin",
            isLoggedIn: false,
        }
    }

    handleEmailChange = (event) => { this.setState({ email: event.target.value }) };
    handlePasswordChange = (event) => { this.setState({ password: event.target.value }) };

    handleLoginButton = async () => {
        const response = await fetch("/login", {
          method: 'POST',
          headers: {
            'Content-Type':"application/x-www-form-urlencoded"
          },body: `username=${this.state.email}&password=${this.state.password}`
        })
        if(response.ok) {
          this.handleLoginResponse(await response.json());
          //this.props.history.push("/");
        }
        
      }
      handleLoginResponse = (response) => {
        localStorage.setItem("token", response.token);
        //this.setState({isLoggedIn:true});
        this.props.authservice.setIsAuth();
        window.location.replace("/#/admin");
      }

    componentDidMount() {


    }


    render() {
        if (this.state.isLoggedIn === true) {
            return <Redirect to='/app' />
        }
        return (
            <Container>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={this.handleEmailChange} value={this.state.email} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>
                <Button onClick={this.handleLoginButton}>Submit</Button>
            </Container>
        )
    }
}