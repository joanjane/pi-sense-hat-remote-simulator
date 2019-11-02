const env = require('../env');
const { RemoteDisplayClient } = require('../src/client/remote-display-client');

const client = new RemoteDisplayClient(env.SERVER_URI, env.TARGET);

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
