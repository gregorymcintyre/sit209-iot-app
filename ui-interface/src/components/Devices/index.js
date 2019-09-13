import React, { Component } from "react";
import PropTypes from "prop-types";


class Devices extends Component {
  

  render = () => {
      console.log(this.props.devices)
      return (
    <div>
       {this.props.ts && <p>Timestamp: {this.props.ts}</p>}
       {this.props.loc && <p>Location: {this.props.loc}</p>}
       {this.props.light && <p>Light: {this.props.light}</p>}
       {this.props.pressure && <p>Pressure: {this.props.pressure}</p>}
       {this.props.bouyancy && <p>bouyancy: {this.props.bouyancy}</p>}
        
    </div>

    )
  }
}


export default Devices;
