# Enviroment Variables

- Ortam / Çevre değişkenleri

- Projeyi paylaşırken, admin şifresi / veritabanı bağlantı url / api key gibi hasas bilgileri paylaşmak istemeyiz

- Bu noktada projenin çalışması için gerekli olan ama githuba göndermek istemediğimiz değişkenleri .env dosyasında tanımlarız

- .gitignore dosyasınıda .env dosyasını eklersek burada değişkenler kendi bilgisayarımızda çalışırken githuba asla gönderilmez

- Sadece hassas bilgileri değil proje yayınlandıktan sonra değiştirlmesi gerekebilececik verileride genelde .env de tutmayı techih ederiz bu sayede bu değerleri hızlıca güncelleyebilir ve tekrardan yayınlamak zorunda kalmayız. (ör: ŞİFRE YANLIŞ DENEME HAKKI)

# Validators

- Veritabanına veriyi kaydetmeden önce kontrol etmemizi sağlayan 3 çeşit validator vardır:

1. Built-in Validators: Mongoose içerisinde yer alan (min,max,required,enum) gibi yöntemler
2. Custom Validators: Proje ihitiyaçlarına göre kendi yazdığımız fonksiyonlar
3. Third Party Validator: Bir kütüphane üzerinden kullandığımız fonksiyonlar

# Virtual Property

- Client'a gönderilmesi gereken ama veritabanında tutulması gereksiz yük oluşturucak verileri, veritabanında saklamak yerine veriyi client'a gönderirken hesaplayıp ekleme yöntemidir

# Kullanıcı İşlemleri

## Authentication

- Kimlik doğrulama, email/şifre, faceid, parmak izi, google hesabı gibi yöntemlerle kullanınıcın kimliğini doğrulama sürecidir

## Authorization

- Yetkilendirme, kimlik doğrulama sürecinin devamında gerçekleştirdiğimiz ve kullanıcnın yetkilerini belirlediği süre..
- Bir kullanıcnın sistemin kaynaklarına erişimini kontrol etme sürecidir
- Kimliğini doğruladığımız kullanıcının neleri yapıp neleri yapamayacaığınız belirleriz

## Hash ve Salt

- Hashleme ve saltlama, verilerin güvenli bir şekilde saklanması ve özellikle parolaların korunması için tekniklerdir

- **Hashleme**
- Hashleme, veriyi alıp sabit uzunlukta, geri döndürülemez bir çıktıya dönüştüren matematiksel bir işlemdir
- Hash fonksiyonları tek yönlüdür, yani elde edilen hash değerinden orjinal veri pratikte geri elde edilemez
- Aynı girdi aynı hash çıktısını üretir.
- Denem@123 -----hash----> dgfhknıu176235@>gfoıufeh782356frnh
- Denem@123 -----hash----> dgfhknıu176235@>gfoıufeh782356frnh

- **Saltlama**
- Saltlama, hashleme işlemine ekstra bir güvenlik katmanı eklemek için kullanılır.
- Salt, parolaya haslemeden önce eklenen rastgele üretilmiş bir dizidir
- Salt, her kullanıcı için farklıdır
- Denem@123 ----salt---> fg14Denem@123fhgdy53
- fg14Denem@123fhgdy53 ---hash---> adsoufh743125t38@€jfu1237541dsh12253

- Denem@123 ----salt---> 32765Denem@123fh1231
- 32765Denem@123fh1231 ----hash---> 124y43275erwp0fgb rt324805623t6

- **Özetle**
- - Hash, şifreyi geri döndürülemez hale getirir. Salt ayın şifrenin aynı hash'i üretmesini engeller

## JWT (JSON Web Token)

- Sunucu ve client arasında güvenli bir şekilde bilgi alışverişi yapmak için kullanılır
- Sunucudan oluşturulan kullanıcı oturum bilgileri bir token şeklinde client'a aktarılır
- Client bu tokenı saklar ve yetki gerektiren her api isteğinde token ile birlikte istek atar bu sayede sunucu tarafında kullanıcını oturumunu doğrulayabiliriz

## Cookies

- Cookies, backend'in tarayıcıya gönderdiği ve tarayıcının saklayıp her istekte backende geri gönderdiği küçük verildir.
- Client <> Cookie <> Backend

## Authorization

- Yetkilendirme
- Kullanıcnın oturum durumu veya rolüne göre hangi endpointlere erişebileceğini belirleme süreci

# Global Hata Yönetimi

- Uygulumanın herhangi bir yerinde oluşan hataların tek bir merkezden yakalanıp, standart ve kontrollü şekilde client'a dönülmesini sağlar.

-**Neden Kullanılır**

- Hata formatını tek tip yapar
- try/catch tekrarını azaltır
- 500 gibi sunucu hatalarını kontrol atına alır

# Şifremi Unuttum

- Kullanıcı şifresini unuttuğu mail adresini yazar
- Biz mail adresinin kullanıcıya ait olduğunu doğrulamak için bir e-posta göndeririz
- Bu e-posta sayesinde mail'in kullanıcıya ait olduğunu doğrulayabilir ve şifre değiştirme sürecine geçebiliriz

# Data Modeling

- Data modeling, bir uygulamada verilerin nasıl saklanacağını, birbirleriyle nasıl ilişkilendirileceğini nasıl erişileceğini tanımlama sürecidir. Bu süreç, projenin ihtiyaçlarını karşılama adına veritabanı tasarımını planlamak için kullanılır. Amaç, karmaşık veri setlerinin daha anlaşılabilir düzenli, erişilebilir bir şekilde oranize edilmesini sağlamaktır

## Aşamalar

1. Gereksinim Analizi

- - Uygulamanın hangi verilerle çalışıcağı belirlenir
- - Verilerin nasıl kullanılcağını ve hangi sorguların yapılacağı analiz edilir

2. Varlıkların Tanımlanması

- - Veritabnında temsil edilecek nesneler belirlenir (Ürünler,Siparişler,Kullanıcılar)
- - Her nesnenin özellikleri belirlenir (ad,e-posta,şifre,yaş)

3. İlişkilerin Tanımlanması

- - Verilerin arasındaki ilişkiler belirlenir (örn: Sipariş nesnesinde kullanıcı verisi nasıl tutulacak)
- - İlişki Türler
- - Embed | Refferance
- - One To One | One to Many | Many to Many

4. Performans Optimizasyonu ve Indeksleme

- Sık yapılan sorgularda indeksleme yapılır.
- Veri modeli sorgu perfromansı arttıracak şekilde optimize edilir

# Embed vs Referance

1. Refferance | Normalization

- Referans, belirli bir belgedeki verileri bir başka belgeye referans (id) kullanılarak ilişkilendirmeye yarar.
- Yani iki belge arasında ilişki vardır ancak gerçek veri bir belgede saklanırken diğer belgede sadece gerçek verinin referansı mevcuttur.

2. Embedding | Denormalization

- Belirli bir belgenin içerisindeki verileri diğer belgelere doğrudan gömülü olarak tanımlamaya yarar

## Hangi Yöntemi Tercih Etmeliyiz

- Birlikte okunuyorsa embedd, ayrı büyüyorsa refferance

- **Embedding Ne Zaman?**
- Veri küçük
- Sık birlikte kullanıluyorsa,
- Nadiren güncelleniyorsa
- Tek owner varsa

- **Refferance Ne Zaman**
- Veri çok büyüyorsa
- Belge ayrı lazım oluyorsa
- Sık güncelleniyorsa
- Birden fazla yerde kullanıyorsa

# İlişki Türleri

- One to One (1:1): Bir kolleksiyondaki her kayıt diğer kolleksiyondaki tek bir kayıt ile ilişkilendirilir
- One to Many (1:Many): Bir kolleksiyondaki her kayıt diğer kolleksiyondaki birden çok kayıt ile ilişkilendirilir
- Many to Many (Many:Many): Bir kolleksiyondaki birden çok kayıt diğer kolleksiyondaki birden çok kayıt ile ilişkilendirilir

## Parent vs Child Referance

- Bu kavram, referanslı modelleme yaparken ID'nin hangi tarafta tutulacağına karar verme meselesidir

## Parent Refferance

- Child sayısı çoksa
- Pagination gerekiyor
- Child bağımsız bir belge ise
- Performs kritikse

```js
Order({
  totalPrice,
  createdAt,
  userId,
});
```

## Child Refferance

- Child sayısı azsa
- Liste sabit / küçükse
- Hızlı erişişm gerekiyor

```js
User({
  name,
  email,
  orderId,
});
```

## Populate

- `populate()`, bir mongodb belgesini sorguladığımızda, o belgenin içerisinde referans olarak verilen başka bir kolleksiyondaki belgeyi/belgeleri otomatik olarak doldurmamızı sağlayan yöntemdir
- Referans olarak tanımladığımız id'ler için arkağlanda bir sorgu daha yapıp ardından iki sorgunun verilerini birleştirir.
- SQL'deki JOIN yönteminin benzeridir
