const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://soldier.cloudmqtt.com:15615", {
  username: "qhwjeaqg", 
  password: "Y1rsufr-Ij8i"
});

client.on('connect', () => {
  client.subscribe('#');
  console.log('connected');
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message}`);
});