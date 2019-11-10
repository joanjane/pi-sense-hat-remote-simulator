import WebSocket from 'ws';
import fs from 'fs';
import http from 'http';
import https from 'https';
import keypair from 'self-signed';

export function run(port, securePort) {
  port = port || 80;
  securePort = securePort || 443;

  createSslCerts();

  console.log(`Starting server on port ws://*:${port}  wss://*:${securePort}`);

  const wss = new WebSocket.Server({ noServer: true });
  broadcastWebsockets(wss);

  const httpServer = http.createServer(handleRequest);

  const httpsServer = https.createServer({
    key: fs.readFileSync('./dev-cert.key'),
    cert: fs.readFileSync('./dev-cert.cert')
  }, handleRequest);

  httpServer.on('upgrade', (request, socket, head) => upgrade(wss, request, socket, head));
  httpsServer.on('upgrade', (request, socket, head) => upgrade(wss, request, socket, head));

  httpServer.listen(port);
  httpsServer.listen(securePort);
};

function handleRequest(req, res) {
  console.log(`${req.method}: ${req.url}`);
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
      console.log(`[${new Date().toISOString()}] Message received\n`, msg);
      wss.clients.forEach(function each(client) {
        if (client !== wss && client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });
  });
}

function createSslCerts() {
  if (!fs.existsSync('dev-cert.key') || !fs.existsSync('dev-cert.cert')) {
    console.log('Generating self-signed certificate...');
    const certOptions = keypair({
      name: 'localhost',
      city: 'Test',
      state: 'Test',
      organization: 'Test',
      unit: 'Test'
    }, {
      alt: [
        { type: 2, value: 'localhost' },
        { type: 2, value: process.env.CNAME },
        { type: 7, ip: '127.0.0.1' }
      ],
      keySize: 2048,
      serial: '329485',
      pkcs7: true
    });
    fs.writeFileSync('dev-cert.key', certOptions.private, {
      encoding: 'utf-8'
    });
    fs.writeFileSync('dev-cert.cert', certOptions.cert, {
      encoding: 'utf-8'
    });
  }
}