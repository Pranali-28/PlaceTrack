(function (root) {
  const KEY = "placetrack.v2";

  function create(storage) {
    let tasks = [];
    let nextId = 1;
    const subs = [];

    function save() {
      try { if (storage) storage.setItem(KEY, JSON.stringify(tasks)); } catch (e) { /* storage unavailable */ }
    }
    function emit() { save(); subs.forEach(function (f) { f(tasks); }); }
    function setNextId() { nextId = tasks.reduce(function (m, t) { return Math.max(m, t.id); }, 0) + 1; }

    return {
      load: function () {
        try {
          const saved = JSON.parse(storage.getItem(KEY));
          if (Array.isArray(saved)) { tasks = saved; setNextId(); }
        } catch (e) { tasks = []; }
      },
      subscribe: function (f) { subs.push(f); },
      all: function () { return tasks; },
      add: function (o) {
        if (!o || typeof o.title !== "string" || !o.title.trim()) throw new Error("Title is required");
        tasks.push({ id: nextId++, title: o.title.trim(), cat: o.cat || "DSA", pri: o.pri || "Medium",
                     due: o.due || "", done: false, doneAt: null });
        emit();
      },
      toggle: function (id) {
        const t = tasks.find(function (x) { return x.id === id; });
        if (!t) return;
        t.done = !t.done;
        t.doneAt = t.done ? new Date().toISOString() : null;
        emit();
      },
      remove: function (id) { tasks = tasks.filter(function (x) { return x.id !== id; }); emit(); },
      replace: function (list) { tasks = list; setNextId(); emit(); }
    };
  }

  const api = { create: create, KEY: KEY };
  if (typeof module !== "undefined") module.exports = api; else root.PTStore = api;
})(this);
