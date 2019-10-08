import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import BucketInfo from "./BucketInfo";
import BucketRequests from "./BucketRequests";

const styles = {
    root: {
        marginBottom: '4rem',
    },
};

class BucketContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }


    render() {
        const id = this.props.match.params.id;
        const url = window.location.protocol + "//" + window.location.host + "/b/" + id

        return (
            <div className={this.props.classes.root}>
                <BucketInfo url={url} id={id} />
                <BucketRequests bucketid={id} history={this.props.history} match={this.props.match} location={this.props.location} />
            </div>
        )
    }
}

export default withStyles(styles)(BucketContainer);