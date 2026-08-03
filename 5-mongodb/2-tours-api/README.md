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
