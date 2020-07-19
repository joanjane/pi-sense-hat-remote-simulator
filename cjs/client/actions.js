"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayMatrixAction = displayMatrixAction;
exports.displayMessageAction = displayMessageAction;
exports.keyPressAction = keyPressAction;
exports.updateEnvironmentStatusAction = updateEnvironmentStatusAction;
exports.updateMotionStatusAction = updateMotionStatusAction;
exports.actionTypes = void 0;
var actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS',
  envSensorsUpdate: 'ENVIRONMENT_SENSORS_UPDATE',
  motionUpdate: 'MOTION_UPDATE'
};
exports.actionTypes = actionTypes;

function displayMatrixAction(device, matrix) {
  return {
    type: actionTypes.displayMatrix,
    device: device,
    matrix: matrix,
    timestamp: Date.now()
  };
}

function displayMessageAction(device, message, speed, color, background) {
  return {
    type: actionTypes.displayMessage,
    device: device,
    text: message,
    speed: speed,
    color: color,
    background: background,
    timestamp: Date.now()
  };
}

function keyPressAction(device, key) {
  return {
    type: actionTypes.keyPress,
    device: device,
    key: key,
    event: 'press',
    timestamp: Date.now()
  };
}

function updateEnvironmentStatusAction(device, status) {
  return {
    type: actionTypes.envSensorsUpdate,
    device: device,
    status: status,
    timestamp: Date.now()
  };
}

function updateMotionStatusAction(device, status) {
  return {
    type: actionTypes.motionUpdate,
    device: device,
    status: status,
    timestamp: Date.now()
  };
}