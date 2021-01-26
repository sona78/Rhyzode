import React from 'react';
import {  Image, Modal, Jumbotron, ListGroup, Container, Col, Row, Card, Button, CardColumns } from 'react-bootstrap';
import {db} from './firebase.js';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import publicIp from "public-ip"
import queryString from "query-string"

export class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            apps: [],
            appsDisplay: this.props.appsDisplay,
            params: queryString.parse(window.location.search),
            showHide : false,
            ip: "",
            app: {}
        }
        this.appDisplay = this.appDisplay.bind(this)
        this.getUserIP = this.getUserIP.bind(this)
        this.toggle = this.toggle.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    async componentDidMount() {
        await db.ref("AllApps").on("value", snapshot => {
          let AllApps = [];
          snapshot.forEach(snap => {
            AllApps.push(snap.val());
          });
          if (this.state.params.name && this.state.params.creator){
              for (var i = 0; i < AllApps.length; i ++){
                  if (AllApps[i].name.toLowerCase() === this.state.params.name.toLowerCase() && AllApps[i].creator.toLowerCase() === this.state.params.creator.toLowerCase()){
                      this.openModal(AllApps[i])
                  }
              }
          }

          this.setState({ apps: AllApps });
          this.appDisplay()
          this.getUserIP()
        });
    }
    async getUserIP(){
        try{
        var userIP = await publicIp.v6();
        }catch {
        userIP = "0.0.0.0"
        }
            
        this.setState({ip: userIP})
        
        
    }
    appDisplay(){
        let appsDisplay = []
        let apps = this.state.apps
        for (var i = 0; i < apps.length; i ++){
            if(apps[i].approved === true){
                appsDisplay.push(apps[i])
            }
        }
        this.setState({ appsDisplay: appsDisplay})
    }
    componentDidUpdate(prevProps) {
        let AllApps = this.state.apps
        if(AllApps !== []){
            db.ref()
            .set({
              AllApps
            })
        }
        if(prevProps.appsDisplay !== this.props.appsDisplay) {
              this.setState({appsDisplay: this.props.appsDisplay})
        }
    }
    openModal(app) {
        this.setState({ showHide: true })
        this.setState({ app: app})
    }
    closeModal(){
        this.setState({ showHide: false})
        console.clear()
    }
    toggle = (app) => {
        if(this.state.ip !== "0.0.0.0"){
        if(app.likeList.indexOf(this.state.ip) === -1){
            app.likes++
            app.likeList = app.likeList + this.state.ip + ","
        }else{
            app.likes--
            app.likeList = app.likeList.replace(this.state.ip + ",", "")
        }

        let apps = this.state.apps
        for (var i = 0; i < apps.length; i++){
            if (apps[i].id === app.id){
                apps[i] = app
                break;
            }
        }
        this.setState({apps: apps})
        this.appDisplay();
        }else{
            alert("VPN Detected")
        }
      }; 
    render(){
        return(
            <>
            <Jumbotron style = {{backgroundColor: "#EEEEEE", marginBottom: '0px'}}><br/><br/>
                <center><h1><strong><u>Project Hub</u></strong></h1></center>
                <CardColumns style = {{columnCount: 'auto', margin: '20px'}}>
                {this.state.appsDisplay.map(app => {
                    return (
                    <Card style={{ width: '18rem', height: 'auto', margin:'20px', backgroundColor: "#333333", boxShadow:"2px 2px 2px 1px rgba(0, 0, 0, 0.2)" }} key={app.id} variant = "dark" border = "light">
                    <Card.Header onClick={() => this.openModal(app)} style = {{textAlign: 'center', color: "#ffffff"}}><strong>{app.name}</strong></Card.Header>
                    <Card.Img onClick={() => this.openModal(app)} variant="top" src= {app.image} style = {{width:'16rem', height:'auto', margin:'1rem'}} />
                    <div>
                    <ListGroup onClick={() => this.openModal(app)} style = {{margin: '5px'}}>
                        <ListGroup.Item action><strong>Field:</strong> {app.field}</ListGroup.Item>
                        <ListGroup.Item action><strong>Creator:</strong> {app.creator}</ListGroup.Item>
                        <ListGroup.Item action><strong>Organization: </strong> {app.organization}</ListGroup.Item>
                    </ListGroup>
                    </div>
                    
                    <div className="container"> 
                        <center> 
                        <div onClick={() => this.toggle(app)} style = {{color: "white"}} > 
                            {app.likes === 0 ? ( <h6 style = {{color: "red"}}><BsHeart/></h6> ) : (<h6 style = {{color: "red"}}><BsHeartFill/></h6> )} 
                            {app.likes}
                        </div> 
                        </center> 
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
                                        <ListGroup.Item><strong>Organization: </strong> {this.state.app.organization}</ListGroup.Item>
                                        <ListGroup.Item><strong>Description: </strong>{this.state.app.purpose}</ListGroup.Item>
                                        <ListGroup.Item><strong>Likes❤️: </strong>{this.state.app.likes}</ListGroup.Item>
                                        <br/>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" href = {"//" + this.state.app.link} target="_blank">
                        Visit Project
                    </Button>
                    <Button variant="secondary" onClick={() => this.closeModal()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
            </>
        );
    }
};

export default Home