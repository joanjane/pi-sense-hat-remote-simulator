import { RemoteDisplayClient } from '../client/remote-display-client.js';
import { nodeWebSocketFactory } from '../client/node-web-socket-provider.js';
import { flashTestSequence } from './flash-test-sequence.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  TARGET: process.argv[3] || process.env.TARGET || 'test-web-client'
};

const display = new RemoteDisplayClient(nodeWebSocketFactory, env.SERVER_URI, env.TARGET);
flashTestSequence(display, () => process.exit(0));