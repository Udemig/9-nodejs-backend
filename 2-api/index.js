// gerekli modülü çağır
const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./utils/replaceTemplate.js");

// html dosya içeriğine erişelim
let productsHTML = fs.readFileSync("./templates/overview.html", "utf-8");
let cardHTML = fs.readFileSync("./templates/card.html", "utf-8");
let productHTML = fs.readFileSync("./templates/product.html", "utf-8");

// json dosyasındaki ürün verilerine eriş ve js formatına çevir
let jsonData = fs.readFileSync("./dev-data/data.json", "utf-8");
let data = JSON.parse(jsonData);

// createServer(): api oluşturmamızı sağlayan fonksiyon
// request: api'a gelen istek ile alakalı bilgileri içeren nesne
// response: client'a gönderilecek cevabı belirlememizi sağlayan nesne
const server = http.createServer((request, response) => {
  // isteğin geldiği uç nokta
  const { pathname, query } = url.parse(request.url, true); // /urun?id=5 --> pathname:/urun | query:{id:5}

  if (pathname === "/urunler") {
    // data dizisindeki her bir eleman için card html'i oluştur
    const cards = data.map((item) => replaceTemplate(cardHTML, item)).join("");

    // oluşturulan card html'ini sayfa içerisine yerleştir
    productsHTML = productsHTML.replace("{%PRODUCT_CARDS%}", cards);

    // client'a html yanıtını gönder
    return response.end(productsHTML);
  }

  if (pathname === "/urun") {
    // parametre olarak gelen id'li ürünü bul
    const item = data.find((item) => item.id == query.id);

    // productHTML içeriğindeki değişkenler yerine ürün bilgilerini yerleştir
    const output = replaceTemplate(productHTML, item);

    // detay sayfası html'ini client'a gönder
    return response.end(output);
  }

  return response.end(`<h1>Sunucuya Hosgeldiniz!</h1>`);
});

// oluşturduğumuz api'ın ağda hangi portta çalışıcağını belirle
server.listen(3000, "127.0.0.1", () => {
  console.log("API 3000. portta çalışmaya başladı");
});
