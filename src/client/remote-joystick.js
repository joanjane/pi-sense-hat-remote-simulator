import { actionTypes } from './actions.js';
import { WsClient } from './ws-client.js';

export class RemoteJoystick {
  constructor(webSocketFactory, serverUri, remoteDeviceId) {
    this.remoteDeviceId = remoteDeviceId;
    this.client = new WsClient(webSocketFactory, serverUri);
    this.onPressListeners = [];
    this.onReleaseListeners = [];
    this.onHoldListeners = [];
  }

  connect() {
    this.client.connect();

    this.client.onOpen(() => {
      this.client.onMessage((event) => {
        const payload = event;
        if (payload.type !== actionTypes.keyPress || payload.source !== this.remoteDeviceId) {
          return;
        }

        switch (payload.event) {
          case 'press':
            this.onPressListeners.forEach(callback => callback(payload.key));
            break;
          case 'hold':
            this.onHoldListeners.forEach(callback => callback(payload.key));
            break;
          case 'release':
            this.onReleaseListeners.forEach(callback => callback(payload.key));
            break;
        }
      });
    });
  }

  close() {
    this.client && this.client.close();
    this.onPressListeners = [];
    this.onHoldListeners = [];
    this.onReleaseListeners = [];
  }

  on(event, callback) {
    switch (event) {
      case 'press':
        this.onPressListeners.push(callback);
        break;
      case 'hold':
        this.onHoldListeners.push(callback);
        break;
      case 'release':
        this.onReleaseListeners.push(callback);
        break;
      default:
        throw new Error(`${event} event is not valid. Try with press, hold and release.`);
    }
  }
}