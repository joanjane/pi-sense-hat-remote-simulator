"use strict";

var _remoteDisplayClient = require("../client/remote-display-client.js");

var _nodeWebSocketProvider = require("../client/node-web-socket-provider.js");

var _flashTestSequence = require("./flash-test-sequence.js");

var env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  TARGET: process.argv[3] || process.env.TARGET || 'test-web-client'
};
var display = new _remoteDisplayClient.RemoteDisplayClient(_nodeWebSocketProvider.nodeWebSocketFactory, env.SERVER_URI, env.TARGET);
(0, _flashTestSequence.flashTestSequence)(display, function () {
  return process.exit(0);
});