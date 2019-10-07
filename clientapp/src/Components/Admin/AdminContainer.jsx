import React,{ Component } from "react";
import { createStyles, withStyles } from "@material-ui/core";
import AdminBucketList from "./AdminBucketList";

const styles = (theme) =>
    createStyles({
        root: {
           
        }
    });




class AdminContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className={this.props.classes.root}>
                <AdminBucketList />
            </div>
        )
    }
}


export default withStyles(styles)(AdminContainer);