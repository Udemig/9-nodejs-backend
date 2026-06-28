const fs = require("fs");
const handleNotFound = require("./handle-not-found");

const handleGet = (req, res) => {
  // url'den id değerini al
  const id = req.url.split("/")[2];

  // url'de id değeri yoksa bütün filmleri gönder
  if (req.url === "/movies") {
    // json dosyasındaki içeriğe eriş
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    // client'a filmleri gönder
    return res.end(movies);
  }

  // url'de id değeri varsa sadece o id'li filmi gönder
  if (id) {
    // json dosyasındaki içeriğe eriş
    const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    // urle parametre olarak eklenen id'li filmi ara
    const movie = movies.find((movie) => movie.id === id);

    // film bulunamadıysa 404 döndür
    if (!movie) return handleNotFound(req, res);

    // film verisini verisini client'a gönder
    return res.end(JSON.stringify(movie));
  }

  // client'a yanıt gönder
  return res.end();
};

module.exports = handleGet;
