"use strict";

var _remoteDisplay = require("../client/remote-display.js");

var _nodeWebSocketProvider = require("../client/node-web-socket-provider.js");

var _flashTestSequence = require("./flash-test-sequence.js");

var env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.argv[3] || process.env.DEVICE || 'test-web-client'
};
var display = new _remoteDisplay.RemoteDisplay(_nodeWebSocketProvider.nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
(0, _flashTestSequence.flashTestSequence)(display, function () {
  return process.exit(0);
});