# Food Delivery Microservice Backend

- Yemek sipariş işlemlerini **RabbitMQ tabanlı event-driven mikroservis** mimarisinde geliştirilmiş bir Node.js backend sistemi.
- Bu projede RabbitMQ'nun gerçek dünya kullanım kalıplarını (DLX, prefetch, idempotency, gracefull shutdown, reconnect, atomic update) kullanılacak

## Sistem Yapısı

- **API Gateway** (port:3000) - Merkesi giriş noktası, sadece reverse proxy
- **Auth Service** (port:3001) - Kullanıcı kayıt/giriş, JWT (RabbitMQ Producer)
- **Delivery Service** (port:3002) - Kurye ve teslimat takibi (RabbitMQ Consumer + Producer)
- **Order Service** (port:3003) - Sipariş işlemleri (RabbitMQ Producer)
- **Restaurant Service** (port:3004) - Restoran ve menü yönetimi (RabbitMQ yok)

## Event Akışı

```
Auth                      RabbitMq                         Delivery
────                      ────────                         ────────
register(courier)  ───►   [courier.created]  ──────────►   Kurye kayıdı aç

Order                      RabbitMq                         Delivery
─────                      ────────                         ────────
createOrder         ───►   [order.created]   ──────────►    Delivery kayıdı aç + kurye ata
updateStatus(ready) ───►   [order.ready]     ──────────►    Delivery status  "ready"
```

Exchange tipi **topic**, routing key patternleri:

- `order.*` ─► `delivery_queue` (delivery servisi dinler)
- `courier.*` ─► `courier_queue` (delivery servisi dinler)

# Kurulum

## Gereksinimler

- Node.js 20+
- MongoDB
- RabbitMQ
- Docker

## Kurulum komutları

```bash
npm i -D typescript
npx tsc --init
npm i express mongoose jsonwebtoken amqplib bcrypt zod dotenv cookie-parser helmet morgan cors express-rate-limit
npm i -D @types/amqplib @types/bcrypt @types/cookie-parser @types/express @types/jsonwebtoken @types/mongoose @types/morgan @types/node @types/cors tsx nodemon
```

## Ortam Değişkenleri

```bash
PORT=3001
MONGODB_URI=mongodb://localhost:27017/food_ms_auth
JWT_SECRET=lutfen-bu-degeri-gizli1-bir-degqqr-yap
RABBITMQ_URI=amqp://localhost
RATE_LIMIT_WINDOW=600000
RATE_LIMIT_MAX_REQ=100
```
