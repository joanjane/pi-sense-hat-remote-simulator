const env = require('../env');
const { run } = require('../src/server');
run(env.WS_SERVER_PORT);
