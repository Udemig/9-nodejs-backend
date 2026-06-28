const bodyParser = require("../utils/body-parser");
const validateData = require("../utils/validate-data");
const fs = require("fs");

const handlePut = async (req, res) => {
  // url'deki id parametresine eriş
  const id = req.url.split("/")[2];

  // isteğin body bölümündeki veriye eriş
  const body = await bodyParser(req);

  // body verisinde eksik var mı kontrol et
  validateData(body, res);

  // json dosyasındaki içeriği al
  const movieData = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  // güncellenicek elemanın dizideki sırasını bul
  const index = movieData.findIndex((movie) => movie.id === id);

  // dizideki ilgili elemanı güncelle
  movieData[index] = {
    ...body,
    id,
  };

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(movieData), "utf-8");

  // client'a yanıt gönder
  return res.end(JSON.stringify({ success: true, message: "Film güncellendi", movie: movieData[index] }));
};

module.exports = handlePut;
