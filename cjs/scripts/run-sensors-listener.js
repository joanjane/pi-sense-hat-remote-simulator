"use strict";

var _remoteMotion = require("../client/remote-motion.js");

var _remoteEnvironment = require("../client/remote-environment.js");

var _nodeWebSocketProvider = require("../client/node-web-socket-provider.js");

var env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.argv[3] || process.env.DEVICE || 'test-web-client'
};
console.log("Running sensors listener. Connecting to ".concat(env.SERVER_URI, ", device ").concat(env.DEVICE));
var motion = new _remoteMotion.RemoteMotionSensors(_nodeWebSocketProvider.nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
var envSensors = new _remoteEnvironment.RemoteEnvironmentSensors(_nodeWebSocketProvider.nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
motion.connect();
envSensors.connect();
setInterval(function () {
  motion.getMotionStatus().then(function (status) {
    return console.log('Fetching motion status', status);
  });
  envSensors.getSensorsStatus().then(function (status) {
    return console.log('Fetching env status', status);
  });
}, 2000);