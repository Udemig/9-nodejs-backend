const fs = require("fs");
const crpyto = require("crypto");
const write = require("../utils/write");
/*
 ! Controller
 * iş mantığı (business logic) içeren fonksiyonlardır
 * HTTP isteğini alır (req)
 * Gerekli işlemleri yapar (okuma,yazma,güncelleme,silme)
 * HTTP yanıtı döndürür (res)
*/

// randevu verilerini json dosyasından al
let appointments = JSON.parse(fs.readFileSync(`${__dirname}/../data/db.json`, "utf-8"));

exports.getAllAppointments = (req, res) => {
  res
    .status(200)
    .json({ message: "Randevular listelendi", results: appointments.length, data: appointments });
};

exports.getAppointmentsByDoctor = (req, res) => {
  // arama parametresi olarak gelen doktor ismine eriş
  const { name } = req.query;

  // doktor ismi gelmediyse hata gönder
  if (!name?.trim()) return res.status(404).json({ message: "Doktor bulunamadı" });

  // doktor'a ait randevuları filtrele
  const filtred = appointments.filter((i) => i.doctor === name);

  res
    .status(200)
    .json({ message: "Randevular listelendi", results: filtred.length, data: filtred });
};

exports.getAppointmentDetail = (req, res) => {
  // url'deki id parametresine eriş
  const { id } = req.params;

  // randevular arasından id ile eşleşeni bul
  const appointment = appointments.find((i) => i.id === id);

  // randevu bulunamadıysa
  if (!appointment) return res.status(404).json({ message: "Randevu bulunamadı" });

  // client'a yanıt gönder
  res.status(200).json({ message: "Randevu bulundu", data: appointment });
};

exports.createAppointment = (req, res) => {
  // backendin oluşturması gereken verileri hazırla
  const id = crpyto.randomUUID();
  const createdAt = new Date().getTime();
  const updatedAt = new Date().getTime();

  // body ile gelen verilerin içerisinde yukarıdaki verileri ekle
  const newAppointment = { ...req.body, id, createdAt, updatedAt };

  // yeni randevuyu, randevular dizisine ekle
  appointments.push(newAppointment);

  // json dosyasını güncelle
  write(appointments);

  // client'a yanıt gönder
  res.status(200).json({ message: "Randevu oluşturuldu", data: newAppointment });
};

exports.updateAppointment = (req, res) => {
  // url'den güncellenicek randevunun id'sine eriş
  const { id } = req.params;

  // id'si bilinen randevun dizideki sırasını bul
  const index = appointments.findIndex((i) => i.id === id);

  //  isteğin body kısmında gelen veriler ile randevu nesnesini güncelle
  const updated = { ...appointments[index], ...req.body, updatedAt: new Date().getTime() };

  // dizideki elemanı güncelle
  appointments[index] = updated;

  // json dosyasını güncelle
  write(appointments);

  // client'a yanıt gönder
  res.status(200).json({ message: "Randevu güncellendi", data: updated });
};

exports.deleteAppointment = (req, res) => {
  // silinecek randevunun id'sine eriş
  const { id } = req.params;

  // id'si bilenen randevuyu diziden kaldır
  appointments = appointments.filter((i) => i.id !== id);

  // db.json'ı güncelle
  write(appointments);

  res.status(204).json({ message: "Randevu kaldırıldı" });
};
