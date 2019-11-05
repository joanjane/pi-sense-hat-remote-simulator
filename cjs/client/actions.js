"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayMatrixAction = displayMatrixAction;
exports.displayMessageAction = displayMessageAction;
exports.keyPress = keyPress;
exports.actionTypes = void 0;
var actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS'
};
exports.actionTypes = actionTypes;

function displayMatrixAction(target, matrix) {
  return {
    type: actionTypes.displayMatrix,
    target: target,
    matrix: matrix,
    timestamp: Date.now()
  };
}

function displayMessageAction(target, message, speed, color) {
  return {
    type: actionTypes.displayMessage,
    target: target,
    text: message,
    speed: speed,
    color: color,
    timestamp: Date.now()
  };
}

function keyPress(source, target, key) {
  return {
    type: actionTypes.keyPress,
    target: target,
    source: source,
    key: key,
    event: 'press',
    timestamp: Date.now()
  };
}