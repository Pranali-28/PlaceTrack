const test = require("node:test");
const assert = require("node:assert");
const T = require("../js/timer.js");

test("format shows mm:ss", function () {
  assert.strictEqual(T.format(1500), "25:00");
  assert.strictEqual(T.format(65), "01:05");
  assert.strictEqual(T.format(-3), "00:00");
});
test("timer counts down and fires onDone once", function () {
  let done = 0;
  const t = T.createTimer(2, null, function () { done++; });
  t.tick();
  assert.strictEqual(t.remaining(), 1);
  t.tick();
  assert.strictEqual(t.remaining(), 0);
  assert.strictEqual(done, 1);
});
