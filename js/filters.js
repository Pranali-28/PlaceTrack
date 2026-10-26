(function (root) {
  const WEIGHT = { High: 3, Medium: 2, Low: 1 };

  function todayKey(d) {
    const x = d ? new Date(d) : new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return x.getFullYear() + "-" + p(x.getMonth() + 1) + "-" + p(x.getDate());
  }
  function isOverdue(t, today) { return !t.done && !!t.due && t.due < todayKey(today); }

  function apply(tasks, o, today) {
    const q = (o.q || "").trim().toLowerCase();
    return tasks.filter(function (t) {
      if (q && t.title.toLowerCase().indexOf(q) === -1) return false;
      if (o.cat && o.cat !== "all" && t.cat !== o.cat) return false;
      if (o.status === "done") return t.done;
      if (o.status === "pending") return !t.done;
      if (o.status === "overdue") return isOverdue(t, today);
      return true;
    });
  }
  function sort(tasks, mode) {
    const a = tasks.slice();
    if (mode === "priority") a.sort(function (x, y) { return (WEIGHT[y.pri] || 0) - (WEIGHT[x.pri] || 0); });
    else if (mode === "due") a.sort(function (x, y) { return (x.due || "9999").localeCompare(y.due || "9999"); });
    else a.sort(function (x, y) { return y.id - x.id; });
    return a;
  }

  const api = { apply: apply, sort: sort, isOverdue: isOverdue, todayKey: todayKey };
  if (typeof module !== "undefined") module.exports = api; else root.PTFilters = api;

  if (typeof document !== "undefined" && root.PT) {
    const g = function (id) { return document.getElementById(id); };
    root.PT.view = function (tasks) {
      return sort(apply(tasks, { q: g("f-q").value, cat: g("f-cat").value, status: g("f-status").value }), g("f-sort").value);
    };
    root.PT.decorate = function (t) { return isOverdue(t) ? " overdue" : ""; };
    ["f-q", "f-cat", "f-status", "f-sort"].forEach(function (id) {
      g(id).addEventListener("input", function () { root.PT.rerender(); });
    });
    root.PT.rerender();
  }
})(this);
