const http = require("http");
const handleGet = require("./methods/handle-get");
const handlePut = require("./methods/handle-put");
const handleDelete = require("./methods/handle-delete");
const handlePost = require("./methods/handle-post");
const handleNotFound = require("./methods/handle-not-found");

//1) sunucuyu oluştur
const server = http.createServer((req, res) => {
  console.log(`Gelen istek: method: ${req.method}  |  url: ${req.url}`);

  // gönderilen cevab'ın veri tipini json olduğunu header'a ekle
  res.setHeader("Content-Type", "application/json");

  // cors hatalarını engellemek için gerekli header
  res.setHeader("Access-Control-Allow-Origin", "*");

  // istek /movies adresine atılmadıysa 404 döndür
  if (!req.url.startsWith("/movies")) return handleNotFound(req, res);

  // istek methoduna göre fonksiyon çalıştır
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return handleNotFound(req, res);
  }
});

//2) API'in çalışıcağı portu belirle
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`API ${PORT}. portunda çalışıyor`);
});
