const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/read-file" && req.method === "GET") {
    const readableStream = fs.createReadStream(
      process.cwd() + "/text/read.txt"
    );
    readableStream.on("data", (buffer) => {
      res.write(buffer);
    });
    readableStream.on("end", () => {
      res.end("hello from world!");
    });
  }
  if (req.url === "/") {
    res.end("hello from world!");
  }
});

server.listen(8000, () => {
  console.log("server is listening on port 5000");
});
