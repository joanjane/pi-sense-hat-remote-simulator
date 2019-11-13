"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flashTestSequence = flashTestSequence;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function flashTestSequence(display, onFinish) {
  var O = '#123fff';
  var X = [123, 200, 30];
  var testPixels = [O, O, O, O, O, O, O, O, O, O, X, O, O, X, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, X, O, O, O, O, X, O, O, X, O, O, O, O, X, O, O, O, X, X, X, X, O, O, O, O, O, O, O, O, O, O];
  var sequence = [function () {
    display.setPixel(2, 6, [123, 9, 200]);
  }, function () {
    display.setPixel('*', '*', '#2255dd');
  }, function () {
    display.clear();
  }, function () {
    display.setPixel('*', 4, '#bb44ee');
  }, function () {
    display.setPixel(3, '*', '#ff00ff');
  }, function () {
    display.setPixels(testPixels);
  }, function () {
    display.showMessage("This is a test message ".concat(Date.now()), 0, '#bbaa00');
  }, function () {
    console.log('Finished'), onFinish && onFinish();
  }];
  console.log('Starting...');
  display.connect(function () {
    console.log('Sending sequence...');
    runSequence(sequence);
  });

  function runSequence(seq) {
    if (seq.length === 0) return;

    var _seq = _toArray(seq),
        first = _seq[0],
        rest = _seq.slice(1);

    first();
    setTimeout(function () {
      runSequence(rest);
    }, 5000);
  }
}