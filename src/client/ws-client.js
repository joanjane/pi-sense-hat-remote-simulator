export class WsClient {
  constructor(webSocketFactory, serverUri) {
    this.webSocketFactory = webSocketFactory;
    this.serverUri = serverUri;
  }

  get readyState() {
    return this.ws.readyState;
  }

  connect() {
    this.ws = this.webSocketFactory(this.serverUri);
    return Promise.resolve();
  }
  
  close() {
    this.ws && this.ws.close();
    return this;
  }

  send(payload) {
    this.checkConnection();
    this.ws.send(JSON.stringify(payload));
    return this;
  }

  onOpen(callback) {
    this.checkConnection();
    this.ws.onopen = callback;
    return this;
  }

  onClose(callback) {
    this.checkConnection();
    this.ws.onclose = callback;

    return this;
  }

  onError(callback) {
    this.ws.onerror = callback;
    return this;
  }

  onMessage(callback) {
    this.checkConnection();
    this.ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      callback(payload);
    };
    return this;
  }

  checkConnection() {
    if (!this.ws) throw new Error('Websocket is not connected');
  }
}