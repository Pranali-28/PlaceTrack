const test = require("node:test");
const assert = require("node:assert");
const { create, KEY } = require("../js/store.js");

function fakeStorage() {
  const d = {};
  return { getItem: function (k) { return d[k] || null; }, setItem: function (k, v) { d[k] = v; } };
}

test("add rejects empty titles", function () {
  const s = create(fakeStorage());
  assert.throws(function () { s.add({ title: "   " }); }, /Title is required/);
});

test("add, toggle and remove a task", function () {
  const s = create(fakeStorage());
  s.add({ title: "Two pointers", cat: "DSA", pri: "High" });
  assert.strictEqual(s.all().length, 1);
  s.toggle(1);
  assert.strictEqual(s.all()[0].done, true);
  assert.ok(s.all()[0].doneAt);
  s.remove(1);
  assert.strictEqual(s.all().length, 0);
});

test("tasks persist through storage", function () {
  const st = fakeStorage();
  create(st).add({ title: "Mock interview" });
  const again = create(st);
  again.load();
  assert.strictEqual(again.all()[0].title, "Mock interview");
  assert.ok(st.getItem(KEY));
});
