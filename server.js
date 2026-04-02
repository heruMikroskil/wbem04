import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

let mahasiswa = [];

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "index.html");
    const html = fs.readFileSync(filePath);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  else if (req.method === "GET" && req.url === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mahasiswa));
  }

  else if (req.method === "POST" && req.url === "/data") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      if (data.nim && data.nama) {
        mahasiswa.push({
          nim: data.nim,
          nama: data.nama
        });
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(mahasiswa));
    });
  }

  // ===============================
  // JIKA URL TIDAK DITEMUKAN
  // ===============================
  else {
    res.writeHead(404);
    res.end("404 - Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});