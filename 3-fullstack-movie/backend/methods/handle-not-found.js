const handleNotFound = (req, res) => {
  // yanıtın durum kodunu belirle
  res.statusCode = 404;

  // yanıtın içeriğni belirle
  res.write(JSON.stringify({ success: false, message: "Aradığınız kaynak mevcut değil" }));

  // client'a yanıt gönder
  return res.end();
};

module.exports = handleNotFound;
