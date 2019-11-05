"use strict";

var _index = require("../server/index.js");

var port = process.argv[2] ? +process.argv[2] : process.env.WS_SERVER_PORT;

if (!port) {
  port = 8080;
}

(0, _index.run)(port);