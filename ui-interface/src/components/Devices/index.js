import React, { Component } from "react";
import PropTypes from "prop-types";


class Devices extends Component {
  

  render = () => {
      console.log(this.props.devices)
      return (
    <div>
       {this.props.sensorData && <p>Timestamp: {this.props.sensorData.timestamp}</p>}
       {this.props.sensorName && <p>Name: {this.props.sensorData.sensorName}</p>}
        
    </div>

    )
  }
}


export default Devices;
