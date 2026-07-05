const express = require("express");
const {
  getAllAppointments,
  getAppointmentsByDoctor,
  getAppointmentDetail,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers");

/*
 ! Route
 * Hangi URL'e hangi HTTP methoduyla istek atıldığında çalışıcak olan fonksiyonu belirle
*/

// Router > server.js dosyası dışarısında route tanımlamaya yarar
const router = express.Router();

// randevuları al
router.get("/api/appointments", getAllAppointments);

// doktara ait randevuları al
router.get("/api/appointments/doctor", getAppointmentsByDoctor);

// randevu detayını al
router.get("/api/appointments/:id", getAppointmentDetail);

// randevuları olutur
router.post("/api/appointments", createAppointment);

// randevu düzenle
router.patch("/api/appointments/:id", updateAppointment);

// randevu kaldır
router.delete("/api/appointments/:id", deleteAppointment);

// server.js'e routelar'ı tanıtmak için export et
module.exports = router;
