import { RemoteMotionSensors } from '../client/remote-motion.js';
import { RemoteEnvironmentSensors } from '../client/remote-environment.js';
import { nodeWebSocketFactory } from '../client/node-web-socket-provider.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.argv[3] || process.env.DEVICE || 'test-web-client'
};

console.log(`Running sensors listener. Connecting to ${env.SERVER_URI}, device ${env.DEVICE}`);

const motion = new RemoteMotionSensors(nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
const envSensors = new RemoteEnvironmentSensors(nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);

motion.connect();
envSensors.connect();

setInterval(() => {
  motion.getMotionStatus().then((status) => console.log('Fetching motion status', status));
  envSensors.getSensorsStatus().then((status) => console.log('Fetching env status', status));
}, 2000);