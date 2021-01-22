import React from 'react';
import { Nav, Navbar, Dropdown, DropdownButton,  Jumbotron, ListGroup,  Card, Button, Form, CardColumns } from 'react-bootstrap';

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
            purpose: "",
            image: "",
            url: "",
            apps: []
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLinkChange = this.handleLinkChange.bind(this)
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
    async addApp(){
        let IDDate = Date.now()
        //Image Storage
        let file = this.state.image
        let fileID = this.state.name + "-" + IDDate
        if (this.state.creator !== "" && this.state.date !== "" && this.state.field !== "" && this.state.image !== "" && this.state.link !== "" && this.state.name !== "" && this.state.purpose !== ""){
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
                <Navbar.Brand href="/app-entry"><div style = {{color: "#992299"}} class="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {{backgroundColor: "#EEEEEE", marginBottom: '0px'}}>
                <h1><center><strong><u>Enter New Applications</u></strong></center></h1> <br/>
                <Form style = {{margin:'30px'}}>
                    <Form.Group controlID = "Creator">
                        <Form.Label>Creator Name:</Form.Label>
                        <Form.Control type = "text"  value={this.state.creator} onChange = {this.handleCreatorChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Name">
                        <Form.Label>Application Name</Form.Label>
                        <Form.Control type = "text" value={this.state.name} onChange = {this.handleNameChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Link">
                        <Form.Label>Application Link (URL or Github)</Form.Label>
                        <Form.Control type = "text" value={this.state.link} onChange = {this.handleLinkChange}/>
                    </Form.Group>
                    <Form.Group controlID = "Date">
                        <Form.Label>Application Creation Date:</Form.Label><br/>
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
                        <input type = "file" onChange = {this.handleImageChange} />
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
                        <Card.Header style = {{textAlign: 'center', color: "#ffffff"}}><strong>{app.name}</strong></Card.Header>
                        <Card.Img  variant="top" src= {app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                        <div>
                        <ListGroup  style = {{margin: '5px'}}>
                            <ListGroup.Item action ><strong>Field:</strong> {app.field}</ListGroup.Item>
                            <ListGroup.Item action><strong>Creator:</strong> {app.creator}</ListGroup.Item>
                        </ListGroup>
                        </div>
                        </Card>
                        );
                    })}
                </CardColumns>
            </Jumbotron>
            <Footer/>
            </>
        );
    }
};

export default AppEntry