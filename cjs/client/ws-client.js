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
      this.onOpenSubscribers = new Map();
      this.onCloseSubscribers = new Map();
      this.onMessageSubscribers = new Map();
      this.onErrorSubscribers = new Map();
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
    value: function onOpen(callback, suscriberId) {
      var _this = this;

      this.checkConnection();
      this.onOpenSubscribers.set(suscriberId, callback);

      if (this.isOpen) {
        callback();
      }

      if (!this.ws.onopen) {
        this.ws.onopen = function (e) {
          Array.from(_this.onOpenSubscribers).map(function (v) {
            return v[1];
          }).forEach(function (c) {
            return c(e);
          });
        };
      }

      return this;
    }
  }, {
    key: "onClose",
    value: function onClose(callback, suscriberId) {
      var _this2 = this;

      this.checkConnection();
      this.onCloseSubscribers.set(suscriberId, callback);

      if (!this.ws.onclose) {
        this.ws.onclose = function (e) {
          Array.from(_this2.onCloseSubscribers).map(function (v) {
            return v[1];
          }).forEach(function (c) {
            return c(e);
          });
        };
      }

      return this;
    }
  }, {
    key: "onError",
    value: function onError(callback, suscriberId) {
      var _this3 = this;

      this.checkConnection();
      this.onErrorSubscribers.set(suscriberId, callback);

      if (!this.ws.onerror) {
        this.ws.onerror = function (e) {
          Array.from(_this3.onErrorSubscribers).map(function (v) {
            return v[1];
          }).forEach(function (c) {
            return c(e);
          });
        };
      }

      return this;
    }
  }, {
    key: "onMessage",
    value: function onMessage(callback, suscriberId) {
      var _this4 = this;

      this.checkConnection();
      this.onMessageSubscribers.set(suscriberId, callback);

      if (!this.ws.onmessage) {
        this.ws.onmessage = function (event) {
          var payload = JSON.parse(event.data);
          Array.from(_this4.onMessageSubscribers).map(function (v) {
            return v[1];
          }).forEach(function (c) {
            return c(payload);
          });
        };
      }

      return this;
    }
  }, {
    key: "unsubscribeAll",
    value: function unsubscribeAll(suscriberId) {
      this.onOpenSubscribers.has(suscriberId) ? this.onOpenSubscribers["delete"](suscriberId) : null;
      this.onCloseSubscribers.has(suscriberId) ? this.onCloseSubscribers["delete"](suscriberId) : null;
      this.onErrorSubscribers.has(suscriberId) ? this.onErrorSubscribers["delete"](suscriberId) : null;
      this.onMessageSubscribers.has(suscriberId) ? this.onMessageSubscribers["delete"](suscriberId) : null;
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
  }, {
    key: "isOpen",
    get: function get() {
      return this.ws.readyState === 1;
    }
  }]);

  return WsClient;
}();

exports.WsClient = WsClient;