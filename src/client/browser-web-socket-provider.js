export function browserWebSocketFactory(uri, options) {
  return new WebSocket(uri, options);
}