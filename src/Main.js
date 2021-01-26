import './Main.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Dropdown, DropdownButton, Form, Modal, Container, Button } from 'react-bootstrap';
import {db} from './firebase.js';
import Home from './Home.js'
import About from './About.js'
import Contact from './Contact.js'
import Footer from './Footer.js'

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      appsDisplay: [],
      appsSort: [],
      showHide: false,
      sortGroup: "",
      order: ""
    }
    this.handleSortGroupChange = this.handleSortGroupChange.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
  }
  async componentDidMount() {
    await db.ref("AllApps").on("value", snapshot => {
      let AllApps = [];
      snapshot.forEach(snap => {
        AllApps.push(snap.val());
      });
      let appsDisplay = []
      let apps = AllApps
      for (var i = 0; i < apps.length; i ++){
          if(apps[i].approved === true){
              appsDisplay.push(apps[i])
          }
      }
      this.setState({ appsDisplay: appsDisplay})
    });
  }
  componentDidUpdate(){
    console.clear()
  }
  handleSortGroupChange(e){
    this.setState({sortGroup: e})
  }
  handleOrderChange(e){
    this.setState({order: e})
  }
  openModal() {
    this.setState({ showHide: true })
    console.clear()
  }
  closeModal(){
    this.setState({ showHide: false})
    console.clear()
  }
  appSort(){
    let sortGroup = this.state.sortGroup
    let order = this.state.order
    let list = this.state.appsDisplay
    if(sortGroup !== "" && order !== ""){
    if(sortGroup === "Application Name"){
      list.sort((a, b) => {
        let fa = a.name
        let fb = b.name
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
    }
    if(sortGroup === "Organization"){
      list.sort((a, b) => {
        let fa = a.organization
        let fb = b.organization

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
    if(sortGroup === "Creation Date"){
      list.sort((a, b) => {
        let fa = a.date
        let fb = b.date

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
    if(sortGroup === "Field"){
      list.sort((a, b) => {
        let fa = a.field
        let fb = b.field

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
    if(sortGroup === "Likes"){
      list.sort((a, b) => {
        let fa = a.likes
        let fb = b.likes

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
    if(order === "Descending"){
      list.reverse();
    }
    this.setState({appsSort: list})

  }else{
    alert("Please fill out all fields")
  }
  }
  render(){
    return (
      <>
      <div>
      <Navbar className = "header" fixed="top" variant = "dark" expand = "lg">
        <Navbar.Brand href="/" className="child inline-block-child" style = {{display: "flex"}}><div style = {{color: "#992299", marginRight: "6px"}} className="child inline-block-child"><strong>&lt;/&gt;</strong></div><div style = {{color: "#ffffff"}} > Rhyzode</div></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        <Button variant = "outline-light" onClick={() => this.openModal()}>Filter</Button>
      </Navbar>
      </div> 
      <Home appsDisplay = {this.state.appsSort}/>
      <div id = "about"><About id = "about"/></div>
      <div id = "contact"><Contact/></div>
      <Footer/>

      <Modal show={this.state.showHide} centered dialogClassName="modal-90w" size="lg"> 
          <Modal.Header closeButton onClick={() => this.closeModal()}>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Sort By:</Form.Label>                        
                        <DropdownButton variant = "secondary" onSelect = {this.handleSortGroupChange} title = {this.state.sortGroup}>
                            <Dropdown.Item eventKey="Application Name">Application Name</Dropdown.Item>
                            <Dropdown.Item eventKey="Organization">Organization</Dropdown.Item>
                            <Dropdown.Item eventKey="Creation Date">Creation Date</Dropdown.Item>
                            <Dropdown.Item eventKey="Field">Field</Dropdown.Item>
                            <Dropdown.Item eventKey="Likes">Likes</Dropdown.Item>
                        </DropdownButton><br/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Order:</Form.Label>                        
                        <DropdownButton variant = "secondary" onSelect = {this.handleOrderChange} title = {this.state.order}>
                            <Dropdown.Item eventKey="Ascending">Low ➡ High</Dropdown.Item>
                            <Dropdown.Item eventKey="Descending">High ➡ Low</Dropdown.Item>
                        </DropdownButton><br/>
                    </Form.Group>
                </Form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick = {() => this.appSort()}>
              Apply Changes
            </Button>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default Main;