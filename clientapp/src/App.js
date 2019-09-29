import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from "reactstrap";
import './App.css';
import NavBar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inspect from './Components/Inspect';
import Home from './Components/Home';
import Admin from './Components/Admin';

function App() {
  return (
    <Router>
      <Container >
        <NavBar />
        <Container className="mt-4">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/admin" component={Admin} />
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