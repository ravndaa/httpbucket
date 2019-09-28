import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isOpen: false,

        };
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="light" light expand="md" sticky="top" className="shadow">
                <NavbarBrand tag={Link} to="/">Spuky</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/about">About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}