import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/styles";
import Emojify from 'react-emojione';

const styles = createStyles({
    root: {

        fontSize: "20px",
        color: "black",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "2rem",
        width: "100%"
    },
    footer: {

    },
}
)

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }


    render() {
        return (
            <div className={this.props.classes.footer}>
                <Paper className={this.props.classes.root} elevation={1}>

                    <Typography component="p">
                    <Emojify style={{height: 22, width: 22}}>
                        :heart:
                    </Emojify>
                     From norway
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Footer)