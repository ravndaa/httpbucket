import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Container } from "reactstrap";
import './App.css';
import NavBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inspect from './Components/Inspect';
import Home from './Components/Home';
import Admin from './Components/Admin';
import Login from './Components/Login';
import AuthRoute from './Components/AuthRoute';
import authService from './Services/AuthService';
import Logout from './Components/Logout';

function App() {
  const authservice = authService;
  //console.log(authservice);
  return (
    <Router>
      <Container >
        <NavBar isLoggedIn={authservice.isLoggedIn()} authservice={authservice} />
        <Container className="mt-4">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <AuthRoute exact path="/admin" component={Admin} />
          <Route exact path="/login" render={(props) => <Login {...props} authservice={authservice} />} />
          <Route exact path="/logout" render={(props) => <Logout {...props} authservice={authservice} />} />
          <Route path="/inspect/:id" component={Inspect} />
          
        </Container>
        
      </Container>
    </Router>
  );
}

export default App;



function About() {
  return (
    <div>About</div>
  )
}