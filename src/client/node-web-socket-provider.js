import WebSocket from 'ws';

export function nodeWebSocketFactory(uri, options) {
  return new WebSocket(uri, options);
}