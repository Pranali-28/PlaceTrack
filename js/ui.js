(function () {
  const PT = window.PT = {
    store: PTStore.create(window.localStorage),
    view: function (tasks) { return tasks; },   // filters.js replaces this
    decorate: function () { return ""; },       // filters.js adds CSS classes
    rerender: function () {}
  };
  const $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function render() {
    const list = $("task-list");
    list.innerHTML = "";
    const tasks = PT.view(PT.store.all());
    $("empty").hidden = tasks.length > 0;
    tasks.forEach(function (t) {
      const li = el("li", "task pri-" + t.pri + (t.done ? " done" : "") + PT.decorate(t));
      const box = el("input");
      box.type = "checkbox";
      box.checked = t.done;
      box.setAttribute("aria-label", "Mark done: " + t.title);
      box.addEventListener("change", function () { PT.store.toggle(t.id); });
      const del = el("button", "del", "Delete");
      del.addEventListener("click", function () { PT.store.remove(t.id); });
      li.append(box, el("span", "title", t.title), el("small", "", t.cat),
                el("small", "", t.due ? "Due " + t.due : "No due date"), el("small", "", t.pri), del);
      list.appendChild(li);
    });
  }

  PT.rerender = render;
  PT.store.subscribe(render);

  $("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    PT.store.add({ title: $("task-title").value, cat: $("task-cat").value,
                   pri: $("task-pri").value, due: $("task-due").value });
    e.target.reset();
  });

  PT.store.load();
  render();
})();
