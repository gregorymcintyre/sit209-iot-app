import React, { Component } from "react";
import PropTypes from "prop-types";


class Devices extends Component {
  
    
  setState = {
    data : [],
    deviceId : null,
    ts: null,
    loc: null,
    light: null,
    pressure: null,
    bouyancy: null


  }


  render = () => {
      console.log(this.props.devices)
      return (
        <div>
        <div> 
          <a>You are in the Device List Component</a>
          </div>
    <div>
      <React.Fragment>
       {this.props.ts && <p>Timestamp: {this.props.ts}</p>}
       {this.props.loc && <p>Location: {this.props.loc}</p>}
       {this.props.light && <p>Light: {this.props.light}</p>}
       {this.props.pressure && <p>Pressure: {this.props.pressure}</p>}
       {this.props.bouyancy && <p>bouyancy: {this.props.bouyancy}</p>}
        </React.Fragment>
    </div>
    </div>

    )
  }
}


export default Devices;
