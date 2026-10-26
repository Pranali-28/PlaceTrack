const test = require("node:test");
const assert = require("node:assert");
const S = require("../js/stats.js");

test("summary calculates percentage", function () {
  const r = S.summary([{ done: true }, { done: false }, { done: true }, { done: true }]);
  assert.deepStrictEqual(r, { total: 4, done: 3, pending: 1, pct: 75 });
});
test("summary of no tasks is zero", function () {
  assert.strictEqual(S.summary([]).pct, 0);
});
test("readiness weights high priority more", function () {
  assert.strictEqual(S.readiness([{ pri: "High", done: true }, { pri: "Low", done: false }]), 75);
});
test("byCategory counts per category", function () {
  const r = S.byCategory([{ cat: "DSA", done: true }, { cat: "DSA", done: false }, { cat: "Aptitude", done: false }]);
  assert.deepStrictEqual(r.DSA, { total: 2, done: 1 });
  assert.deepStrictEqual(r.Aptitude, { total: 1, done: 0 });
});
test("streak counts consecutive days", function () {
  const today = new Date(2026, 9, 24, 12);
  const at = function (back) { return new Date(2026, 9, 24 - back, 9).toISOString(); };
  assert.strictEqual(S.streak([{ doneAt: at(0) }, { doneAt: at(1) }, { doneAt: at(2) }], today), 3);
  assert.strictEqual(S.streak([{ doneAt: at(1) }], today), 1);
  assert.strictEqual(S.streak([{ doneAt: at(3) }], today), 0);
});
