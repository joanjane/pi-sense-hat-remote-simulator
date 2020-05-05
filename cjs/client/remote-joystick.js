"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteJoystick = void 0;

var _actions = require("./actions.js");

var _wsClient = require("./ws-client.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteJoystick =
/*#__PURE__*/
function () {
  function RemoteJoystick(webSocketFactory, serverUri, remoteDeviceId) {
    _classCallCheck(this, RemoteJoystick);

    this.remoteDeviceId = remoteDeviceId;
    this.client = new _wsClient.WsClient(webSocketFactory, serverUri);
    this.onPressListeners = [];
    this.onReleaseListeners = [];
    this.onHoldListeners = [];
    this.subscriberId = "RemoteJoystick".concat(Date.now());
  }

  _createClass(RemoteJoystick, [{
    key: "connect",
    value: function connect(onOpen) {
      var _this = this;

      this.client.connect();
      this.client.onOpen(function () {
        _this.client.onMessage(function (event) {
          var payload = event;

          if (payload.type !== _actions.actionTypes.keyPress || payload.device !== _this.remoteDeviceId) {
            return;
          }

          switch (payload.event) {
            case 'press':
              _this.onPressListeners.forEach(function (callback) {
                return callback(payload.key);
              });

              break;

            case 'hold':
              _this.onHoldListeners.forEach(function (callback) {
                return callback(payload.key);
              });

              break;

            case 'release':
              _this.onReleaseListeners.forEach(function (callback) {
                return callback(payload.key);
              });

              break;
          }
        }, _this.subscriberId);

        onOpen && onOpen();
      }, this.subscriberId);
    }
  }, {
    key: "close",
    value: function close() {
      this.client && this.client.close();
      this.onPressListeners = [];
      this.onHoldListeners = [];
      this.onReleaseListeners = [];
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      switch (event) {
        case 'press':
          this.onPressListeners.push(callback);
          break;

        case 'hold':
          this.onHoldListeners.push(callback);
          break;

        case 'release':
          this.onReleaseListeners.push(callback);
          break;

        default:
          throw new Error("".concat(event, " event is not valid. Try with press, hold and release."));
      }
    }
  }]);

  return RemoteJoystick;
}();

exports.RemoteJoystick = RemoteJoystick;