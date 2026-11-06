const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3199;
const PAGE = path.join(__dirname, "random-number.html");

// 폴더 전체가 노출되지 않도록 이 페이지 하나만 제공
const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (pathname !== "/" && pathname !== "/random-number.html") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }
  fs.readFile(PAGE, (err, html) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
