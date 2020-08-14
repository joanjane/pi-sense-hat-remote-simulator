import { actionTypes } from './actions.js';
import { WsClient } from './ws-client.js';

export class RemoteEnvironmentSensors {
  constructor(webSocketFactory, serverUri, device) {
    this.client = new WsClient(webSocketFactory, serverUri);
    this.device = device;
    this.sensors = {
      temperature: 21,
      pressure: 1013,
      humidity: 20
    };
    this.subscriberId = `RemoteEnvironmentSensors${Date.now()}`;
  }

  connect(onConnect) {
    this.client.connect();

    this.client.onOpen(() => {
      this.client.onMessage((event) => {
        const payload = event;
        if (payload.type !== actionTypes.envSensorsUpdate || payload.device !== this.device) {
          return;
        }
        this.sensors = payload.status;
      }, this.subscriberId);

      onConnect && onConnect();
    }, this.subscriberId);
  }

  close() {
    this.client && this.client.close();
  }

  getSensorsStatus() {
    return Promise.resolve({ ...this.sensors });
  }
}