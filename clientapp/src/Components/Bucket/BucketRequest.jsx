import React, { Component, Fragment } from "react";
import { withStyles, Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { grey} from "@material-ui/core/colors";

const styles = {
    root: {
        marginTop: '1em'
    },
    itemroot: {
        display: 'flex',
        flexDirection: 'row'
        
    },
    cardheader: {
        backgroundColor: grey[200],
        
    },
    headerTextMethod: {
        marginRight: 4,
        fontWeight: 'bold', 
    },
    headerTextDatetime: {
        marginLeft: '2em',
    },
    headerTextIP: {
        justifyContent: 'flex-end',
    },
    headerTextUrl: {},
};

class BucketRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }

    headerTitle = () => {
        return (
            <div className={this.props.classes.itemroot}>
                <Typography className={this.props.classes.headerTextMethod}>{this.props.data.method}</Typography>
                <Typography className={this.props.classes.headerTextUrl}>{this.props.data.url}</Typography>
                <Typography className={this.props.classes.headerTextDatetime}>{this.props.data.datetime}</Typography>
                <Typography  align="right" className={this.props.classes.headerTextIP}>{this.props.data.fromip}</Typography>
            </div>
            
            )
    }


    render() {

        return (
            <Fragment>
                <div className={this.props.classes.root}>
                    <Card>
                        <CardHeader disableTypography={true} className={this.props.classes.cardheader} title={this.headerTitle()} />
                        <CardContent>

                            
                            {this.props.data.body}
                        </CardContent>
                    </Card>

                </div>
            </Fragment>
        )
    }
}

export default withStyles(styles)(BucketRequest);