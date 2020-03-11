const { createServer } = require("http");
const PORT = 3000;

const server = createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Hello</h1>");
  } else if (url === "/goodbye") {
    response.writeHead(200, { "content-type": "text/html" });
    response.end("<h1>Goodbye</h1>");
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Not found</h1>");
  }
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
