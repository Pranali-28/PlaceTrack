(function (root) {
  function format(sec) {
    const s = Math.max(0, sec);
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  function createTimer(seconds, onTick, onDone) {
    let left = seconds, handle = null;
    const t = {
      remaining: function () { return left; },
      running: function () { return handle !== null; },
      tick: function () {
        if (left > 0) left--;
        if (onTick) onTick(left);
        if (left === 0) { t.pause(); if (onDone) onDone(); }
      },
      start: function () { if (!handle && left > 0) handle = setInterval(t.tick, 1000); },
      pause: function () { if (handle) { clearInterval(handle); handle = null; } },
      reset: function (s) { t.pause(); left = s === undefined ? seconds : s; if (onTick) onTick(left); }
    };
    return t;
  }

  const api = { format: format, createTimer: createTimer };
  if (typeof module !== "undefined") module.exports = api; else root.PTTimer = api;

  if (typeof document !== "undefined") {
    const box = document.getElementById("timer");
    box.innerHTML = '<div id="timer-display" aria-live="off">25:00</div>' +
      '<p><button id="t-start" type="button">Start</button> <button id="t-pause" type="button">Pause</button> ' +
      '<button id="t-reset" type="button">Reset</button></p>' +
      '<p><select id="t-len" aria-label="Session length"><option value="1500">25 min focus</option><option value="300">5 min break</option><option value="3000">50 min deep work</option></select></p>' +
      '<p id="t-msg" class="muted" role="status"></p>';
    const show = function (s) { document.getElementById("timer-display").textContent = format(s); };
    const timer = createTimer(1500, show, function () { document.getElementById("t-msg").textContent = "Session complete. Take a short break."; });
    document.getElementById("t-start").addEventListener("click", function () { document.getElementById("t-msg").textContent = ""; timer.start(); });
    document.getElementById("t-pause").addEventListener("click", timer.pause);
    document.getElementById("t-reset").addEventListener("click", function () { timer.reset(); });
    document.getElementById("t-len").addEventListener("change", function (e) { timer.reset(Number(e.target.value)); });
  }
})(this);
