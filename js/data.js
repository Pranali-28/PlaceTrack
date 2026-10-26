(function (root) {
  const CATS = ["DSA", "Aptitude", "Interview", "Resume & projects"];
  const PRIS = ["High", "Medium", "Low"];

  function toJSON(tasks) { return JSON.stringify({ app: "PlaceTrack", version: 2, tasks: tasks }, null, 2); }

  // Validates untrusted input before it replaces the user's tasks.
  function parse(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { throw new Error("File is not valid JSON"); }
    if (!data || !Array.isArray(data.tasks)) throw new Error("No tasks found in file");
    return data.tasks.map(function (t, i) {
      if (!t || typeof t.title !== "string" || !t.title.trim()) throw new Error("Task " + (i + 1) + " has no title");
      if (CATS.indexOf(t.cat) === -1) throw new Error("Task " + (i + 1) + " has an unknown category");
      return { id: i + 1, title: t.title.trim().slice(0, 120), cat: t.cat,
               pri: PRIS.indexOf(t.pri) === -1 ? "Medium" : t.pri,
               due: /^\d{4}-\d{2}-\d{2}$/.test(t.due || "") ? t.due : "",
               done: !!t.done, doneAt: t.done && typeof t.doneAt === "string" ? t.doneAt : null };
    });
  }

  const api = { toJSON: toJSON, parse: parse };
  if (typeof module !== "undefined") module.exports = api; else root.PTData = api;

  if (typeof document !== "undefined" && root.PT) {
    const box = document.getElementById("data");
    box.innerHTML = '<button id="export" type="button">Export tasks (JSON)</button>' +
      '<p><label for="import">Import tasks</label><br><input id="import" type="file" accept="application/json"></p>' +
      '<p id="data-msg" class="muted" role="status"></p>';
    const msg = document.getElementById("data-msg");
    document.getElementById("export").addEventListener("click", function () {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([toJSON(root.PT.store.all())], { type: "application/json" }));
      a.download = "placetrack-tasks.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });
    document.getElementById("import").addEventListener("change", function (e) {
      const f = e.target.files[0];
      if (!f) return;
      f.text().then(function (text) {
        const tasks = parse(text);
        if (confirm("Replace your current " + root.PT.store.all().length + " tasks with " + tasks.length + " imported tasks?")) {
          root.PT.store.replace(tasks);
          msg.textContent = "Imported " + tasks.length + " tasks.";
        }
      }).catch(function (err) { msg.textContent = "Import failed: " + err.message; });
      e.target.value = "";
    });
  }
})(this);
