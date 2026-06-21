const path = require("path");

/*
 * Senaryo: Kullanıcı profil resmi yükleme kontrolü
 * Bir web uygulamasından profil resmi yükleniyor. Biz de dosyanın:
 * dosya adını alıyoruz
 * uzantısını kontrol ediyoruz
 * kaydedileceği klasör yolunu oluşturuyoruz
 */

function uploadProfileImage(file) {
  // izin verilen uzantılar
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  // dosya adına eriş
  const fileName = path.basename(file.originalname);

  // dosya uzantısına eriş
  const fileExtension = path.extname(fileName);

  // dosya uzantısı izin verilen bir formatta değilse hata ver
  if (!allowedExtensions.includes(fileExtension)) return "Sadece jpg, jpeg, png formatları destekleniyor";

  // dosyanın kaydedileceği yer
  const uploadPath = path.join(__dirname, "uploads", "profiles", fileName);

  return `Dosya başarıyla yüklenicek: ${uploadPath}`;
}

console.log(uploadProfileImage({ originalname: "/x/profile-photo.gif" }));
