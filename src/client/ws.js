const { isBrowser } = require('./browser-detection');

class BrowserWebSocket {
  constructor(serverUri) {
    this.ws = new WebSocket(serverUri);
  }

  on(event, callback) {
    if (event === 'open') {
      return this.ws.onopen = callback;
    } else if (event === 'message') {
      return this.ws.onmessage = (message) => callback(message.data);
    }
  }

  send(data) {
    return this.ws.send(data);
  }
}

let WebSocketImplementation = null;
if (isBrowser) {
  WebSocketImplementation = BrowserWebSocket;
} else {
  WebSocketImplementation = require('ws');
}

module.exports = WebSocketImplementation;