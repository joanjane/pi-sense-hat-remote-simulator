import { actionTypes } from './actions.js';
import { WsClient } from './ws-client.js';

export class EnvironmentSensors {
  constructor(webSocketFactory, serverUri, target) {
    this.client = new WsClient(webSocketFactory, serverUri);
    this.target = target;
    this.sensors = {
      temperature: 0,
      pressure: 0,
      humidity: 0
    };
  }

  connect(onConnect) {
    this.client.connect();

    this.client.onOpen(() => {
      this.client.onMessage((event) => {
        const payload = event;
        if (payload.type !== actionTypes.envSensorsUpdate || payload.source !== this.remoteDeviceId) {
          return;
        }
        this.sensors = payload.status;
      });

      onConnect && onConnect();
    });
  }

  close() {
    this.client && this.client.close();
  }

  getSensorStatus() {
    return Promise.resolve(this.sensors);
  }
}