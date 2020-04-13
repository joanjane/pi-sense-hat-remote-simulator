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

export function keyPressAction(source, target, key) {
  return {
    type: actionTypes.keyPress,
    target,
    source,
    key,
    event: 'press',
    timestamp: Date.now()
  };
}

export function updateEnvironmentStatusAction(source, target, status) {
  return {
    type: actionTypes.envSensorsUpdate,
    target,
    source,
    status,
    timestamp: Date.now()
  };
}

export function updateMotionStatusAction(source, target, status) {
  return {
    type: actionTypes.motionUpdate,
    target,
    source,
    status,
    timestamp: Date.now()
  };
}