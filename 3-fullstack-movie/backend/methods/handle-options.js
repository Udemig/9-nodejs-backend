const handleOptions = (req, res) => {
  // Tarayıcı bir POST|PUT|PATCH|DELETE isteği atmadan önce bu isteği kabul edilip edilmediğini kontrol etmek için bir OPTIONS isteği atar

  // OPTIONS'a backendden yanıt göndermezsek, frontend istek türünün kabuk edilmediğini anlar ve asıl isteği göndermez

  // Eğer OPTIONS'a doğru header'larla yanıt gönderirsek frontend asıl isteği gönderir

  //* hangi isteklere izin verdiğimizi söyleyelim
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  //* bodye sahip isteklerde verinin backende iletilmesine izin veren headerı ekle
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  //* 200 olumlu yanıt gönder
  res.end();
};

module.exports = handleOptions;
