"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function debounce(func) {
  var frameLength = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

  var called = 0;
  var frame = undefined;

  var reset = function reset() {
    called = 0;
    frame = null;
  };

  var cancel = function cancel() {
    cancelAnimationFrame(frame);
    reset();
  };

  var run = function run() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    if (frame != null) {
      cancelAnimationFrame(frame);
      reset();
    }

    frame = requestAnimationFrame(function tick() {
      if (++called === frameLength) {
        reset();

        func.apply(context, args);
      } else {
        frame = requestAnimationFrame(tick);
      }
    });
  };

  run.cancel = cancel;

  return run;
};

exports.default = debounce;
