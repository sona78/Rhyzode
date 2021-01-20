import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  useHistory
} from "react-router-dom";
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import Home from './Home.js'
import About from './About.js'
import Contact from './Contact.js'
import Logo from './Images/Logo.png'

function App() {
  return (
    <>
    <div>
    <Navbar className = "header" fixed="top" variant = "dark" expand = "lg">
      <Navbar.Brand href="#home"><div style = {{color: "#992299"}} class="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
    </div> 
    <a id = "home"><Home /></a>
    <a id = "about"><About/></a>
    <a id = "contact"><Contact/></a>
    </>
  );
}

export default App;
