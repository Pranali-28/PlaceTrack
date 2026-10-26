// Copies the static site into dist/ so Jenkins can archive it.
const fs = require("fs");
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist", { recursive: true });
["index.html", "css", "js"].forEach(function (p) { fs.cpSync(p, "dist/" + p, { recursive: true }); });
console.log("Build complete: dist/ contains " + fs.readdirSync("dist").join(", "));
