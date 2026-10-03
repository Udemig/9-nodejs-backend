/*
 ! Proxy Nedir?
 * Client ile Server arasına girenn, isteği/yanıtı senin yerine ileten aracı sunucu
 * Client direkt hedef sunucuya gitmez, önce proxy'ye gider, proxy isteği hedefe iletir
 
 * 1. Forward Proxy (İleri Proxy)

 * Client'ın önünde durur, client adına dışarıya istek atar
 * Hedef sunucu, gerçek client'ı değil proxy'yi görür
 * Kullanım amaçları: IP gizleme, içerik filtreleme (okul/şirket ağlarında belli sitelere erişimi engelleme), cache

 * 2. Reverse Proxy (Ters Proxy) — backend'de asıl ilgilenecekleri bu

 * Sunucunun önünde durur, dışarıdan gelen istekleri arka plandaki gerçek sunucu(lar)a yönlendirir
 * Client, gerçek backend sunucusunu görmez, sadece proxy'yi görür
 * Örnek: Nginx, Caddy, HAProxy 
 
 ! Reverse proxy backend'de ne işe yarar?
 * Load balancing: Aynı Express.js uygulamasının 3 kopyası çalışıyorsa, gelen istekleri bu 3'üne dağıtır
 * SSL/TLS termination: HTTPS şifrelemesini proxy üstlenir, backend'e düz HTTP gider (backend kodunu basitleştirir)
 * Tek giriş noktası: Dışarıdan api.siteadi.com tek adres gibi görünür, arkada onlarca farklı port/servis olabilir (mikroservis) her mikroservise reverse proxy üzerinden yönlendirme yapılır)
 * Statik dosya sunumu: Nginx, React build çıktısını (HTML/CSS/JS) direkt sunar, Node.js sürecini yormaz
 * Güvenlik: Backend sunucusunun gerçek IP'si/portu dışarıya kapalı kalır
*/

const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use("/customer", proxy("http://localhost:3001"));
app.use("/products", proxy("http://localhost:3002"));
app.use("/shopping", proxy("http://localhost:3003"));

app.listen(3000, () => {
  console.log("Gateway servisi reverse proxy'e 3000. portta başladı");
});
