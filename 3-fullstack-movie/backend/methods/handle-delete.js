const fs = require("fs");
const handleNotFound = require("./handle-not-found");

const handleDelete = (req, res) => {
  // url'deki id parametresine eriş
  const id = req.url.split("/")[2];

  // json dosyasından verileri al
  const movieData = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  // parametre olarak gelen id'li filmi dizide ara
  const movie = movieData.find((movie) => movie.id === id);

  // film bulunamadıysa hata fırlat
  if (!movie) return handleNotFound(req, res);

  // id'si bilinen filmi diziden kaldır
  const filtred = movieData.filter((movie) => movie.id !== id);

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(filtred), "utf-8");

  // client'a yanıt gönder
  res.writeHead(204);
  return res.end();
};

module.exports = handleDelete;
