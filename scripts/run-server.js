import { run } from '../src/server/index.js';

console.log(JSON.stringify(process.argv));

let port = process.argv[2] ? +process.argv[2] : process.env.WS_SERVER_PORT;
if (!port) {
  port = 8080;
}
run(port);
