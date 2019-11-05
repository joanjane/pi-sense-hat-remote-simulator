import { RemoteDisplayClient } from '../client/remote-display-client.js';
import { nodeWebSocketFactory } from '../client/node-web-socket-provider.js';

const env = {
  SERVER_URI: process.argv[2] || process.env.SERVER_URI || 'ws://localhost:8080',
  TARGET: process.argv[3] || process.env.TARGET || 'test-web-client'
};

const client = new RemoteDisplayClient(nodeWebSocketFactory, env.SERVER_URI, env.TARGET);

const sequence = [
  () => { client.setPixel(2, 6, '#aa55dd') },
  () => { client.setPixel('*', '*', '#2255dd') },
  () => { client.clear() },
  () => { client.setPixel('*', 4, '#bb44ee') },
  () => { client.setPixel(3, '*', '#ff00ff') },
  () => { client.showMessage(`This is a test message ${Date.now()}`, 0, '#bbaa00') },
  () => { console.log('Finished'), process.exit(0) },
];

console.log('Starting...');
client.connect(() => {
  console.log('Sending sequence...');
  runSequence(sequence);
});

function runSequence(seq) {
  if (seq.length === 0) return;
  const [first, ...rest] = seq;
  first();

  setTimeout(() => {
    runSequence(rest);
  }, 5000);
}
