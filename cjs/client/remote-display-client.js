"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteDisplayClient = void 0;

var _wsClient = require("./ws-client.js");

var _actions = require("./actions.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteDisplayClient =
/*#__PURE__*/
function () {
  function RemoteDisplayClient(webSocketFactory, serverUri, target) {
    _classCallCheck(this, RemoteDisplayClient);

    this.client = new _wsClient.WsClient(webSocketFactory, serverUri);
    this.target = target;
    this.display = empty();
    this.displaySize = {
      x: 8,
      y: 8
    };
  }

  _createClass(RemoteDisplayClient, [{
    key: "connect",
    value: function connect(onConnect) {
      this.client.connect();
      this.client.onOpen(onConnect);
    }
  }, {
    key: "close",
    value: function close() {
      this.client && this.client.close();
    }
  }, {
    key: "showMessage",
    value: function showMessage(message, speed, color, done) {
      this.client.send((0, _actions.displayMessageAction)(this.target, message, speed, color));
      setTimeout(function () {
        return done && done();
      }, speed * 1000);
    }
  }, {
    key: "setPixel",
    value: function setPixel(x, y, color) {
      var renderColor = typeof color === 'string' ? color : rgbToHex.apply(void 0, _toConsumableArray(color));
      var yMin = y === '*' ? 0 : y;
      var yMax = y === '*' ? this.displaySize.y - 1 : y;
      var xMin = x === '*' ? 0 : x;
      var xMax = x === '*' ? this.displaySize.x - 1 : x;

      for (var yIndex = yMin; yIndex <= yMax; yIndex++) {
        for (var xIndex = xMin; xIndex <= xMax; xIndex++) {
          this.display[yIndex * this.displaySize.x + xIndex] = renderColor;
        }
      }

      this.render();
    }
  }, {
    key: "setPixels",
    value: function setPixels(pixels) {
      if (pixels.length != this.displaySize.x * this.displaySize.y) {
        throw new Error('pixels must contain 64 elements');
      }

      this.display = pixels.map(function (color) {
        return typeof color === 'string' ? color : rgbToHex.apply(void 0, _toConsumableArray(color));
      });
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.client.send((0, _actions.displayMatrixAction)(this.target, this.display));
    }
  }, {
    key: "clear",
    value: function clear() {
      this.display = empty();
      this.render();
    }
  }]);

  return RemoteDisplayClient;
}();

exports.RemoteDisplayClient = RemoteDisplayClient;

function rgbToHex(r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var O = '#000000';

var empty = function empty() {
  return [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O];
};