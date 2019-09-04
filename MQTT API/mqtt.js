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

const client = mqtt.connect("mqtt://soldier.cloudmqtt.com:15615", {
  username: "qhwjeaqg", 
  password: "Y1rsufr-Ij8i"
});

client.on('connect', () => {
  client.subscribe('/#');
  console.log('connected');
});

client.on('message', (topic, message) => {
  console.log(`Received message on ${topic}: ${message}`);
});
