"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteMotionSensors = void 0;

var _actions = require("./actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteMotionSensors =
/*#__PURE__*/
function () {
  function RemoteMotionSensors(webSocketFactory, serverUri, target) {
    _classCallCheck(this, RemoteMotionSensors);

    this.client = new WsClient(webSocketFactory, serverUri);
    this.target = target;
    this.motion = {
      acceleration: [0, 0, 0],
      gyroscope: [0, 0, 0],
      orientation: [0, 0, 0],
      compass: 0
    };
  }

  _createClass(RemoteMotionSensors, [{
    key: "connect",
    value: function connect(onConnect) {
      var _this = this;

      this.client.connect();
      this.client.onOpen(function () {
        _this.client.onMessage(function (event) {
          var payload = event;

          if (payload.type !== _actions.actionTypes.motionUpdate || payload.source !== _this.remoteDeviceId) {
            return;
          }

          _this.motion = payload.status;
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
    key: "getMotionStatus",
    value: function getMotionStatus() {
      return Promise.resolve(this.motion);
    }
  }]);

  return RemoteMotionSensors;
}();

exports.RemoteMotionSensors = RemoteMotionSensors;