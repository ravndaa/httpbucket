import React, { Component } from "react";
import { withStyles, Container, TextField, Button, FormGroup } from "@material-ui/core";
import { withApp } from "../../Services/AuthContext";

const styles = {
    root: {


    },
    button: {

    },
};

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "admin@local",
            password: "admin",
            redirect: false,
        }
    }


    componentDidMount() {


    }

    handleEmailChange = (event) => { this.setState({ email: event.target.value }) };
    handlePasswordChange = (event) => { this.setState({ password: event.target.value }) };

    handleLoginButton = async () => {
        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }, body: `username=${this.state.email}&password=${this.state.password}`
        })
        if (response.ok) {
            this.handleLoginResponse(await response.json());
            //this.props.history.push("/");
        }

    }
    handleLoginResponse = (response) => {
        localStorage.setItem("token", response.token);
        //this.setState({isLoggedIn:true});
        //this.props.authservice.setIsAuth();
        this.props.appContext.setAuth(true);
        window.location = "/#/admin";

    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        
    }

    render() {
        return (
            <Container maxWidth="sm">
                
                <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <TextField
                        id="standard-email-input"
                        label="Email"
                        className={this.props.classes.textField}
                        type="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        autoComplete="current-email"
                        margin="normal"
                    />

                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className={this.props.classes.textField}
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        autoComplete="current-password"
                        margin="normal"
                    />


                    <Button type="submit" variant="outlined" onClick={this.handleLoginButton} className={this.props.classes.button}>
                        Login
                    </Button>
                </FormGroup>
                </form>
            </Container>)
    }
}

export default withStyles(styles)(withApp(Login));