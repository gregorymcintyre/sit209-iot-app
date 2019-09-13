/*
https://sanctuaries.noaa.gov/visit/ecosystems/kelpdesc.html

if (temp < 5 || light < 1){				//if its too cold or the light is too low
	if (pressure >= .2){				//and the pressure is low enough to move up
		bouyancy++;				//move up
	}else{
	//report no ideal conditions (GUI)		//send status alert
	}
}

if (temp > 20 || light > 1){				//if its too warm or the light is too much
	if (pressure <= 3){				//and the pressure is not too high to move down
		bouyancy--;				//move down
	}else{
	//report non ideal conditions (GUI)		//send status alert
	}
}
*/


const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/device');
const rand = require('random-int');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const client = mqtt.connect("mqtt://soldier.cloudmqtt.com:15615", {
  username: "qhwjeaqg", 
  password: "Y1rsufr-Ij8i"
});

const approved_devices = ['arduino_1','arduino_test'];
const app = express();
const port = 5001;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

client.on('connect', () => {
  client.subscribe('#');
  console.log('connected');
});

// Logging data to mongoDB

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message}`);
  var topic_split = topic.split("/");
  if (approved_devices.indexOf(topic_split[0]) >= 0) {
    if (topic_split[1] == 'sd') {
      const data = JSON.parse(message);
      Device.findOne({"deviceId": data.deviceId }, (err, device) => {
        if (err) {
          console.log(err)
        } else if (!device) {
          console.log("Creating new device...");
          const {deviceId} = data;
          const {ts, loc, li, pres, bouy} = data.sensorData;
          const sensorData = {ts, loc, li, pres, bouy};
          const newDevice = new Device({
            deviceId,
            sensorData
          });

          newDevice.save(err => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          const { sensorData } = device;
          const { ts, loc, li, pres, bouy } = data.sensorData;
        
          sensorData.push({ ts, loc, li, pres, bouy });
          device.sensorData = sensorData;
        
          device.save(err => {
            if (err) {
              console.log(err)
            }
          });
        }
      });
    } else {
      console.log("Unkown topic!");
    }
  } else {
    console.log("Device not approved!");
  }
});



// TEST MESSAGE CODE

app.put('/sensor-data', (req, res) => {
  const { deviceId } = req.body;
  const ts = new Date().getTime();
  const loc = "Brisbane";
  const light = rand(0, 50);
  const pressure = rand(0, 50);
  const bouyancy = rand(0, 50);
  sensorData = {ts, loc, light, pressure, bouyancy}
  const topic = `${deviceId}/sensorData`;
  const message = JSON.stringify({ deviceId, sensorData});
  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});