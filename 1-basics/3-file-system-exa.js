const fs = require("fs").promises;

// TODO: fonksiyonu tamamlayın
async function metniBuyutVeKaydet() {
  try {
    // 1. makale.txt dosyasını okuyun
    const metin = await fs.readFile("makale.txt", "utf-8");

    // 2. okuduğunuz metni .toUpperCase() ile büyütün
    const buyukMetin = metin.toUpperCase();

    // 3. büyüttüğünüz metni yeni makale.txt dosyasına tekrar yazın
    await fs.writeFile("makale.txt", buyukMetin, "utf-8");

    console.log("İşlem başarıyla tamamlandı");
  } catch (error) {
    console.log("Hata yakalandı:", error.message);
  }
}

dosyaKopyala();
