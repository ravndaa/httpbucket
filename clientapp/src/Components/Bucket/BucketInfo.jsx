import React, { Component } from "react";
import { withStyles,Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";
import {green} from '@material-ui/core/colors'

const styles = {
    root: {


    },
};

class BucketInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }

    downloadFile = (data, fileName, type="application/json") =>{
        // Create an invisible A element
        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
      
        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = window.URL.createObjectURL(
          new Blob([data], { type })
        );
      
        // Use download attribute to set set desired file name
        a.setAttribute("download", fileName);
      
        // Trigger the download by simulating click
        a.click();
      
        // Cleanup
        window.URL.revokeObjectURL(a.href);
        document.body.removeChild(a);
      }

      CreatePostManFile = async () => {
        const { id} = this.props;
        const res = await fetch(`/b/createpostman/${id}`);
        if(res.ok) {
            const file = await res.blob();
            this.downloadFile(file,`httpBucket-Postman-${id}.json`)
        }
        

    }


    render() {
        

        return (
            <Card elevation={20}>
            <CardHeader className={this.props.classes.cardheader} title={`ID: ${this.props.id}`} />
            <CardContent>

                <Typography>Request URL: {this.props.url}</Typography>
                <PostmanButton onClick={this.CreatePostManFile}>Create Postman File</PostmanButton>

            </CardContent>

        </Card>
        )
    }
}

export default withStyles(styles)(BucketInfo);


const PostmanButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);