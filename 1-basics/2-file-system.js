const fs = require("fs");

/*
 * Node.js Modüllere Giriş: FS Nedir?
 * Peki, madem artık tarayıcıda değiliz ve işletim sistemindeyiz, bilgisayardaki bir dosyayı nasıl okuyacağız veya yeni bir dosya nasıl oluşturacağız? Saf JavaScript'in içinde 'dosya oku' diye bir komut yoktur çünkü tarayıcıların güvenlik gereği hard diske erişimi yasaktır.
 * İşte burada Node.js'in Çekirdek Modülleri (Core Modules) devreye girer. Node.js kurulduğunda bize bir alet çantası verir. Bu çantanın içindeki en önemli araçlardan biri fs (File System - Dosya Sistemi) modülüdür.
 */

// readFileSync: Senkron bir şekilde dosya okuma methodudur
// Senkron methodlar, işlem tamamlanana kadar bütün Node.js kilitlenir. Alt satıra geçmez.
// not: Eğer bu dosya 5gb'lık bir dosya olsaydı okunana kadar sunucuta bağlanan herkes beklemek zorundaydı, çümkü kod readFileSync satırında takılıp kalıcaktı
console.log("Dosya okunmaya başlandı...");

const metin = fs.readFileSync("./assets/notlar.txt", "utf-8");

console.log("Dosya okundu. İçeriği:", metin);
console.log("Diğer işlere devam ediliyor....");

// readFile: Asenkron bir şekilde dosya okuma methodudur
// Asenkron methodlar, işlemi başlatır ve anında alt satıra geçer. İşlem tamamlanınca "callback" fonksiyon çalışır
console.log("--------------------------------------------------");

console.log("Dosya okunmaya başlandı...");

fs.readFile("./assets/notlar.txt", "utf-8", (hata, metin) => {
  if (hata) {
    return console.error("Dosya okunamadı!");
  }
  console.log("-> Bildirim: Dosya arkaplanda okundu. İçeriği:", metin);
});

console.log("Diğer işlere devam ediliyor");

//! Dosya yazma
// Gönderilecek metin içeriğini hazırla
const newText = "Greyfurt vitamin açısından zengindir: " + new Date().toLocaleDateString();

// eğer verilan dosya varsa günceller yoksa yenisini oluşturur
fs.writeFileSync("./assets/greyfurt.txt", newText);
console.log("\n Dosya yazma işlemi bitti \n");

//! Dosya silme
fs.unlinkSync("./assets/bozuk.txt");
console.log("\n Dosya silme işlemi bitti \n");

//! Dizin oluşturma
fs.mkdirSync("newAssets");
console.log("\n Klasör oluşturma işlemi bitti \n");

//! Dizin/Dosya isim değiştirme
fs.renameSync("./assets/eski.txt", "./assets/yeni.txt");
console.log("\n İsim değiştirme işlemi bitti \n");
