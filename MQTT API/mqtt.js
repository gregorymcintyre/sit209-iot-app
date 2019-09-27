const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Device = require('./models/device');
const rand = require('random-int');

// Process environmenal values
function processSensorData(input) {
  const {li, pres, temp} = input.sensorData;
  
  if (temp < 5 || li < 1) {   // If it is too cold or the light is too low.
    if (pres >= .2) {   // And the pressure is low enough to move up.
      // Send command to move up.
    } else {
      // Report no ideal conditions to GUI.
    }
  }
  
  if (temp > 20 || li > 1) {   // If it is too warm or the light is too much.
    if (pres <= 3) {   // And the pressure is not too high to move down.
      // Send command to move down.
    } else {
      // Report non ideal conditions to GUI.
    }
  }
}

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const client = mqtt.connect("mqtt://soldier.cloudmqtt.com:15615", {
  username: "qhwjeaqg", 
  password: "Y1rsufr-Ij8i"
});

const approved_devices = ['arduino_1', 'arduino_test'];
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
  var topic_split = topic.split("/");
  if (approved_devices.indexOf(topic_split[0]) >= 0) {
    if (topic_split[1] == 'sd') {
      console.log(`Received message on ${topic}: ${message}`);
      const data = JSON.parse(message);
      processSensorData(data);
      Device.findOne({"deviceId": data.deviceId }, (err, device) => {
        if (err) {
          console.log(err)
        } else if (!device) {
          console.log("Creating new device...");
          const {deviceId} = data;
          const {ts, temp, li, pres, bouy} = data.sensorData;
          const sensorData = {ts, temp, li, pres, bouy};
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
          const { ts, temp, li, pres, bouy } = data.sensorData;
        
          sensorData.push({ ts, temp, li, pres, bouy });
          device.sensorData = sensorData;
        
          device.save(err => {
            if (err) {
              console.log(err)
            }
          });
        }
      });
    }
  }
});

// TEST MESSAGE CODE
app.put('/sensor-data', (req, res) => {
  const { deviceId } = req.body;
  const ts = new Date().getTime();
  const temp = 23;
  const li = rand(0, 50);
  const pres = rand(0, 50);
  const bouy = rand(0, 50);
  sensorData = {ts, temp, li, pres, bouy}
  const topic = `${deviceId}/sd`;
  const message = JSON.stringify({ deviceId, sensorData});
  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});