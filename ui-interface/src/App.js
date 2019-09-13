import React, { Component, Fragment } from "react";
import { Devices, Events } from "./components";
import './App.css';
//const API_URL = "XXXX";
const MQTT_URL = 'http://127.0.0.1:5001';
// styling to follow

class App extends Component { 
  
  
  setState = {
    deviceId : undefined,
    ts: undefined,
    loc: undefined,
    light: undefined,
    pressure: undefined,
    bouyancy: undefined


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
              deviceId= {this.setState.deviceId}/>
              <Events
              deviceId= {this.setState.deviceArray}
              loc=  {this.setState.loc}
              light= {this.setState.light}
              pressure = {this.setState.pressure}
              bouyancy = {this.setState.bouyancy}
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
            deviceId:data.deviceId,
            ts:data.sensorData.ts,
            loc:data.sensorData.loc,
            light:data.ensorData.light,
            pressure:data.sensorData.pressure,
            bouyancy:data.sensorData.bouyancy,
          })
        })

    }
    
    getDevice = () =>
    {
        fetch(`${MQTT_URL}/sensor-data`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            deviceId:data.deviceId
          })
        })

    }
       
  

  
}
  
export default App;
