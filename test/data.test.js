const test = require("node:test");
const assert = require("node:assert");
const D = require("../js/data.js");

test("export then import round-trips tasks", function () {
  const src = [{ id: 9, title: "Graphs", cat: "DSA", pri: "High", due: "2026-11-01", done: true, doneAt: "2026-10-20T10:00:00.000Z" }];
  const back = D.parse(D.toJSON(src));
  assert.strictEqual(back[0].title, "Graphs");
  assert.strictEqual(back[0].id, 1);
  assert.strictEqual(back[0].done, true);
});
test("rejects bad JSON, missing tasks and unknown categories", function () {
  assert.throws(function () { D.parse("{oops"); }, /not valid JSON/);
  assert.throws(function () { D.parse("{}"); }, /No tasks/);
  assert.throws(function () { D.parse(JSON.stringify({ tasks: [{ title: "x", cat: "<img src=x>" }] })); }, /unknown category/);
});
test("bad priority and due date are sanitised", function () {
  const r = D.parse(JSON.stringify({ tasks: [{ title: "x", cat: "DSA", pri: "Urgent", due: "tomorrow" }] }));
  assert.strictEqual(r[0].pri, "Medium");
  assert.strictEqual(r[0].due, "");
});
