"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteEnvironmentSensors = void 0;

var _actions = require("./actions.js");

var _wsClient = require("./ws-client.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteEnvironmentSensors =
/*#__PURE__*/
function () {
  function RemoteEnvironmentSensors(webSocketFactory, serverUri, device) {
    _classCallCheck(this, RemoteEnvironmentSensors);

    this.client = new _wsClient.WsClient(webSocketFactory, serverUri);
    this.device = device;
    this.sensors = {
      temperature: 21,
      pressure: 1013,
      humidity: 20
    };
    this.subscriberId = "RemoteEnvironmentSensors".concat(Date.now());
  }

  _createClass(RemoteEnvironmentSensors, [{
    key: "connect",
    value: function connect(onConnect) {
      var _this = this;

      this.client.connect();
      this.client.onOpen(function () {
        _this.client.onMessage(function (event) {
          var payload = event;

          if (payload.type !== _actions.actionTypes.envSensorsUpdate || payload.device !== _this.device) {
            return;
          }

          _this.sensors = payload.status;
        }, _this.subscriberId);

        onConnect && onConnect();
      }, this.subscriberId);
    }
  }, {
    key: "close",
    value: function close() {
      this.client && this.client.close();
    }
  }, {
    key: "getSensorsStatus",
    value: function getSensorsStatus() {
      return Promise.resolve(_objectSpread({}, this.sensors));
    }
  }]);

  return RemoteEnvironmentSensors;
}();

exports.RemoteEnvironmentSensors = RemoteEnvironmentSensors;