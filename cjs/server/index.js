"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function run(port) {
  console.log('Starting server on port ' + port);
  var wss = new _ws["default"].Server({
    port: port,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true,
      // Defaults to negotiated value.
      serverNoContextTakeover: true,
      // Defaults to negotiated value.
      serverMaxWindowBits: 10,
      // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10,
      // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.

    }
  }); // Listen for Web Socket connections.

  wss.on('connection', function (socket) {
    socket.on('message', function (msg) {
      console.log('A message was received!', msg);
      wss.clients.forEach(function each(client) {
        if (client !== wss && client.readyState === _ws["default"].OPEN) {
          client.send(msg);
        }
      });
    });
  });
}

;