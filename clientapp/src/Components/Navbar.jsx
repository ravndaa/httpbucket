import React, { Component, Fragment } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";
import { VERSION } from "../Constants";

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isOpen: false,
            isAuth: false,
        };
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    checkAuth = () => {
        const isauth = this.props.authservice.IsAuthenticated();
        this.setState({isAuth: isauth});
    }

    componentDidMount() {
        
        this._subscription = this.props.authservice.subscribe(() => this.checkAuth());
        this.checkAuth();
    }

    componentWillUnmount() {
        this.props.authService.unsubscribe(this._subscription);
    }

    render() {
        const isLoggedIn = this.state.isAuth; //this.props.isLoggedIn;
        const dynNav = isLoggedIn === true ? <AuthNav /> : <AnonNav />;

        return (
            <Navbar color="light" light expand="md" sticky="top" className="shadow">
                <NavbarBrand tag={Link} to="/"> <img src="/logo.png" width="30" height="30" /> httpbucket <span className="h6">{VERSION}</span> </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/about">About</NavLink>
                        </NavItem>
                        {dynNav}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

function AuthNav() {
    return (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} to="/admin">Admin</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/logout">Logout</NavLink>
            </NavItem>
        </Fragment>
    )
}

function AnonNav() {
    return (
        <NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
        </NavItem>
    )
}