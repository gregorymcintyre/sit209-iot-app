/*------------------------------------------------------------------------------ 
Program:      KelpFarmControlDevice

Description:  Basic MQTT node using Arduino Uno

Hardware:     Arduino Uno R3, Ethernet Shield (W5100), DHT11.

Software:     Developed using Arduino 1.8.5 IDE

Libraries:    -PubSubClient
              -SPI
              -Ethernet
              -DHT
              
Date:         2/9/2019

Author:       Greg McIntyre
------------------------------------------------------------------------------*/

#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
#include <DHT.h>

#define ARDUINO_CLIENT_ID "arduino_1"                         // Client ID for Arduino pub/sub

#define PUB_SENSORDATA "arduino_1/sensorData"                         // Client ID for Arduino pub/sub
#define PUB_LOC "arduino_1/location"                          // MTTQ topic for location (string)
#define PUB_TIME "arduino_1/sensorData/time"                  // MTTQ topic for time
#define PUB_TEMP "arduino_1/sensorData/temperature_celsius"   // MTTQ topic for temperature [C]
#define PUB_LIGHT "arduino_1/sensorData/light"                // MTTQ topic for light
#define PUB_PRESSURE "arduino_1/sensorData/pressure"          // MTTQ topic for pressure [atm]
#define PUB_BOUYANCY "arduino_1/sensorData/bouyancy"          // MTTQ topic for bouyancy


#define SUB_LED "arduino_1/led"                           // MTTQ topic for LED
#define PUBLISH_DELAY 3000                                // Publishing delay [ms]

#define SERVER "soldier.cloudmqtt.com"                    //Kelp the World MQTT server details
#define PORT 15615
#define USERNAME "qhwjeaqg"
#define PASSWORD "Y1rsufr-Ij8i"

//mqtt subscribe -h soldier.cloudmqtt.com -p 15615 -u qhwjeaqg -P Y1rsufr-Ij8i -t /arduino_1/#

// Hardware setup details
const int ledPin = 3;
const int sensorPin = 5;
const int sensorType = DHT11;

// Networking details
byte mac[]    = {  0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02 };  // Ethernet shield (W5100) MAC address
IPAddress ip(192, 168, 20, 7);                           // Ethernet shield (W5100) IP address

DHT dht(sensorPin, sensorType);
EthernetClient ethClient;
PubSubClient client(ethClient);

long previousMillis;

void setup()
{
  Serial.begin(9600);

  // LED off
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  // MTTQ parameters
  //client.setServer(server, 1883);
  client.setServer(SERVER, PORT);
  client.setCallback(callback);

  // Ethernet shield configuration
  Ethernet.begin(mac, ip);

  delay(1500); // Allow hardware to stabilize

  previousMillis = millis();
}

void loop()
{

  float timeStamp = 1.0;   //
  
  if (!client.connected())
    reconnect();

  if (millis() - previousMillis > PUBLISH_DELAY)
  {
    previousMillis = millis();
    
    
    char loc[] = "Brisbane";          //
    float tempC = 21;                 // temperature [C]
    float light = 5;                  // 
    float pressure = 1.0;             // 
    float bouyancy = 1.1;             // 

    char tmpBuffer[20];

    // check if any reads failed and exit early (to try again).
    if (isnan(light) || isnan(tempC))
    {
      Serial.println("error reading sensor data");
      return;
    }
    else
    {
      //client.publish(PUB_LOC , loc);
      //client.publish(PUB_TIME , dtostrf(timeStamp, 6, 2, tmpBuffer));
      //client.publish(PUB_TEMP, dtostrf(tempC, 6, 2, tmpBuffer));
      //client.publish(PUB_LIGHT , dtostrf(light, 6, 2, tmpBuffer));            
      //client.publish(PUB_PRESSURE , dtostrf(pressure, 6, 2, tmpBuffer));
      //client.publish(PUB_BOUYANCY , dtostrf(bouyancy, 6, 2, tmpBuffer));

      
      //client.publish(ARDUINO_CLIENT_ID ,  "ARDUINO_CLIENT_ID" );
	    //client.publish(ARDUINO_CLIENT_ID ,  "{\"deviceId\":\"arduino_1\",\"sensorData\":{\"ts\":1568330529936,\"loc\":\"Brisbane\",\"light\":23,\"pressure\":8,\"bouyancy\":50}}" );
      client.publish(PUB_SENSORDATA ,  "{\"deviceId\":\"arduino_1\",\"sensorData\":{\"ts\":1568330529936,\"loc\":\"Brisbane\",\"li\":23,\"pres\":8,\"bouy\":\"50}}");
	  

      timeStamp++;
      Serial.println("data sent");

    }
  }

  client.loop();
}

void reconnect()
{
  // Loop until reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection ... ");
    // Attempt to connect
    if (client.connect(ARDUINO_CLIENT_ID, USERNAME, PASSWORD)) {
      Serial.println("connected");
      // (re)subscribe
      //client.subscribe(SUB_LED);
    } else {
      Serial.print("Connection failed, state: ");
      Serial.print(client.state());
      Serial.println(", retrying in 5 seconds");
      delay(5000); // Wait 5 seconds before retrying
    }
  }
}

// sub callback function
void callback(char* topic, byte* payload, unsigned int length)
{
  Serial.print("[sub: ");
  Serial.print(topic);
  Serial.print("] ");
  char message[length + 1] = "";
  for (int i = 0; i < length; i++)
    message[i] = (char)payload[i];
  message[length] = '\0';
  Serial.println(message);

  // SUB_LED topic section
  if (strcmp(topic, SUB_LED) == 0)
  {
    if (strcmp(message, "on") == 0)
      digitalWrite(ledPin, HIGH);
    if (strcmp(message, "off") == 0)
      digitalWrite(ledPin, LOW);
  }
}
