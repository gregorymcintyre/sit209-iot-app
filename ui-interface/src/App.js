import React, { Component, Fragment } from "react";
import { Devices, Events, Navbar, DeviceList } from "./components";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Icon } from 'semantic-ui-react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import axios from 'axios';
import {Link } from 'react-router-dom';


const MQTT_URL = 'http://127.0.0.1:5001';
class App extends Component { 
  

  

  render () {
   
    return (
        <Router>
        <div className = "container">
              
                <div>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='users' circular />
                  <Header.Content>Kelp The World</Header.Content>
                </Header>
                 </div>
        
        <nav className="navbar navbar-dark bg-dark">
        <Link to="/" className = "navbar-brand">KTW</Link>
        
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
        <Link to="/" className = "nav-link">Home</Link>
            </li>
            <li className="navbar-item">
        <Link to="/deviceList" className = "nav-link">Devices</Link>
            </li>
        
         </ul>
         </nav>
         <br/>
         <Route path="/" exact component={Events}/>
         <Route path="/deviceList" component ={Devices}/>


       </div>
    </Router>
    )
  }


    
    
       
   
  
}
  
export default App;
