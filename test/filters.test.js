const test = require("node:test");
const assert = require("node:assert");
const F = require("../js/filters.js");

const today = new Date(2026, 9, 24);
const tasks = [
  { id: 1, title: "Binary search", cat: "DSA", pri: "Low", due: "2026-10-20", done: false },
  { id: 2, title: "Percentages", cat: "Aptitude", pri: "High", due: "2026-10-30", done: false },
  { id: 3, title: "HR answers", cat: "Interview", pri: "Medium", due: "", done: true }
];

test("search is case-insensitive", function () {
  assert.strictEqual(F.apply(tasks, { q: "BINARY" }).length, 1);
});
test("filters by category and status", function () {
  assert.strictEqual(F.apply(tasks, { cat: "Aptitude" }).length, 1);
  assert.strictEqual(F.apply(tasks, { status: "done" })[0].id, 3);
  assert.strictEqual(F.apply(tasks, { status: "pending" }).length, 2);
});
test("overdue means past due and not done", function () {
  assert.deepStrictEqual(F.apply(tasks, { status: "overdue" }, today).map(function (t) { return t.id; }), [1]);
});
test("sort by priority and by due date", function () {
  assert.strictEqual(F.sort(tasks, "priority")[0].id, 2);
  assert.strictEqual(F.sort(tasks, "due")[0].id, 1);
  assert.strictEqual(F.sort(tasks, "due")[2].id, 3);
});
