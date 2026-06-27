# API - Application Programming Interface

- Temel olarak iki farklı yazılımın birbiriyle konuşmasını ev veri alışverişi yapmasını sağlayan bir köprüdür

# Klasik Restoran Analojisi

- Bir API'nin ne işe yaradığını anlamanın en güzel yolu onu bir restorana benzetmektir:

- - Müşteri (Client): Sensin. Bir web sitesine (frontend) veya mobil uygulamaya karşılık gelir. Menüden bir şey istersin.

- - Mutfak (Server/Database): Yemeğin hazırlandığı yerdir. Burası senin Node.js kodlarının çalıştığı ve verilerin tutulduğu arka plandır (backend).

- - Garson (API): Siparişini senden alıp mutfağa ileten ve mutfakta hazırlanan yemeği sana geri getiren sistemdir.

# HTTP METHODLARI - API'in Fiilleri

- Node.js ile bir api yazarken müşterinin database'den tam olak me istediğini anlatmak için bazı standart eylemler kullanırız.
- GET: Veri getirme
- POST: Veri oluşturma
- PUT / PATCH: Veri Güncelleme
- DELETE: Veri silme

# API ENDPOINTS - API Uç Noktaları

- Bir API Endpoint, client tarafından gönderilen HTTP isteklerinin API tarafında kabul edilidiği spesifik yoldur.
- örn: `https://www.api.com:3000/users`
- örn: `https://www.api.com:3000/products`
