const { WsClient } = require('./ws-client');
const { displayMatrixAction, displayMessageAction } = require('./actions');

module.exports.RemoteDisplayClient = class RemoteDisplayClient {
  constructor(serverUri, target) {
    this.client = new WsClient(serverUri);
    this.target = target;
    this.display = empty();
  }

  connect(onConnect) {
    this.client
      .connect()
      .onOpen(onConnect);
  }

  showMessage(message, speed, color, done) {
    this.sendMessage(message, speed, color);
    done && done();
  }

  setPixel(x, y, color) {
    this.display[y][x] = typeof color === 'string' ? color : rgbToHex(color);
    this.sendMatrix();
  }

  clear() {
    this.display = empty();
    this.sendMatrix();
  }

  sendMatrix() {
    this.client.send(
      displayMatrixAction(this.target, this.display));
  }

  sendMessage(message, speed, color) {
    this.client.send(
      displayMessageAction(this.target, message, speed, color));
  }
}


function rgbToHex(r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const O = '#000000';
const empty = () => [
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O]
];