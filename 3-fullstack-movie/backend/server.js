const http = require("http");

//1) sunucuyu oluştur
const server = http.createServer((req, res) => {
  console.log(`Gelen istek: method: ${req.method}  |  url: ${req.url}`);

  res.end("<h1>Server Saglikli!!</h1>");
});

//2) API'in çalışıcağı portu belirle
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`API ${PORT}. portunda çalışıyor`);
});
