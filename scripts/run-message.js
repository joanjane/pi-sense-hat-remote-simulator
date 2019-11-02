const env = require('../env');
const { RemoteDisplayClient } = require('../src/client/remote-display-client');

const client = new RemoteDisplayClient(env.SERVER_URI, env.TARGET);

console.log('Starting...');
client.connect(() => {
  console.log('Sending pixel');
  client.setPixel(4, 4, '#aa55dd');
  client.showMessage('This is a test message', 0, '#bbaa00');
  console.log('Sent');
  process.exit(0);
})
