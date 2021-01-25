import React from 'react';
import { Container, Nav, Navbar, Modal, Row, Col, Image, Jumbotron, ListGroup, Card, Button, CardColumns } from 'react-bootstrap';
import {db, storage} from './firebase.js';
import Footer from './Footer.js';

export class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            apps: [],
            app: {},
            showHide: false
        }
        this.toggleApp = this.toggleApp.bind(this)
        this.deleteApp = this.deleteApp.bind(this)
    }
    async componentDidMount() {
        await db.ref("AllApps").on("value", snapshot => {
          let AllApps = [];
          snapshot.forEach(snap => {
            AllApps.push(snap.val());
          });
          this.setState({ apps: AllApps });
        });
    }
    openModal(app) {
        this.setState({ showHide: true })
        this.setState({ app: app})
    }
    closeModal(){
        this.setState({ showHide: false})
    }
    toggleApp = (app) => {
        let apps = this.state.apps
        let approval = false
        if (app.approved === false){
            approval = true
        }else if(app.approved === true){
            approval = false
        }
        var index = 0;
        for (var i = 0; i < apps.length; i++){
            if (apps[i].id === app.id){
                apps[i].approved = approval
                index = i
                break;
            }
        }
        db.ref(`AllApps/${index}`).update({'approved': approval })
        db.ref("AllApps").on("value", snapshot => {
            let AllApps = [];
            snapshot.forEach(snap => {
              AllApps.push(snap.val());
            });
            this.setState({ apps: AllApps });
          });
    }
    deleteApp = (app) => {
        let apps = this.state.apps
        let newApps = []
        for (var i = 0; i < apps.length; i++){
            if (apps[i].id !== app.id){
                newApps.push(apps[i])
            } 
        }
        storage.ref('images').child(app.id).delete()
        let AllApps = newApps
        db.ref()
        .set({
          AllApps
        })
    }

    render(){
        return(
            <>
            <Navbar className = "header" fixed="top" variant = "dark" expand = "lg">
                <Navbar.Brand href="/admin_pwd=383103"><div style = {{color: "#992299"}} className="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/app-entry_pwd=Rhyzode12121">App Entry</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {{backgroundColor: "#999999", marginBottom: '0px', color: "#EEEEEE"}}>
            <center><h1><strong><u>Admin</u></strong></h1></center>
            <Container>
            <CardColumns style = {{margin: '20px'}}>
                {this.state.apps.map(app => {
                    return (
                    <Card style={{ width: '18rem', height: 'auto', margin:'20px', backgroundColor: "#333333", boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }} key={app.id} variant = "dark" border = "light">
                    <Card.Header onClick={() => this.openModal(app)}  style = {{textAlign: 'center', color: "#ffffff"}}><strong>{app.name}</strong></Card.Header>
                    <Card.Img onClick={() => this.openModal(app)}  variant="top" src= {app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                    <div>
                    <ListGroup onClick={() => this.openModal(app)}  style = {{margin: '5px'}}>
                        <ListGroup.Item action ><strong>Field:</strong> {app.field}</ListGroup.Item>
                        <ListGroup.Item action><strong>Creator:</strong> {app.creator}</ListGroup.Item>
                        <ListGroup.Item action><strong>Organization: </strong> {app.organization}</ListGroup.Item>
                    </ListGroup>
                    </div>
                        <center> 
                        <div onClick = {() => this.toggleApp(app)} >
                            {app.approved === false ? ( <Button style = {{width:'16rem', margin: '5px'}} variant = "success" >Approve</Button> ) : (<Button style = {{width:'16rem', margin: '5px'}} variant = "danger" >Deactivate</Button> )} 
                        </div>
                            <Button style = {{width:'16rem', margin: '5px'}} onClick = {() => this.deleteApp(app)} variant = "danger">Delete</Button>
                        </center> 
                    </Card>
                    );
                })}
                </CardColumns>
                </Container>

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

export default Admin