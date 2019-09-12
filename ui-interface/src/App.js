import React, { Component, Fragment } from "react";
import { Devices, Events } from "./components";
import './App.css';
//const API_URL = "XXXX";
const MQTT_URL = 'http://127.0.0.1:5001';
// styling to follow

class App extends Component { 
  
  
  setState = {
    deviceId : undefined,
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
        fetch(`${MQTT_URL}/sensor-data`)
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
