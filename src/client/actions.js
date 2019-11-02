const actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
  keyPress: 'KEY_PRESS'
};
module.exports.actionTypes = actionTypes;

module.exports.displayMatrixAction = (target, matrix) => {
  return {
    type: actionTypes.displayMatrix,
    target: target,
    matrix: matrix,
    timestamp: Date.now()
  };
}

module.exports.displayMessageAction = (target, message, speed, color) => {
  return {
    type: actionTypes.displayMessage,
    target: target,
    text: message,
    speed,
    color,
    timestamp: Date.now()
  };
}

module.exports.keyPress = (source, target, key) => {
  return {
    type: actionTypes.keyPress,
    target,
    source,
    key,
    timestamp: Date.now()
  };
}