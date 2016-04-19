import test from 'tape';
import onFrame from './index';

test('debounces after 10 frames', function(t) {
  t.plan(1);

  let called = 0;
  let ticked = 0;

  function count() {
    called++;
  }

  const func = onFrame(count);

  setTimeout(function tick() {
    requestAnimationFrame(func);

    ticked++;

    if (ticked < 10) {
      setTimeout(tick, 50);
    } else {
      setTimeout(function() {
        t.equal(called, 1);
      }, 600);
    }
  }, 50);
});

test('debounces after 1 frame', function(t) {
  t.plan(1);

  let called = 0;
  let ticked = 0;

  function count() {
    called++;
  }

  const func = onFrame(count, 1);

  setTimeout(function tick() {
    requestAnimationFrame(func);

    ticked++;

    if (ticked < 10) {
      setTimeout(tick, 50);
    } else {
      setTimeout(function() {
        t.equal(called, 10);
      }, 600);
    }
  }, 50);
});

test('cancels callback', function(t) {
  t.plan(1);

  let called = 0;
  let ticked = 0;

  const func = onFrame(count, 10);

  function count() {
    called++;
  }

  setTimeout(function tick() {
    requestAnimationFrame(func);

    ticked++;

    if (ticked < 10) {
      setTimeout(tick, 50);
    } else {
      setTimeout(func.cancel.bind(func), 100);
      setTimeout(function() {
        t.equal(called, 0);
      }, 600);
    }
  }, 50);
});
