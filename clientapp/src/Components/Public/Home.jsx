import { Container, Paper, Typography, withStyles, Button } from "@material-ui/core"
import React, { Component } from "react"
import { green, purple, grey } from '@material-ui/core/colors';
import { Redirect } from "react-router-dom";
import bucketservice from '../../Services/BucketService';

const styles = {
    root: {
        padding: 10,
        textAlign: "center",
        backgroundColor: grey[200],
    },
};

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,

        }
    }

    createBucket = async () => {
        try {
            
            const data = await bucketservice.CreateBucket();
            if(data !== undefined) {
                this.setState({id: data.bucketid, redirect: true});
                
            }
        } catch (error) {
            
        }
    }
        

    componentDidMount() {


    }


    render() {
        if (this.state.redirect === true) {
            return (<Redirect to={`/bucket/${this.state.id}`} />)
        }

        return (
            <Container >
                <Paper className={this.props.classes.root}>
                    <Typography variant="h2" component="h2">
                        Simple HTTP bucket!
                    </Typography>
                    <Typography variant="h5" component="h3">

                        <p className="lead">Create a bucket for receiving http POST messages.</p>
                        <hr />
                    </Typography>
                    <Typography component="p">
                        <ColorButton onClick={this.createBucket} >Create Bucket</ColorButton>
                    </Typography>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(styles)(Home);