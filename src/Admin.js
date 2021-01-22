import React from 'react';
import { Nav, Navbar, Jumbotron, ListGroup, Card, Button, CardColumns } from 'react-bootstrap';
import {db, storage} from './firebase.js';
import Footer from './Footer.js';

export class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            apps: []
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
                <Navbar.Brand href="/admin"><div style = {{color: "#992299"}} class="child inline-block-child"><strong>&lt;/&gt;</strong></div> <div style = {{color: "#ffffff"}} class="child inline-block-child" >Rhyzode</div></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/app-entry">App Entry</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {{backgroundColor: "#999999", marginBottom: '0px', color: "#EEEEEE"}}>
            <center><h1><strong><u>Admin</u></strong></h1></center>
            <CardColumns style = {{columnCount: 4, margin: '20px'}}>
                {this.state.apps.map(app => {
                    return (
                    <Card style={{ width: '18rem', height: 'auto', margin:'20px', backgroundColor: "#333333", boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }} key={app.id} variant = "dark" border = "light">
                    <Card.Header  style = {{textAlign: 'center', color: "#ffffff"}}><strong>{app.name}</strong></Card.Header>
                    <Card.Img variant="top" src= {app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                    <div>
                    <ListGroup style = {{margin: '5px'}}>
                        <ListGroup.Item action ><strong>Field:</strong> {app.field}</ListGroup.Item>
                        <ListGroup.Item action><strong>Creator:</strong> {app.creator}</ListGroup.Item>
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
            </Jumbotron>
            <Footer/>
            </>
        );
    }
};

export default Admin