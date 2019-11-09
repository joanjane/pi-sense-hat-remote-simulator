"use strict";

var _index = require("../server/index.js");

var port = process.argv[2] ? +process.argv[2] : process.env.WS_SERVER_PORT;
var securePort = process.argv[3] ? +process.argv[3] : process.env.WS_SERVER_SECURE_PORT;
(0, _index.run)(port, securePort);