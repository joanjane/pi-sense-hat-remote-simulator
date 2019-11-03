import { RemoteDisplayClient } from '../src/client/remote-display-client.js';
import { nodeWebSocketFactory } from '../src/client/node-web-socket-provider.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  TARGET: process.argv[3] || process.env.TARGET || 'test-web-client'
};

const client = new RemoteDisplayClient(nodeWebSocketFactory, env.SERVER_URI, env.TARGET);

console.log('Starting...');
client.connect(() => {
  console.log('Sending pixel');
  client.setPixel(4, 4, '#aa55dd');
  console.log('Sending message');
  client.showMessage(`This is a test message ${Date.now()}`, 0, '#bbaa00');
  console.log('Sent');
  setTimeout(() => {
    // wait 5 seconds to finish sending message
    process.exit(0);
  }, 5000);
})
