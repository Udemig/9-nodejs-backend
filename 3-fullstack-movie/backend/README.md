# Movie Backend

- Bu api'dan beklentimiz film verilerini yönetmesi ve frontende'e aktaramasıdır.
- Rest (Restfull) Api: HTTP methodları ile istek atılan ve JSON formatında yanıt döndüren api'dır.

# Endpointler

- GET /movies : Film verileri JSON formatında gönderilecek
- POST /movies : Yeni bir film verisi oluşturup kaydet
- PUT /movies/id : ID parametresiyle bildirilen film güncellenicek
- DELETE /movies/id : ID parametresiyle bildirilen film kaldırılacak

# API - Application Programming Interface

- Temel olarak iki farklı yazılımın birbiriyle konuşmasını ev veri alışverişi yapmasını sağlayan bir köprüdür

# Klasik Restoran Analojisi

- Bir API'nin ne işe yaradığını anlamanın en güzel yolu onu bir restorana benzetmektir:

- - Müşteri (Client): Sensin. Bir web sitesine (frontend) veya mobil uygulamaya karşılık gelir. Menüden bir şey istersin.

- - Mutfak (Server/Database): Yemeğin hazırlandığı yerdir. Burası senin Node.js kodlarının çalıştığı ve verilerin tutulduğu arka plandır (backend).

- - Garson (API): Siparişini senden alıp mutfağa ileten ve mutfakta hazırlanan yemeği sana geri getiren sistemdir.

# Request

- API'a gönderilen istektir
- Örn: `GET /users`

- **Bir request içerisinde neler olabilir?**

- METHOD: POST
- URL: /users
- BODY: {name:Ali,age:34}
- HEADERS: {language:"tr"}
- QUERY PARAMS: /movies?sirala=yas
- PATH PARAMS: /movies/id123

## HTTP METHODLARI - API'in Fiilleri

- Node.js ile bir api yazarken müşterinin database'den tam olak me istediğini anlatmak için bazı standart eylemler kullanırız.
- GET: Veri getirme
- POST: Veri oluşturma
- PUT: Kaynapın tamamını günceller
- PATCH: Kaynağın sadece belirtilen alanlarını günceller
- DELETE: Veri silme

## API ENDPOINTS - API Uç Noktaları

- Bir API Endpoint, client tarafından gönderilen HTTP isteklerinin API tarafında kabul edilidiği spesifik yoldur.
- örn: `https://www.api.com:3000/users`
- örn: `https://www.api.com:3000/products`

## BODY

- Body frontend'in backend'e veri göndermek istediğinde kullanılır.
- örn: `yeni kullanıcı ekleniyorsa o kullanıcının bilgileri body ile api'a gönderilir`

## HEADERS

- İstek ile alakalı ek bilgileri taşır
- `Language`: API'ın döndürüceği cevabın dilini belirler
- `Authorization`: Yetkilendirme için kullanılır
- `Accept`: API'ın döndüreceği veri formatını velirler
- `Content-Type`: API'a veri gönderiyorsak o verinin tipini söyler

## QUERY PARAMS

- Url içerisinde ? ardında yer alan parametrelerdir
- İsteği özelleştirmek için kullanılır
- Genelde filtreme veya sıralama amacıyla kullanırız
- `?category=eğlence&sort=price`

## PATH PARAMS

- Belirli bir kaynağı seçmek için kullanılır
- `/users/91`

# Response

- Backend'in, frontend'in gönderdiği isteğe verdiği yanıttır.

- **Bir response içerisinde neler olabilir?**
- status code: 200
- body: json
- headers

## Status Code

- İsteğin gerçekleşme durumuyla alakalı koddur
- 200: OK
- 201: CREATED
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## JSON

- Backend ile frontend'İn ortak konuşma dilidir.
- ```JSON
  {
    "name":"Ali",
    "age":50
  }
  ```

# Süreç Diyagramı

                  İSTEK (REQUEST)

Frontend
│
│
├── URL
├── HTTP Method
├── Headers
├── Query Params
├── Path Params
└── Body
│
▼
Backend (API)
│
▼
Veritabanı
│
▼
RESPONSE
├── Status Code
├── Headers
└── JSON Body
│
▼
Frontend
