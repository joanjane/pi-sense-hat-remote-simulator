import { WsClient } from './ws-client.js';
import { displayMatrixAction, displayMessageAction } from './actions.js';

export class RemoteDisplay {
  constructor(webSocketFactory, serverUri, device) {
    this.client = new WsClient(webSocketFactory, serverUri);
    this.device = device;
    this.display = empty();
    this.displaySize = { x: 8, y: 8 };
    this.subscriberId = `RemoteDisplay${Date.now()}`;
  }

  connect(onConnect) {
    this.client.connect();
    this.client.onOpen(onConnect, this.subscriberId);
  }

  close() {
    this.client && this.client.close();
  }

  showMessage(message, speed, color, background) {
    this.client.send(displayMessageAction(this.device, message, speed, color, background || '#000000'));
    return new Promise(resolve => {
      setTimeout(resolve, speed * 1000);
    });
  }

  setPixel(x, y, color) {
    const renderColor = typeof color === 'string' ? color : rgbToHex(...color);
    const yMin = y === '*' ? 0 : y;
    const yMax = y === '*' ? this.displaySize.y - 1 : y;
    const xMin = x === '*' ? 0 : x;
    const xMax = x === '*' ? this.displaySize.x - 1 : x;

    for (let yIndex = yMin; yIndex <= yMax; yIndex++) {
      for (let xIndex = xMin; xIndex <= xMax; xIndex++) {
        this.display[yIndex * this.displaySize.x + xIndex] = renderColor;
      }
    }

    this.render();
  }
  
  setPixels(pixels) {
    if (pixels.length != this.displaySize.x * this.displaySize.y) {
      throw new Error('pixels must contain 64 elements');
    }
    this.display = pixels.map(color => typeof color === 'string' ? color : rgbToHex(...color))
    this.render();
  }

  render() {
    this.client.send(displayMatrixAction(this.device, this.display));
  }

  clear() {
    this.display = empty();
    this.render();
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
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O,
  O, O, O, O, O, O, O, O
];