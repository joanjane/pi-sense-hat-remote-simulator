"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeWebSocketFactory = nodeWebSocketFactory;

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function nodeWebSocketFactory(uri, options) {
  return new _ws["default"](uri, options);
}