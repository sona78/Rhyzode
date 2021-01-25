import React from 'react';
import { Nav, Navbar, Modal, Container, Row, Col, Image, Dropdown, DropdownButton,  Jumbotron, ListGroup,  Card, Button, Form, CardColumns } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {db, storage} from './firebase.js';
import Footer from './Footer.js';

export class AppEntry extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: "",
            date: "",
            creator: "",
            link: "",
            field: "",
            organization: "",
            purpose: "",
            image: "",
            url: "",
            apps: [],
            app: {},
            showHide: false
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLinkChange = this.handleLinkChange.bind(this)
        this.handleOrganizationChange = this.handleOrganizationChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleCreatorChange = this.handleCreatorChange.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handlePurposeChange = this.handlePurposeChange.bind(this)
        this.addApp = this.addApp.bind(this)
    }
    componentDidMount() {
        db.ref("AllApps").on("value", snapshot => {
          let AllApps = [];
          snapshot.forEach(snap => {
            AllApps.push(snap.val());
          });
          this.setState({ apps: AllApps });
        });
    }
    handleNameChange(e){
        this.setState({name: e.target.value})
    }
    handleOrganizationChange(e){
        this.setState({organization: e})
    }
    handleLinkChange(e){
        this.setState({link: e.target.value})
    }
    handleDateChange(date){
        this.setState({date: date})
    }
    handleCreatorChange(e){
        this.setState({creator: e.target.value})
    }
    handleFieldChange(e){
        this.setState({field: e})
    }
    handlePurposeChange(e){
        this.setState({purpose: e.target.value})
    }
    handleImageChange(e){
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
          }
    }
    openModal(app) {
        this.setState({ showHide: true })
        this.setState({ app: app})
    }
    closeModal(){
        this.setState({ showHide: false})
    }
    async addApp(){
        let IDDate = Date.now()
        //Image Storage
        let file = this.state.image
        let fileID = this.state.name + "-" + IDDate
        if (this.state.creator !== "" && this.state.date !== "" && this.state.organization !== "" && this.state.field !== "" && this.state.image !== "" && this.state.link !== "" && this.state.name !== "" && this.state.purpose !== ""){
        const uploadTask = storage.ref(`/images/${fileID}`).put(file)
        await uploadTask.on('state_changed', 
            (snapShot) => {
            }, (err) => {
            }, () => {
            storage.ref('images').child(fileID).getDownloadURL()
            .then(url => {
                this.setState({ url: url });
            })
            .then(() =>{
                this.publish(IDDate)
            })
        })
        }else{
            alert ("Please fill out all fields")
        }        
    }
    publish (IDDate){
        let creator = this.state.creator
        let date =  this.state.date
        date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() + 1900)
        let field = this.state.field
        let organization = this.state.organization
        let id = this.state.name + "-" + IDDate
        let image = this.state.url
        let link = this.state.link
        let name = this.state.name
        let purpose = this.state.purpose
        let likes = 0
        let approved = false
        db.ref(`AllApps/${this.state.apps.length}`)
        .set({
          creator,
          date,
          field,
          organization,
          id,
          image,
          likes,
          link,
          name,
          purpose,
          approved
        })
        .then(_ => {
          window.location.reload()
        });
    }
    render(){
        return(
            <>
            <Navbar className = "header" fixed="top" variant = "dark" expand = "lg">
                <Navbar.Brand href="/app-entry_pwd=Rhyzode12121"><div style = {{color: "#992299"}} className="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {{backgroundColor: "#EEEEEE", marginBottom: '0px'}}>
                <h1><center><strong><u>Enter New Project</u></strong></center></h1> <br/>
                <Form style = {{margin:'30px'}}>
                    <Form.Group controlID = "Creator">
                        <Form.Label>Creator Name:</Form.Label>
                        <Form.Control type = "text"  value={this.state.creator} onChange = {this.handleCreatorChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Name">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type = "text" value={this.state.name} onChange = {this.handleNameChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Organization">
                        <Form.Label>Organization:</Form.Label>
                        <DropdownButton variant = "secondary" onSelect = {this.handleOrganizationChange} title = {this.state.organization}>
                            <Dropdown.Item eventKey="Independent">Independent</Dropdown.Item>
                        </DropdownButton><br/>
                    </Form.Group>
                    <Form.Group controlID = "Link">
                        <Form.Label>Project Link (URL or Github)</Form.Label>
                        <Form.Control type = "text" value={this.state.link} onChange = {this.handleLinkChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Date">
                        <Form.Label>Project Creation Date:</Form.Label><br/>
                        <DatePicker selected={this.state.date} dateFormat = "MM/dd/yyyy" onChange={this.handleDateChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Field">
                        <Form.Label>Field:</Form.Label>
                        <DropdownButton variant = "secondary" onSelect = {this.handleFieldChange} title = {this.state.field}>
                            <Dropdown.Item eventKey="Social Media">Social Media</Dropdown.Item>
                            <Dropdown.Item eventKey="Productivity">Productivity</Dropdown.Item>
                            <Dropdown.Item eventKey="Medical">Medical</Dropdown.Item>
                            <Dropdown.Item eventKey="Lifestyle">Lifestyle</Dropdown.Item>
                            <Dropdown.Item eventKey="Utility">Utility</Dropdown.Item>
                            <Dropdown.Item eventKey="Games/Entertainment">Games/Entertainment</Dropdown.Item>
                            <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                        </DropdownButton><br/>
                    </Form.Group>
                    <Form.Group controlID = "Purpose">
                        <Form.Label>Purpose/Description:</Form.Label>
                        <Form.Control as="textarea" rows = "5" value={this.state.purpose} onChange = {this.handlePurposeChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Image">
                        <Form.Label>Image:</Form.Label><br/>
                        <input type = "file" onChange = {this.handleImageChange} accept = "image/*"/>
                    </Form.Group>
                    <Button className="my-1" onClick = {this.addApp}>
                        Submit
                    </Button>
                </Form>
            </Jumbotron>
            <Jumbotron style = {{backgroundColor: "#ffffff", marginBottom: "0px"}}>
                <CardColumns style = {{columnCount: 4, margin: '20px'}}>
                    {this.state.apps.map(app => {
                        return (
                        <Card style={{ width: '18rem', height: 'auto', margin:'20px', backgroundColor: "#333333", boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }} key={app.id} variant = "dark" border = "light">
                        <Card.Header onClick={() => this.openModal(app)} style = {{textAlign: 'center', color: "#ffffff"}}><strong>{app.name}</strong></Card.Header>
                        <Card.Img onClick={() => this.openModal(app)} variant="top" src= {app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                        <div>
                        <ListGroup onClick={() => this.openModal(app)} style = {{margin: '5px'}}>
                            <ListGroup.Item action ><strong>Field:</strong> {app.field}</ListGroup.Item>
                            <ListGroup.Item action><strong>Creator:</strong> {app.creator}</ListGroup.Item>
                        </ListGroup>
                        </div>
                        </Card>
                        );
                    })}
                </CardColumns>

                <Modal show={this.state.showHide} centered dialogClassName="modal-90w" size="lg"> 
                    <Modal.Header closeButton onClick={() => this.closeModal()}>
                    <Modal.Title>{this.state.app.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <center>
                                <h4>Information about {this.state.app.name}</h4>
                                <strong>Created by {this.state.app.creator}</strong><br/>
                            </center>
                            <Row>
                                <Col>
                                    <Image href = {this.state.app.image} target = "_blank" variant="top" src= {this.state.app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                                </Col>
                                <Col>
                                    <ListGroup style = {{margin: '5px'}}>
                                        <ListGroup.Item><strong>Field: </strong>{this.state.app.field}</ListGroup.Item>
                                        <ListGroup.Item><strong>Created on: </strong>{this.state.app.date}</ListGroup.Item>
                                        <ListGroup.Item><strong>Description: </strong>{this.state.app.purpose}</ListGroup.Item>
                                        <ListGroup.Item><strong>Likes❤️: </strong>{this.state.app.likes}</ListGroup.Item>
                                        <ListGroup.Item><strong>Organization: </strong> {this.state.app.organization}</ListGroup.Item>
                                        <br/>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" href = {"//" + this.state.app.link} target="_blank">
                        Visit Application
                    </Button>
                    <Button variant="secondary" onClick={() => this.closeModal()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

            </Jumbotron>
            <Footer/>
            </>
        );
    }
};

export default AppEntry