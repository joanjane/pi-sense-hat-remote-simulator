"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _ws = _interopRequireDefault(require("ws"));

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _selfSigned = _interopRequireDefault(require("self-signed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function run(port, securePort) {
  port = port || 80;
  securePort = securePort || 443;
  createSslCerts();
  console.log("Starting server on port ws://*:".concat(port, "  wss://*:").concat(securePort));

  var httpsServer = _https["default"].createServer({
    key: _fs["default"].readFileSync('./dev-cert.key'),
    cert: _fs["default"].readFileSync('./dev-cert.cert')
  }, handleRequest);

  var httpServer = _http["default"].createServer(handleRequest);

  var ws = new _ws["default"].Server({
    server: httpServer
  });
  broadcastWebsockets(ws);
  var wss = new _ws["default"].Server({
    server: httpsServer
  });
  broadcastWebsockets(wss);
  httpServer.listen(port);
  httpsServer.listen(securePort);
}

;

function handleRequest() {
  return function (req, res) {
    console.log("".concat(req.method, ": ").concat(req.url));
    res.write('/');
    res.end();
  };
}

function broadcastWebsockets(wss) {
  wss.on('connection', function (socket) {
    socket.on('message', function (msg) {
      console.log("[".concat(new Date().toISOString(), "] Message received"), msg);
      wss.clients.forEach(function each(client) {
        if (client !== wss && client.readyState === _ws["default"].OPEN) {
          client.send(msg);
        }
      });
    });
  });
}

function createSslCerts() {
  if (!_fs["default"].existsSync('dev-cert.key') || !_fs["default"].existsSync('dev-cert.cert')) {
    console.log('Generating self-signed certificate...');
    var certOptions = (0, _selfSigned["default"])({
      name: 'localhost',
      city: 'Test',
      state: 'Test',
      organization: 'Test',
      unit: 'Test'
    }, {
      alt: [{
        type: 2,
        value: 'localhost'
      }, {
        type: 2,
        value: process.env.CNAME
      }, {
        type: 7,
        ip: '127.0.0.1'
      }],
      keySize: 2048,
      serial: '329485',
      pkcs7: true
    });

    _fs["default"].writeFileSync('dev-cert.key', certOptions["private"], {
      encoding: 'utf-8'
    });

    _fs["default"].writeFileSync('dev-cert.cert', certOptions.cert, {
      encoding: 'utf-8'
    });
  }
}