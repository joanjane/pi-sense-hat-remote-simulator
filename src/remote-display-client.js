const { Client } = require('./client');
const env = require('./env');
const { displayMatrixAction, displayMessageAction } = require('./actions');

module.exports.RemoteDisplayClient = class RemoteDisplayClient {
    constructor() {
        this.client = new Client(env.SERVER_URI);
        this.display = empty();
    }

    connect(onConnect) {
        this.client
            .connect()
            .onOpen(onConnect);
    }

    showMessage(message, speed, color, done) {
        this.sendMessage(message);
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
            displayMatrixAction(env.TARGET, this.display));
    }
    
    sendMessage(message) {
        this.client.send(
            displayMessageAction(env.TARGET, message));
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