import React, { Component } from 'react';
import { withStyles, Container, Drawer, Grid, List, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';
import NavBar from "./Components/Layout/NavBar";
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import AuthRoute from "./Services/AuthRoute";
import Home from './Components/Public/Home';
import About from "./Components/Public/About";
import Login from "./Components/Public/Login";
import BucketContainer from './Components/Bucket/BucketContainer';
import AdminContainer from './Components/Admin/AdminContainer';
import Footer from './Components/Layout/Footer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import logo from './Components/Layout/logo.png';

const styles = {
  root: {

  },
  drawer: {
    width: '17rem',
    flexShrink: 0,
  },
  drawerPaper: {

    width: '17rem',
  },
  topmargin: {
    marginTop: '2rem',
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30,

  },
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  toggleDrawer = () => {
    const isopen = this.state.open ? false : true;
    this.setState({ open: isopen });
  }


  render() {

    const bProps = {
      invisible: true,
      open: true,
    }

    return (
      <Router>


        <div className={this.props.classes.root}>

          <NavBar toggleDrawer={this.toggleDrawer} />

          <Drawer className={this.props.classes.drawer} hideBackdrop={false} BackdropProps={bProps} elevation={20} open={this.state.open} onClose={this.toggleDrawer}>
            <List className={this.props.classes.drawerPaper}>
              <Grid container justify="flex-start" alignItems="center" className={this.props.classes.drawerLogo}>
                <Avatar alt="logo" src={logo} className={this.props.classes.avatar} />
                httpBucket
              </Grid>
              <hr />
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Container className={this.props.classes.topmargin}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/bucket/:id" component={BucketContainer} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <AuthRoute exact path="/admin" component={AdminContainer} />
            </Switch>
          </Container>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);

