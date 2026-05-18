/* Minimal static server for local mockup preview. Run: node _preview-server.cjs */
const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".md": "text/markdown; charset=utf-8",
};
const port = Number(process.env.PORT) || 3000;
http
  .createServer((req, res) => {
    let u = decodeURIComponent((req.url || "/").split("?")[0]);
    if (u === "/") u = "/today-hub.html";
    const safe = path.normalize(u).replace(/^(\.\.(\/|\\|$))+/, "");
    const file = path.join(root, safe);
    if (!file.startsWith(root)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("Not found");
      }
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log("Mockups: http://localhost:" + port + "/today-hub.html");
    console.log("Mobile:  http://localhost:" + port + "/today-hub-mobile.html");
    console.log("Status:  http://localhost:" + port + "/where-we-are.html");
  });
