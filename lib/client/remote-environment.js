import { actionTypes } from './actions.js';
import { WsClient } from './ws-client.js';

export class RemoteEnvironmentSensors {
  constructor(webSocketFactory, serverUri, target) {
    this.client = new WsClient(webSocketFactory, serverUri);
    this.target = target;
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
        if (payload.type !== actionTypes.envSensorsUpdate || payload.source !== this.remoteDeviceId) {
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

  getSensorStatus() {
    return Promise.resolve(this.sensors);
  }
}