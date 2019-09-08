# KelpFarmControlDevice.ino
Kelp Farm Control Device


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

##Directions for use

- make sure `ip` reflects an appropriate ip address for the device
 `IPAddress ip(192, 168, 20, 7); ` 

<<<<<<< HEAD
- update 
```#define PUB_LOC "arduino_1/location"                          //
#define PUB_TIME "arduino_1/sensorData/time"                  // MTTQ topic for temperature [C]
#define PUB_TEMP "arduino_1/sensorData/temperature_celsius"   // MTTQ topic for temperature [C]
#define PUB_LIGHT "arduino_1/sensorData/light"                //
#define PUB_PRESSURE "arduino_1/sensorData/pressure"          //
#define PUB_BOUYANCY "arduino_1/sensorData/bouyancy"          //
=======
- update to reflect unique identifier for your control unit (eg. arduino_2)
>>>>>>> 0dd07d7ce39c84d69a0939757aceb684cb95774b

```#define PUB_LOC "arduino_1/location"
#define PUB_TIME "arduino_1/sensorData/time"
#define PUB_TEMP "arduino_1/sensorData/temperature_celsius"
#define PUB_LIGHT "arduino_1/sensorData/light"
#define PUB_PRESSURE "arduino_1/sensorData/pressure"
#define PUB_BOUYANCY "arduino_1/sensorData/bouyancy"

<<<<<<< HEAD
#define SUB_LED "arduino_1/led"                           // MTTQ topic for LED```

to reflect unique identifier for your control unit (eg. arduino_2)

=======
#define SUB_LED "arduino_1/led"```
>>>>>>> 0dd07d7ce39c84d69a0939757aceb684cb95774b
