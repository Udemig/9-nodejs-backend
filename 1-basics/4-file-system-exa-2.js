const fs = require("fs");

// TODO: fonksiyonu tamamlayın
async function metniBuyutVeKaydet() {
  try {
    // 1. makale.txt dosyasını okuyun

    // 2. okuduğunuz metni .toUpperCase() ile büyütün

    // 3. büyüttüğünüz metni yeni makale.txt dosyasına tekrar yazın

    console.log("İşlem başarıyla tamamlandı");
  } catch (error) {
    console.log("Hata yakalandı:", error.message);
  }
}

metniBuyutVeKaydet();
