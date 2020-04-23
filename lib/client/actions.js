export const actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS',
  envSensorsUpdate: 'ENVIRONMENT_SENSORS_UPDATE',
  motionUpdate: 'MOTION_UPDATE'
};

export function displayMatrixAction(target, matrix) {
  return {
    type: actionTypes.displayMatrix,
    target: target,
    matrix: matrix,
    timestamp: Date.now()
  };
}

export function displayMessageAction(target, message, speed, color) {
  return {
    type: actionTypes.displayMessage,
    target: target,
    text: message,
    speed,
    color,
    timestamp: Date.now()
  };
}

export function keyPressAction(source, key) {
  return {
    type: actionTypes.keyPress,
    source,
    key,
    event: 'press',
    timestamp: Date.now()
  };
}

export function updateEnvironmentStatusAction(target, status) {
  return {
    type: actionTypes.envSensorsUpdate,
    target,
    status,
    timestamp: Date.now()
  };
}

export function updateMotionStatusAction(target, status) {
  return {
    type: actionTypes.motionUpdate,
    target,
    status,
    timestamp: Date.now()
  };
}