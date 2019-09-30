import React, { Component } from "react";
import { Container } from 'reactstrap';

export default class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }


    render() {
        return (
            <Container>
                <h3>About</h3>
                Logo Icon: <a href="https://icons8.com/icon/nPJ-vAuEzUMX/scary-tree">Scary Tree icon by Icons8</a>
            </Container>
        )
    }
}