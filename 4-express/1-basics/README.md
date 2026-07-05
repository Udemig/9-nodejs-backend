# Routing (Yönlendirme)

- Bir URL ve HTTP methoduna gelen isteğin, hangi kodu çalıştırıcağını belirleme işlemi

# Express

- Node.js üzerinde çalışan bir routing framework'udur.
- API yazmayı çok daha kolay hale getirir.

- Neden express'e ihtiyaç var?
- Node.js'İn kendi HTTP modülü ile api yazmak mümkün ama:
- - Routing uğraştırıcıdır
- - Middleware (arayazılım) mantığı yoktur
- - Kod çok hızlı karmaşıklaşır
- - Express bu problemleri çözer

# Middleware

- İstek ile cevap arasına giren ve bu akışı kontrol eden ara fonksiyonlardır.
- İstek gelir -----> middleware çalışır ------> response döner

- middleware'Ler ile neler yapılabilir?

* req ve res nesnelerine erişilebilir ve değiştirilebilir
* isteği sonlandırabilir
* bir sonraki adıma geçebilir: next()
* hata yakalanbilir
* cors sorunuınu çözebiliriz
* yetkilendirme
