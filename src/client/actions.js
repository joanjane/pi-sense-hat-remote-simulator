const actionTypes = {
  displayMessage: 'DISPLAY_MESSAGE',
  displayMatrix: 'DISPLAY_MATRIX',
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