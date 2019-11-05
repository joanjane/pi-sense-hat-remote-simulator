"use strict";

var _remoteJoystick = require("../client/remote-joystick.js");

var _nodeWebSocketProvider = require("../client/node-web-socket-provider.js");

var env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  TARGET: process.argv[3] || process.env.REMOTE_DEVICE || 'test-web-client'
};
console.log("Running remote joystick listener. Connecting to ".concat(env.SERVER_URI, ", device ").concat(env.TARGET));
var joystick = new _remoteJoystick.RemoteJoystick(_nodeWebSocketProvider.nodeWebSocketFactory, env.SERVER_URI, env.TARGET);
joystick.connect();
joystick.on('press', function (direction) {
  console.log('Received press: ', direction);
});
joystick.on('hold', function (direction) {
  console.log('Received hold: ', direction);
});
joystick.on('release', function (direction) {
  console.log('Received release: ', direction);
});