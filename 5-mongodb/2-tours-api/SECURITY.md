# 1. NoSQL Injection — MongoDB

**Saldırı**: Kullanıcıdan gelen veriler MongoDB sorgusuna doğrudan aktarılır.

- Örneğin uygulama mantıksal olarak şöyleyse:

```js
User.findOne({
  email: req.body.email,
  password: req.body.password, // {$ne:123}
});
```

ve gelen input'un obje olarak kabul edilmesine izin veriliyorsa saldırgan sorgunun anlamını değiştirmeye çalışabilir.

- **Risk**:

- Yetkisiz giriş
- Başka kullanıcıların verilerine erişim
- Authentication bypass

- **Engelleme**:

- Input validation kullan
- express-validator, Zod, Joi gibi araçlar kullan
- Beklenen tipleri kesin olarak kontrol et
- MongoDB operatörlerinin kullanıcı input'undan gelmesini engelle
- express-mongo-sanitize gibi çözümler kullanılabilir
- Request body/query/params'ı doğrudan MongoDB query'sine verme

- **Örneğin**:

```js
if (typeof email !== "string") {
  throw new BadRequest("Invalid email");
}
```

# 2. XSS — Cross-Site Scripting

Node.js backend HTML üretmese bile API üzerinden XSS'e sebep olabilir.

Örneğin kullanıcı:

```js
username = <script>...</script>;
```

gönderir.

Backend bunu veritabanına kaydeder ve frontend bunu escape etmeden gösterirse saldırı gerçekleşebilir.

- **Risk**:

- Kullanıcının session/token bilgilerinin çalınması
- Kullanıcı adına işlem yapılması
- Sahte içerik gösterilmesi
- Kullanıcı şifrelerinin çalınması

- Engelleme:

- Frontend'de output escaping
- Kullanıcı input'unu HTML olarak render etme
- Gerekiyorsa HTML sanitization
- CSP
- helmet

React gibi frameworkler varsayılan olarak birçok XSS senaryosunu engeller fakat:

dangerouslySetInnerHTML

gibi özelliklerde ekstra dikkat gerekir.

# 3. CSRF — Cross-Site Request Forgery

Özellikle authentication için cookie kullanıyorsan önemlidir.

Saldırgan kullanıcının tarayıcısını kullanarak senin API'ına istek yaptırmaya çalışır.

Örneğin kullanıcı bankaya giriş yapmıştır.

Saldırganın sitesini açar:

attacker.com

ve kullanıcının tarayıcısından bankaya istek gönderilmeye çalışılır.

- **Risk**:

- Para transferi
- Şifre değiştirme
- Hesap ayarlarını değiştirme
- Yetkili işlemlerin kullanıcının haberi olmadan yapılması

- **Engelleme**:

Cookie kullanıyorsan:

```js
{
httpOnly: true,
secure: true,
sameSite: "strict"
}
```

# 4. Brute Force

Saldırgan login endpoint'ine sürekli istek gönderir.

```bash
POST /login
POST /login
POST /login
POST /login
```

```bash
Amaç:

password123
123456
qwerty
```

gibi şifreleri denemektir.

- **Engelleme**:

- Rate limiting
- - app.use("/api/auth/login", loginLimiter);

- **Örneğin**:

- - 5 başarısız deneme
    ↓
- - 15 dakika bekleme

- **Ek olarak**:

- Güçlü password policy

# 6. JWT Güvenlik Açıkları

JWT kullanıyorsan çok önemli.

- Kötü uygulamalar:

jwt.verify(token, secret);

kullanırken algorithm/configuration kontrollerini düzgün yapmayabilir.

- **Ayrıca**:

- Secret'ın zayıf olması
- Token'ın uzun süre geçerli olması
- Refresh token'ın yanlış yönetilmesi
- Token'ın localStorage'da tutulması
- JWT payload'una güvenilmesi

risk oluşturur.

- **İyi yaklaşım**

- Access token:
- - 5-15 dakika

- Refresh token:
- - daha uzun

ve refresh token rotation/revocation uygulanabilir.

Secret:

JWT_SECRET=çok-uzun-rastgele-secret

Ayrıca JWT içindeki:

{
userId,
role
}

bilgilerine körlemesine güvenme.

# 7. Broken Access Control / IDOR

Profesyonel backendlerde en önemli açıkların başında gelir.

- Örneğin:

GET /api/users/123

kullanıcının kendi verisi.

- Saldırgan:

GET /api/users/124

yapınca başka kullanıcının bilgilerini alabiliyorsa:

IDOR vardır.

Daha tehlikelisi:

PATCH /api/orders/124

ile başka kullanıcının siparişini değiştirebilmek.

- **Engelleme**

Her request'te:

Authentication
↓
Authorization
↓
Resource ownership
↓
Database operation

kontrol edilmeli.

- **Örneğin**:

```js
Order.findOne({
\_id: orderId,
user: req.user.\_id
});
```

# 8. Privilege / Mass Escalation

Normal kullanıcı kendisini admin yapabiliyorsa ciddi açık vardır.

- **Örneğin**, kullanıcı:

```js
{
"name": "Furkan",
"role": "admin"
}
```

gönderir.

Backend bunu doğrudan MongoDB'ye kaydediyorsa:

🚨 kritik açık.

- **Engelleme**

Client'ın gönderdiği field'ları whitelist et.

# 9. Sensitive Data Exposure

API yanlışlıkla:

```js
{
  "_id": "...",
  "email": "...",
  "password": "...",
  "resetToken": "...",
  "refreshToken": "..."
}
```

döndürebilir.

Şifre hash'lenmiş olsa bile response'a göndermek gereksizdir.

# 10. DoS / Resource Exhaustion

- Saldırgan çok büyük ve çok sayıda request gönderebilir:

```js
{
  "description": "AAAAAA.... çok büyük veri"
}
```

veya çok büyük JSON body gönderebilir.

- **Engelleme**
  app.use(express.json({
  limit: "100kb"
  }));

- **Ayrıca**:

- Rate limiting
- Pagination

# 11. File Upload Vulnerabilities

Kullanıcı:

POST /upload

ile dosya gönderiyorsa çok dikkatli ol.

- **Saldırgan**:

malicious.php
malicious.js
çok büyük dosya
polyglot dosya

gibi dosyalar göndermeye çalışabilir.

Node.js kullanıyor olsan bile dosya upload güvenliği önemlidir.

- **Engelleme**
- - MIME type kontrolü
- - Extension allowlist
- - File size limit
- - Dosyayı yeniden encode etme
- - Random filename

## 12. HTTP Parameter Pollution

Örneğin aynı parametrenin birden fazla gönderilmesi:

?id=1&id=2

uygulamanın bunu nasıl parse ettiğine göre beklenmeyen davranış oluşturabilir.

- **Engelleme**

Input schema belirle:

id → string
page → integer
limit → integer

Beklenmeyen array/object gelirse reject et.
