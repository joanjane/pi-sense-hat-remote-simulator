"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserWebSocketFactory = browserWebSocketFactory;

function browserWebSocketFactory(uri, options) {
  return new WebSocket(uri, options);
}