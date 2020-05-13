# PI Sense Hat Remote simulator
The goal of this project is to create a web PI SenseHat simulator to speed up development and testing.
Online simulator: https://joanjane.github.io/pi-sense-hat-remote-simulator/

## Architecture
This project has 3 parts:
* Web Socket Server to allow communication between apps and web simulator.
* Web Simulator to display the LED matrix and also to simulate sensors (enviromental and motion).
* Client library to build applications. The client library has the same interface as my other package [pi-sense-hat-library](https://github.com/joanjane/pi-sense-hat-library) to allow swapping simulation and production modes easily.

## Development
* You can launch the server with `npm run ws-serve` or run it with docker with `run-server-docker.ps1`
* You can launch the web simulator with `npm start` and opening http://localhost:3000 into a browser.

You can use online version of the client if you deploy server with a valid TLS certificate and a secure connection with `wss://`. Otherwise, you can install a self signed cert generated on to use localhost server, already generated as dev-cert.cert and dev-cert.key when server is launched.

## Client library
The client library is built with ESM modules and is also distributed as "classic" CommonJS modules for compatibility.
There are 4 modules available:

* RemoteDisplay (led matrix, messaging display)
* RemoteJoystick (joystick)
* RemoteEnvironmentSensors (temperature, humidity, pressure)
* RemoteMotionSensors (acceleromenter, gyroscope, orientation, compass)

```js
    // setup using CommonJS modules
    const { 
        RemoteDisplay, 
        RemoteJoystick, 
        RemoteEnvironmentSensors, 
        RemoteMotionSensors
    } = require('pi-sense-hat-remote-simulator/cjs/client');
    
    const { nodeWebSocketFactory } = require('pi-sense-hat-remote-simulator/cjs/client/node-web-socket-provider');
    const display = new RemoteDisplay(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const joystick = new RemoteJoystick(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const environmentSensors = new RemoteEnvironmentSensors(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const motionSensors = new RemoteMotionSensors(nodeWebSocketFactory, SERVER_URI, DEVICE);

    // setup using ESM modules
    import { 
        RemoteDisplay, 
        RemoteJoystick, 
        RemoteEnvironmentSensors, 
        RemoteMotionSensors
    } from 'pi-sense-hat-remote-simulator/client';
    import { nodeWebSocketFactory } from 'pi-sense-hat-remote-simulator/client/node-web-socket-provider';
    const display = new RemoteDisplay(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const joystick = new RemoteJoystick(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const environmentSensors = new RemoteEnvironmentSensors(nodeWebSocketFactory, SERVER_URI, DEVICE);
    const motionSensors = new RemoteMotionSensors(nodeWebSocketFactory, SERVER_URI, DEVICE);

```

## Web simulator
* Joystick
    Keyboard is mapped to send joystick events using this keys:
    - ArrowLeft => left
    - ArrowUp => up
    - ArrowRight => right
    - ArrowDown => down
    - Enter => click
* Display.    
* Environmental sensors. Use temperature, humidity and pressure sliders to simulate values.
* Motion sensors. Use xyz sliders on accelerometer, gyroscope, orientation and compass to simulate values.
    
## Samples
* [pi-sense-hat-library-sample](https://github.com/joanjane/pi-sense-hat-library-sample) Sample application that uses all features from this library
* [pi-sense-hat-weather-forecast](https://github.com/joanjane/pi-sense-hat-weather-forecast)
See a simple weather forecast application.
