const { isBrowser } = require('./browser-detection');

let WebSocketImplementation = null;
if (isBrowser) {
  WebSocketImplementation = WebSocket;
} else {
  WebSocketImplementation = require('ws');
}

module.exports = WebSocketImplementation;