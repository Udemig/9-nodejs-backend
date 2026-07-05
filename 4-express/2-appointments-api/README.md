# Express Hastane Randevu API

- CRUD endpointlerine sahip randevu api'si
- Create (Oluştur)
- Read (Oku)
- Update (Güncelle)
- Delete (Sil)

## Endpoints

- Randevuları al
- GET: `/api/appointments`

- Randevuları al (doktara ait)
- GET: `/api/appointments/doctor/:doktor_ismi`

- Randevu detayını al
- GET: `/api/appointments/:id`

- Randevu oluştur
- POST: `/api/appointments`

- Randevu güncelle
- PATCH: `/api/appointments/:id`

- Randevu kaldır
- DELETE: `/api/appointments/:id`

## Teknolojiler

- express
- nodemon

## Veritabanı

- db.json

## Klasör Yapısı

appointment_api/
/── controllers/ # iş mantığı (CRUD işlemleri)
/── routes/ # route tanımları
/── data/ # json veri dosyası
/── middleware/ # ara yazılımlar
/── utils/ # yardımcı fonksiyonlar
/── server.js # ana server dosyası
