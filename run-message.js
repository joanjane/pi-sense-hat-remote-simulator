const { RemoteDisplayClient } = require('./src/remote-display-client');
const client = new RemoteDisplayClient();
console.log('Starting...');
client.connect(() => {
    console.log('Sending pixel');
    client.setPixel(4, 4, '#aa55dd');
    console.log('Sent');
    process.exit(0);
})
