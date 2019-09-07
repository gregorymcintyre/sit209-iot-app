import React, { Component } from "react";
import PropTypes from "prop-types";


class Events extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }


  render = () => {
      console.log(this.props.events)
      return (
    <div>
       {this.props.timestamp && <p>Timestamp: {this.props.sensorData.timestamp}</p>}
       {this.props.temperature && <p>Temperature: {this.props.sensorData.temperature}</p>}
       {this.props.light && <p>Light: {this.props.sensorData.light}</p>}
       {this.props.pressure && <p>Pressure: {this.props.sensorData.pressure} </p>}
       {this.props.boucyancyVolume && <p>BouyancyVolume: {this.props.sensorData.bouancyVolume} </p>}

    </div>

    )
  }
}



export default Events;
