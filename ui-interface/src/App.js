import React, { Component, Fragment } from "react";
import { Devices, Events } from "./components";
import './App.css';
const API_URL = "XXXX";
// styling to follow

class App extends Component { 

  
  setState = {
    sensorId : undefined,
    sensorName : undefined,
    array: undefined,

	}

  
  render () {
   
    return (
        <div className = "App">
          <header className = "App-header">
              <h1>
                Kelp The World
              </h1>

            <input type="button"
              onClick={this.getDevice}
              value={'Devices'}/>

             <input type="button"
              onClick={this.getEvent}
              value={'Events'}/>

        </header>
        
        <div className= "App-content">
          <Fragment>
              <Devices
              sensorId= {this.setState.sensorId}
              sensorName= {this.setState.sensorName}/>
              <Events
              sensorId= {this.setState.sensorArray}
              array= {this.setState.array}
              />
          </Fragment>
            
        </div>
      </div>

    )
  }

 
    getEvent = () =>
    {
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          this.setState({
            sensorId:data.sensorId,
            array:data.array
          })
        })

    }
    
    getDevice = () =>
    {
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          this.setState({
            sensorId:data.sensorId,
            sensorName:data.sensorName,
          })
        })

    }
  
}
  
export default App;
