"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteEnvironmentSensors = void 0;

var _actions = require("./actions.js");

var _wsClient = require("./ws-client.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteEnvironmentSensors =
/*#__PURE__*/
function () {
  function RemoteEnvironmentSensors(webSocketFactory, serverUri, target) {
    _classCallCheck(this, RemoteEnvironmentSensors);

    this.client = new _wsClient.WsClient(webSocketFactory, serverUri);
    this.target = target;
    this.sensors = {
      temperature: 0,
      pressure: 0,
      humidity: 0
    };
  }

  _createClass(RemoteEnvironmentSensors, [{
    key: "connect",
    value: function connect(onConnect) {
      var _this = this;

      this.client.connect();
      this.client.onOpen(function () {
        _this.client.onMessage(function (event) {
          var payload = event;

          if (payload.type !== _actions.actionTypes.envSensorsUpdate || payload.source !== _this.remoteDeviceId) {
            return;
          }

          _this.sensors = payload.status;
        });

        onConnect && onConnect();
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.client && this.client.close();
    }
  }, {
    key: "getSensorsStatus",
    value: function getSensorsStatus() {
      return Promise.resolve(this.sensors);
    }
  }]);

  return RemoteEnvironmentSensors;
}();

exports.RemoteEnvironmentSensors = RemoteEnvironmentSensors;