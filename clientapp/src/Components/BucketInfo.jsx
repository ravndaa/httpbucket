import React, { Component } from "react";
import {Container, Card, CardBody,CardHeader, CardText, Button} from 'reactstrap';

export default class BucketInfo extends Component {
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
        const {url, id} = this.props;
        const res = await fetch(`/b/createpostman/btvqnqQBF?url=${url}`);
        if(res.ok) {
            const file = await res.blob();
            this.downloadFile(file,`httpBucket-Postman-${id}.json`)
        }
        

    }

    render() {
        const {url, id, postmanurl} = this.props;
        return(
            <Container className="mb-4">
                <Card>
                    <CardHeader>Your ID: <b>{id}</b></CardHeader>
                    <CardBody>
                        <CardText>Url: <b>{url}</b></CardText>
                        <CardText>Postman file Url: <b>{postmanurl}?url={url}</b></CardText>
                        <CardText><Button onClick={this.CreatePostManFile}>Or Create Postman File</Button></CardText>
                        
                    </CardBody>
                </Card>
                
            </Container>
        )
    }
}