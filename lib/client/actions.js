export const actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS',
  envSensorsUpdate: 'ENVIRONMENT_SENSORS_UPDATE',
  motionUpdate: 'MOTION_UPDATE'
};

export function displayMatrixAction(device, matrix) {
  return {
    type: actionTypes.displayMatrix,
    device,
    matrix: matrix,
    timestamp: Date.now()
  };
}

export function displayMessageAction(device, message, speed, color, background) {
  return {
    type: actionTypes.displayMessage,
    device,
    text: message,
    speed,
    color,
    background,
    timestamp: Date.now()
  };
}

export function keyPressAction(device, key) {
  return {
    type: actionTypes.keyPress,
    device,
    key,
    event: 'press',
    timestamp: Date.now()
  };
}

export function updateEnvironmentStatusAction(device, status) {
  return {
    type: actionTypes.envSensorsUpdate,
    device,
    status,
    timestamp: Date.now()
  };
}

export function updateMotionStatusAction(device, status) {
  return {
    type: actionTypes.motionUpdate,
    device,
    status,
    timestamp: Date.now()
  };
}