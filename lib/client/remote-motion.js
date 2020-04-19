import { actionTypes } from './actions';

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
      });

      onConnect && onConnect();
    });
  }

  close() {
    this.client && this.client.close();
  }

  getMotionStatus() {
    return Promise.resolve(this.motion);
  }
}