import React, { Component } from 'react';
import { withStyles, Container } from '@material-ui/core';
import NavBar from "./Components/Layout/NavBar";
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import AuthRoute from "./Services/AuthRoute";
import Home from './Components/Public/Home';
import About from "./Components/Public/About";
import Login from "./Components/Public/Login";
import BucketContainer from './Components/Bucket/BucketContainer';
import AdminContainer from './Components/Admin/AdminContainer';
const styles = {
  root: {

  },
  topmargin: {
    marginTop: '2rem',
  },
};

class App extends Component {
  render() {
    return (
      <Router>


        <div className={this.props.classes.root}>

          <NavBar toggleDrawer={this.toggleDrawer} />

          <Container className={this.props.classes.topmargin}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/bucket/:id" component={BucketContainer} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <AuthRoute exact path="/admin" component={AdminContainer} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);

