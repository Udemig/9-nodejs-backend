const HTTP = require("http");
const URL = require("url");

const server = HTTP.createServer(async (req, res) => {
  const parsedUrl = URL.parse(req.url, true);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (parsedUrl.pathname === "/users" && req.method === "GET") {
    res.writeHead(200);
    return res.end(
      JSON.stringify({ message: "Kullanıcılar alındı", queryParams: parsedUrl.query }),
    );
  }

  if (parsedUrl.pathname === "/users" && req.method === "POST") {
    res.writeHead(201);

    const body = await bodyParser(req);

    return res.end(JSON.stringify({ message: "Kullanıcı oluşturuldu", body: body }));
  }

  // urldeki id parametresine eriş
  const path = parsedUrl.pathname.split("/")[1];
  const id = parsedUrl.pathname.split("/")[2];

  if (path === "users" && id && req.method === "DELETE") {
    return res.end(JSON.stringify({ message: "Kullanıcı kaldırıldı", id: id }));
  }

  // cors hatalırını çöz
  if (req.method === "OPTIONS") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end();
  }

  // tanımlanmayan bir adrese istek gelirse
  res.writeHead(404);
  return res.end(JSON.stringify({ message: "Aradığınız adres bulunamadı" }));
});

const port = 3000;
server.listen(port, () => console.log(`Sunucu ${port} portunda çalışıyor`));

// body verisine erişme fonksiyonu
const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // client'dan gelen veriyi tuttuğumuz değişken
      let body = "";

      // client'dan her body parçası (chunk) geldiğinde elimizdeki body değişkenine ekle
      req.on("data", (chunk) => {
        // body'nin devamına gelen chunk'ı ekle
        body += chunk;
      });

      // veri aktarma işlemi bittiğinde json verisini js fomatına çevir
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
