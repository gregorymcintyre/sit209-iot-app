import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


class Events extends Component {
  constructor(props) {
    super(props);

    this.onChangeTemperature = this.onChangeTemperature.bind(this);
    this.onChangeLight = this.onChangeLight.bind(this);
    this.onChangePressure= this.onChangePressure.bind(this);
    this.onChangeBouyancy= this.onChangeBouyancy.bind(this);
    this.onChangeDate= this.onChangeDate.bind(this);

    this.state = { 
        temperature :'',
        light : '',
        date : new Date(),
        deviceId :'',
        bouyancy : '',
        pressure : '',
        
     }
     // add now state
  }

  

  componentDidMount() {
    this.setState({
      temperature: '27.00',
      light: '5.00',
      deviceId: '274452',
      date: new Date(),
      pressure : '1.00',
      bouyancy: '1.10'

    })
  }

    onChangeTemperature(e) {
      this.setState({
        temperature: e.target.value
      });
    }


    onChangeLight(e) {
      this.setState({
        light: e.target.value
      });
    }

    onChangeDeviceId(e) {
      this.setState({
        deviceId: e.target.value
      });
    }

    onChangeDate(date) {
      this.setState({
        date: date
      });
    }

    onChangePressure(e) {
      this.setState({
        pressure: e.target.value
      });
    }

    onChangeBouyancy(e) {
      this.setState({
        bouyancy: e.target.value
      });
    }

    onSubmit(e) {
      e.preventDefault();

      const event = {
        temperature: this.state.temperature,
        light: this.state.light,
        deviceId: this.state.deviceId,
        date: this.state.date,
        pressure: this.state.pressure,
        bouyancy: this.state.bouyancy
      }

      console.log(event);
      axios.post('http://localhost:5001/')
        .then(function (response){

          this.setState({
              deviceId: response.data.deviceId,
          });
        })
      
      window.location = '/';

    }



  render = () => {
      console.log(this.props.events)
      const styling = {
          fontSize : '15px',
          textAlign: 'left',
      };

      return (
  
          
   <div className="App-content">
           <div className="container-1">
            <div style= {{'width':'300px'}}>
            <h1 style ={styling}>Device ID : {this.state.deviceId} </h1>{"\n"}
            <h1 style ={styling}>Light : {this.state.light} lux </h1>{"\n"}

            <h1 style ={styling}>Temperature : {this.state.temperature} degrees </h1>
            <h1 style ={styling}>Pressure : {this.state.pressure} </h1>
            <h1 style ={styling}>Bouyancy : {this.state.bouyancy} </h1>
            </div>

    </div>
    <div className='lightDashboard'>
    <h1 style ={styling}>Light </h1>{"\n"}
    <h1 style={styling} >{this.state.light}</h1>
   

    </div>
    </div>

    )
  }
}



export default Events;
