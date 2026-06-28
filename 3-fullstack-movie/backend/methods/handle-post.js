const bodyParser = require("../utils/body-parser");
const validateData = require("../utils/validate-data");
const crypto = require("crypto");
const fs = require("fs");

const handlePost = async (req, res) => {
  // isteğin body bölümünde gelen içeriğe eriş
  const body = await bodyParser(req);

  // body verisinin doğruluğunu kontrol et
  validateData(body, res);

  // kaydediceğimiz film nesnesine id değeri ekle
  body.id = crypto.randomUUID();

  // json dosyasının içeriğini al
  let movieData = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

  // yeni filmi diziye ekle
  movieData.push(body);

  // json dosyasını güncelle
  fs.writeFileSync("./data/movies.json", JSON.stringify(movieData), "utf-8");

  // client'a yanıt gönder
  res.writeHead(201);
  return res.end(JSON.stringify({ success: true, message: "Film oluşturuldu", movie: body }));
};

module.exports = handlePost;
