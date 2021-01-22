import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import Home from './Home.js'
import About from './About.js'
import Contact from './Contact.js'
import Footer from './Footer.js'

function Main() {
  return (
    <div>
    <div>
    <Navbar className = "header" fixed="top" variant = "dark" expand = "lg">
      <Navbar.Brand href="/"><div style = {{color: "#992299"}} class="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
    </div> 
    <Home />
    <div id = "about"><About id = "about"/></div>
    <div id = "contact"><Contact/></div>
    <Footer/>
    </div>
  );
}

export default Main;
