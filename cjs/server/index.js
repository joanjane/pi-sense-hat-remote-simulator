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
  var wss = new _ws["default"].Server({
    noServer: true
  });
  broadcastWebsockets(wss);

  var httpServer = _http["default"].createServer(handleRequest);

  var httpsServer = _https["default"].createServer({
    key: _fs["default"].readFileSync('./dev-cert.key'),
    cert: _fs["default"].readFileSync('./dev-cert.cert')
  }, handleRequest);

  httpServer.on('upgrade', function (request, socket, head) {
    return upgrade(wss, request, socket, head);
  });
  httpsServer.on('upgrade', function (request, socket, head) {
    return upgrade(wss, request, socket, head);
  });
  httpServer.listen(port);
  httpsServer.listen(securePort);
}

;

function handleRequest(req, res) {
  console.log("".concat(req.method, ": ").concat(req.url));
  res.write(req.url);
  res.end();
}

function upgrade(wss, request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
}

function broadcastWebsockets(wss) {
  wss.on('connection', function (socket) {
    socket.on('message', function (msg) {
      console.log("[".concat(new Date().toISOString(), "] Message received\n"), msg);
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