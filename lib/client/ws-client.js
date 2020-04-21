export class WsClient {
  constructor(webSocketFactory, serverUri) {
    this.webSocketFactory = webSocketFactory;
    this.serverUri = serverUri;
  }

  get readyState() {
    return this.ws.readyState;
  }

  get isOpen() {
    return this.ws.readyState === 1;
  }

  connect() {
    this.ws = this.webSocketFactory(this.serverUri);
    
    this.onOpenSubscribers = new Map();
    this.onCloseSubscribers = new Map();
    this.onMessageSubscribers = new Map();
    this.onErrorSubscribers = new Map();
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

  onOpen(callback, suscriberId) {
    this.checkConnection();
    this.onOpenSubscribers.set(suscriberId, callback);
    if (this.isOpen) {
      callback();
    }
    if (!this.ws.onopen) {
      this.ws.onopen = (e) => {
        Array.from(this.onOpenSubscribers).map(v => v[1]).forEach(c => c(e));
      };
    }

    return this;
  }

  onClose(callback, suscriberId) {
    this.checkConnection();
    this.onCloseSubscribers.set(suscriberId, callback);

    if (!this.ws.onclose) {
      this.ws.onclose = (e) => {
        Array.from(this.onCloseSubscribers).map(v => v[1]).forEach(c => c(e));
      };
    }

    return this;
  }

  onError(callback, suscriberId) {
    this.checkConnection();
    this.onErrorSubscribers.set(suscriberId, callback);
    
    if (!this.ws.onerror) {
      this.ws.onerror = (e) => {
        Array.from(this.onErrorSubscribers).map(v => v[1]).forEach(c => c(e));
      };
    }

    return this;
  }

  onMessage(callback, suscriberId) {
    this.checkConnection();
    this.onMessageSubscribers.set(suscriberId, callback);
    
    if (!this.ws.onmessage) {
      this.ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        Array.from(this.onMessageSubscribers).map(v => v[1]).forEach(c => c(payload));
      };
    }

    return this;
  }

  unsubscribeAll(suscriberId) {
    this.onOpenSubscribers.has(suscriberId) ? this.onOpenSubscribers.delete(suscriberId) : null;
    this.onCloseSubscribers.has(suscriberId) ? this.onCloseSubscribers.delete(suscriberId) : null;
    this.onErrorSubscribers.has(suscriberId) ? this.onErrorSubscribers.delete(suscriberId) : null;
    this.onMessageSubscribers.has(suscriberId) ? this.onMessageSubscribers.delete(suscriberId) : null;
  }

  checkConnection() {
    if (!this.ws) throw new Error('Websocket is not connected');
  }
}