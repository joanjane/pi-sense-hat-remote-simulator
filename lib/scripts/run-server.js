import { run } from '../server/index.js';

let port = process.argv[2] ? +process.argv[2] : process.env.WS_SERVER_PORT;
let securePort = process.argv[3] ? +process.argv[3] : process.env.WS_SERVER_SECURE_PORT;
run(port, securePort);
