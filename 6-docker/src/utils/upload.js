import multer from "multer";
import { BadRequest } from "./error.js";
import sharp from "sharp";

// diskStorage kurulum (dosyaları sunucuya kaydetmek için)
const diskStorage = multer.diskStorage({
  // dosyanın yükleniceği klasörü beilirle
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },

  // dosyanın ismini belirle
  filename: function (req, file, cb) {
    // benzersiz bir sayı oluştur
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // dosya uzantısını belirle
    const ext = file.mimetype.split("/")[1];
    // dosya ismini belirle
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

// memoryStorage kurulum
const memoryStorage = multer.memoryStorage();

// fotoğraf içeriği dışındaki dosyaları kabul etmeyecek mw
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // eğerki dosya tipi resim ise kabul et
    cb(null, true);
  } else {
    // resim değilse hata fırlat
    cb(new BadRequest("Dosya tipi sadece resim olabilir (jpg,jpeg,png,webp...)"));
  }
};

// multer middleware kurulumu
export const upload = multer({ storage: memoryStorage, fileFilter: multerFilter });

/*
 * Kullanıcı 4k çözünürlükte 20-30mb bir fotoğrafı profil fotosu olarak yüklemeye çalışabilir.
 * Proje içeirsinde profil fotoğrafları genelde 40x40 veya 80x80 boyutlarında kullanıclır ama kullanıcı fotoğrafı seçerken 2560x1440 gibi yüksek kalite fotoğraf seçebilir ve herhangi bir işlemden geçirmeden sunucuya kaydedersek gereksiz alan kaplar.
 * Bu yüzden fotoğrafları suncuya kaydetmeden önce sharp kütüphaneisi ile işleyeceğiz
 */
export const resize = (req, res, next) => {
  if (!req.file) return next();

  // dosya ismi bellirle
  const filename = `photo-${req.user.id}-${Date.now()}.webp`;

  // dosayayı işle ve diske kaydet
  sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(`uploads/users/${filename}`);

  // yeni yüklenen dosyayı mw'den sonra çalışıacak fonksiyonda erişmek için req'e ekle
  req.file = `uploads/users/${filename}`;

  next();
};
