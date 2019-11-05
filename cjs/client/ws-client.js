"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WsClient = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WsClient =
/*#__PURE__*/
function () {
  function WsClient(webSocketFactory, serverUri) {
    _classCallCheck(this, WsClient);

    this.webSocketFactory = webSocketFactory;
    this.serverUri = serverUri;
  }

  _createClass(WsClient, [{
    key: "connect",
    value: function connect() {
      this.ws = this.webSocketFactory(this.serverUri);
    }
  }, {
    key: "close",
    value: function close() {
      this.ws && this.ws.close();
      return this;
    }
  }, {
    key: "send",
    value: function send(payload) {
      this.checkConnection();
      this.ws.send(JSON.stringify(payload));
      return this;
    }
  }, {
    key: "onOpen",
    value: function onOpen(callback) {
      this.checkConnection();
      this.ws.onopen = callback;
      return this;
    }
  }, {
    key: "onClose",
    value: function onClose(callback) {
      this.checkConnection();
      this.ws.onclose = callback;
      return this;
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.ws.onerror = callback;
      return this;
    }
  }, {
    key: "onMessage",
    value: function onMessage(callback) {
      this.checkConnection();

      this.ws.onmessage = function (event) {
        var payload = JSON.parse(event.data);
        callback(payload);
      };

      return this;
    }
  }, {
    key: "checkConnection",
    value: function checkConnection() {
      if (!this.ws) throw new Error('Websocket is not connected');
    }
  }, {
    key: "readyState",
    get: function get() {
      return this.ws.readyState;
    }
  }]);

  return WsClient;
}();

exports.WsClient = WsClient;