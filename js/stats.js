(function (root) {
  const WEIGHT = { High: 3, Medium: 2, Low: 1 };
  const CATS = ["DSA", "Aptitude", "Interview", "Resume & projects"];

  function summary(tasks) {
    const total = tasks.length;
    const done = tasks.filter(function (t) { return t.done; }).length;
    return { total: total, done: done, pending: total - done, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function byCategory(tasks) {
    const out = {};
    CATS.forEach(function (c) { out[c] = { total: 0, done: 0 }; });
    tasks.forEach(function (t) { if (out[t.cat]) { out[t.cat].total++; if (t.done) out[t.cat].done++; } });
    return out;
  }
  // Readiness counts high-priority work more than low-priority work.
  function readiness(tasks) {
    let all = 0, got = 0;
    tasks.forEach(function (t) { const w = WEIGHT[t.pri] || 1; all += w; if (t.done) got += w; });
    return all ? Math.round(got / all * 100) : 0;
  }
  function dayKey(d) {
    const x = new Date(d), p = function (n) { return String(n).padStart(2, "0"); };
    return x.getFullYear() + "-" + p(x.getMonth() + 1) + "-" + p(x.getDate());
  }
  // Consecutive days with at least one completed task. Today need not be done yet.
  function streak(tasks, today) {
    const days = new Set(tasks.filter(function (t) { return t.doneAt; }).map(function (t) { return dayKey(t.doneAt); }));
    const d = new Date(today || Date.now());
    if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  const api = { summary: summary, byCategory: byCategory, readiness: readiness, streak: streak, dayKey: dayKey, CATS: CATS };
  if (typeof module !== "undefined") module.exports = api; else root.PTStats = api;

  if (typeof document !== "undefined" && root.PT) {
    const box = document.getElementById("stats");
    const draw = function (tasks) {
      const s = summary(tasks), cats = byCategory(tasks);
      let html = '<div class="bar" role="progressbar" aria-valuenow="' + s.pct + '" aria-valuemin="0" aria-valuemax="100"><div class="fill" style="width:' + s.pct + '%"></div></div>' +
        '<div class="stat-row"><span>Completed</span><strong>' + s.pct + '%</strong></div>' +
        '<div class="stat-row"><span>Done / pending</span><strong>' + s.done + ' / ' + s.pending + '</strong></div>' +
        '<div class="stat-row"><span>Readiness score</span><strong>' + readiness(tasks) + '%</strong></div>' +
        '<div class="stat-row"><span>Day streak</span><strong>' + streak(tasks) + '</strong></div><hr>';
      CATS.forEach(function (c) {
        html += '<div class="stat-row"><span>' + c.replace("&", "&amp;") + '</span><span>' + cats[c].done + '/' + cats[c].total + '</span></div>';
      });
      box.innerHTML = html;
    };
    root.PT.store.subscribe(draw);
    draw(root.PT.store.all());
  }
})(this);
