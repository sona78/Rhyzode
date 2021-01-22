import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export class About extends React.Component{
    render(){
        return(
            <Jumbotron style = {{backgroundColor: "#999999", marginBottom: '0px', color: "#ffffff"}}>
                <center><h1><strong><u>About</u></strong></h1>
                <h4>Rhyzode is a public display platform for students to share their coding projects with the world!</h4></center>
                <p>This platform was developed in the January of 2021 in order to offer a new platform for students to showcase any coding projects they did in their spare time and allow them a space to gain recognition and users for their applications. Coding has become an essental skill in the 21st century and learning from a young age is crucial to ensuring the ability to achieve success in this field. Rhyzode aims to expand student interest in coding through a unique public platform where anyone can display their application or code without any restrictions of existing digital infrastructure. For the public, feel free to explore and like the unique collection of apps present on this page!</p>
            </Jumbotron>
        );
    }
};

export default About