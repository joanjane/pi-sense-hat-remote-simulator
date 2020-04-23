import { RemoteDisplay } from '../client/remote-display.js';
import { nodeWebSocketFactory } from '../client/node-web-socket-provider.js';
import { flashTestSequence } from './flash-test-sequence.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  DEVICE: process.argv[3] || process.env.DEVICE || 'test-web-client'
};

const display = new RemoteDisplay(nodeWebSocketFactory, env.SERVER_URI, env.DEVICE);
flashTestSequence(display, () => process.exit(0));