import React from 'react';
import { Jumbotron, Col, Row, Button} from 'react-bootstrap';

export class Contact extends React.Component{
    render(){
        return(
            <Jumbotron style = {{backgroundColor: "#666666", marginBottom: '0px', color: "#ffffff"}}>
                <center><h1><strong><u>Contact</u></strong></h1>
                <h4>To gain more information about Rhyzode and how you can publish your application on our website, please use the buttons shown below</h4><br/>
                <Row>
                    <Col><h5><Button style = {{backgroundColor: "#999999", border: "#000000"}} block  href = "mailto:rhyzode@gmail.com?subject = Contact Us - Application Request">Publishing an application</Button></h5></Col>
                    <Col><h5><Button style = {{backgroundColor: "#999999", border: "#000000"}} block  href = "mailto:rhyzode@gmail.com?subject = Contact Us - Information Inquiry">Inquries about Rhyzode</Button></h5></Col>
                    <Col><h5><Button style = {{backgroundColor: "#999999", border: "#000000"}} block  href = "mailto:rhyzode@gmail.com?subject = Contact Us - Joining the Team">Joining our team</Button></h5></Col>
                </Row>
                </center> 
            </Jumbotron>
        );
    }
};

export default Contact