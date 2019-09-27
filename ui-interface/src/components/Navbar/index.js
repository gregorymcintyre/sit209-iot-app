import React, {Component } from 'react'
import {Link } from 'react-router-dom';



class Navbar extends Component {
    render() {
    return (
     
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className = "navbar-brand">DeviceList</Link>
    
        <input type="button"
         onClick={this.getDevice}
         value={'Devices'}/>
         

        <input type="button"
         onClick={this.getEvent}
         value={'Events'}/>
       
   </nav>


    );
}
}

export default Navbar;
