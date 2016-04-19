function debounce(func, frameLength = 10) {
  let called = 0;
  let frame;

  const reset = function() {
    called = 0;
    frame = null;
  };

  const cancel = function() {
    cancelAnimationFrame(frame);
    reset();
  };

  const run = function(...args) {
    const context = this;

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

export default debounce;
