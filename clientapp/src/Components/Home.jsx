import React from 'react';
import { Redirect } from "react-router-dom";
import { Container, Button, Jumbotron } from "reactstrap";


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            id: "",
        }
    }

    storeBucket = (bucket) => {
        let bucketStore = [];
        const existing = localStorage.getItem("buckets");
        bucketStore.push(existing)

        if(existing === null) {
            
            localStorage.setItem("buckets", bucket);
        } else {
            const newStore = bucketStore.concat(bucket);
            localStorage.setItem("buckets", newStore);
        }
        
    }

    createBucket = async () => {
        let res = await fetch("/api/createbucket", {
            method: "POST",

        })

        let data = await res.text()
        console.log(data)
        this.storeBucket(data);
        this.setState({id: data})
        this.setState({redirect: true})
        //window.location = "/inspect/" + data
    }

    render() {
        if(this.state.redirect === true) {
            return (<Redirect to={`/inspect/${this.state.id}`} />)
        }
        return (
            <div >
                <Jumbotron>
                    <h1 className="display-3">Simple HTTP bucket!</h1>
                    <p className="lead">Create a bucket for receiving http POST messages.</p>
                    <hr className="my-2" />
                    
                    <Container className="text-center">
                        <Button color="success" onClick={this.createBucket}> Create Bucket</Button>
                    </Container>
                    
                </Jumbotron>
            </div>
        )
    }
}




