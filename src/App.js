import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import Main from './Main.js'
import AppEntry from './AppEntry.js'
import Admin from './Admin.js'
import React from 'react'

import{  
    BrowserRouter as Router,
      Route,
      Switch,
    } from "react-router-dom";

class App extends React.Component {
  componentDidMount(){
    console.clear()
  }
  render(){
    return(
      <FirebaseDatabaseProvider>
      <Router>
          <Switch>
              <Route exact path= "/" component = {Main}/>
              <Route exact path= "/app-entry_pwd=Rhyzode12121" component = {AppEntry}/>
              <Route exact path= "/admin_pwd=383103" component = {Admin}/>
          </Switch>
      </Router>
      </FirebaseDatabaseProvider>
    );
  }

}

export default App;