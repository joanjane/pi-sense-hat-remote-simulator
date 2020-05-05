import { RemoteJoystick } from '../client/remote-joystick.js';
import { nodeWebSocketFactory } from '../client/node-web-socket-provider.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.argv[3] || process.env.DEVICE || 'test-web-client'
};

console.log(`Running remote joystick listener. Connecting to ${env.SERVER_URI}, device ${env.DEVICE}`);

const joystick = new RemoteJoystick(nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
joystick.connect();
joystick.on('press', (direction) => {
  console.log('Received press: ', direction);
});

joystick.on('hold', (direction) => {
  console.log('Received hold: ', direction);
});

joystick.on('release', (direction) => {
  console.log('Received release: ', direction);
});