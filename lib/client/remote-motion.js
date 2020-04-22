import { actionTypes } from './actions';
import { WsClient } from './ws-client.js';

export class RemoteMotionSensors {
  constructor(webSocketFactory, serverUri, target) {
    this.client = new WsClient(webSocketFactory, serverUri);
    this.target = target;
    this.motion = {
      acceleration: [0, 0, 0],
      gyroscope: [0, 0, 0],
      orientation: [0, 0, 0],
      compass: 0
    };
    this.subscriberId = `RemoteMotionSensors${Date.now()}`;
  }

  connect(onConnect) {
    this.client.connect();

    this.client.onOpen(() => {
      this.client.onMessage((event) => {
        const payload = event;
        if (payload.type !== actionTypes.motionUpdate || payload.source !== this.remoteDeviceId) {
          return;
        }
        this.motion = payload.status;
      }, this.subscriberId);

      onConnect && onConnect();
    }, this.subscriberId);
  }

  close() {
    this.client && this.client.close();
  }

  getMotionStatus() {
    return Promise.resolve(this.motion);
  }
}