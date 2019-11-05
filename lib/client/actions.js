export const actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS'
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

export function keyPress(source, target, key) {
  return {
    type: actionTypes.keyPress,
    target,
    source,
    key,
    event: 'press',
    timestamp: Date.now()
  };
}