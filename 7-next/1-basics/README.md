# Routing

- Next.js güncel sürümünde önerilen routing yöntemi `App Router`'dır ama Next.js'in 13 sürümü öncesinde `Pages Router` kullanılır.

# App Router

- React projelerindeki react-router-dom kütüphanesiyle yaptığımız sayfalamayı next.js'de next'in kendine has app router yöntemiyle yaparız.
- Dosya dizinine göre / klasör tabanlı sayfalama yapılır
- Bir sayfa oluşturmak için app klasörü içerisinde o sayfanın adına sahip bir klasör oluştururuz.
- Oluşturduğumuz klasör içerisinde `page.jsx` dosyası oluşturulmalı
- `page.jsx` dosyası içerisinden bir react bileşeni export edilmeli
- Next.js bu sayfayı otomatik olarak tespit eder.

# Nested Routes

- İç İçe Yollar
- örn:
- /profile > profilini görüntüle
- /profile/friends > arkadaşlarını görüntüle
- /profile/edit > profilini düzenle

# Link

- Next.js kullanıcıyı linkler aracılığıyla yönlendirmek için Link bileşenini kullanırız
- `href` propu ile yönlendirme adresini yazarız

# Dynamic Routes

- Url'deki parametrelere göre içeriği değişen detay sayfalarıdır.
- /products/10 | /videos/bdh126321 | /cars/m4
- Bir dinamik route tanımlamak için klasör oluştururken parametre ismini [] içerisinde yazarız
- Detay sayfasına ise bu parametreye prop yardımıyla erişiriz

- /products/1
- /products/2
- /products/3
- `/products/[id]`

# Catch All Segments

- Birden fazla parametreyi tanımlama
- Bir route'da birden fazla parametre olduğunda bu yöntemi kullanırız.
- Bu yöntemde parametre sayısı birden fazla olduğu için parametreler hep dizi olarak gelir

- /belgeler
- /belgeler/belge-1
- /belgeler/belge-1/sayfa-4
- /belgeler/belge-1/sayfa-4/satir-20
- `/begeler/[...slug]`

# Not Found

- 404 Sayfası
- Bir 404 sayfası oluşturmak için tek yapmamız gereken app klasörü içerisinde `not-found.jsx` isimlibir dosya oluşturmalıyız
- Next.js in brsayılan bir 404 sayfası var ama istersek bunu değiştirebiliyoruz

# Route Group

- Sayfa Gruplandırma, proje içerisinde sayfaların daha erişilebilir olması için kategorilerine göre gruplandırma işlemidir.
- Ortak layout'a sahip olucak sayfaları aynı route grubu içerisinde almak isteyebiliriz
- Normal klasörler url'i etkileyeceği için sayfaları gruplandırıken normal klasör kullanmayı tercih etmeyiz

- /auth/register > auth ismi url'e etki eder
- /(auth)/register > auth ismi url'e etki etmez

# Layout

- Bir uygulamanın veya sayfa grubunun genel dizaynını / ortak elementlerini / yetkilendirme durumunu belirlemek için kullandığımız bileşendir.

- Bir sayfa grubunun veya projedeki bütün sayfaların ortak kullanıcağı bileşenleri layout içerisinde tanımlayıp kod tekrarını önleyebiliriz

- Layout'un, oluşturduğumuz konuma bağlı olarak etki ediceği sayfalar değişir
- Eğer app klasörü içerisinde oluşturursak bütün sayfalara etki eder
- Eğer bir route grubu içerisinde oluşturursak sadece o route grubundaki sayfalara etki eder

- Layout bileşenleri, ekrana basılacak olan sayfaları children propu olarak alır bundan dolayı layout'lar birer HOC (Higher Order Component) türündedir
- Dosya ismi mutlaka `layout.jsx` olmalıdır

# Template

- Layout ile aynı özelliklere sahiptir.
- Sadece sayfa geçişlerinde state sıfırlanır

# Özel Dosyalar

- `page.jsx` > sayfa tanımlar
- `layout.jsx` > birden fazla sayfa için özellik/düzen tanımlar
- `template.jsx` > birden fazla sayfa için özellik/düzen tanımlar
- `not-found` > 404 sayfası tanımlar

- `loading.jsx`
- - Bir bileşen içerisinden api isteği atıldığında api'dan cevap gelene kadar otomatik olarak ekrana gelen bir bileşendir.
- - Asenkron Bileşen, await ile promise'in sonuçlanmasını beklediği süre boyunca ekrana gelir
- - Loading doyasını oluşturduğumuz klasör bileşenin hangi sayfalara etki ediceğini belirler
- - Loading bileşeni, layout içerisinde children nerede ekrana basıldıysa orada renderlanır

- `error.jsx`
- - Bir bileşen içerisinden api isteği atıldığında api'dan hata cevabı gelirse otomatik olarak ekrana gelen bir bileşendir.
- - Bileşende hata meydana geldiği zaman ekrana gelir
- - error doyasını oluşturduğumuz klasör bileşenin hangi sayfalara etki ediceğini belirler
- - error bileşeni, layout içerisinde children nerede ekrana basıldıysa orada renderlanır
- - hata bilgisini ve bileşeni yeniden renderlama fonksiyonunu prop olarak alır

# Import

- Bir içeriği import ederken next.js'de 2 farklı yöntem vardır

## Relative Import

- Import ediceğimiz dosyaya bulunduğumuz dosyanın konumuna göre `../../` ifadesiyle erişilir

## Absolute Import

- Bir dosyayı import ederken bulunduğumuz dosyanın konumu önemsizdir
- `@/` buradaki @ işareti sayesinde src klasörünü baz alırız
- Bu sayede import ederken src klasöründen itibaren import ederiz ve bulunduğumuz dosya konumunun bir önemi kalmaz
- Bu yöntemde dosya konumu değiştirsek bile import yoluna dokunmaya gerek kalmaz

## Image

- Next.js'de resimleri image componentıyla ekrana basarsak, next.js resmi renderlamadan önce bir çok optimizasyondan geçirir, boyutunu düşürür, formatına webe uygun hale geririr ve ekrana basar
- Bu optimizasyon sayesinde resim içerikleri daha hızlı ekrana gelirken bununla birlikte SEO'da olumlu yönde etkilenir

# Parallel Routes

- Parallel Routes, aynı anda birden fazla bağımsız sayfayı aynı layout içerisine ekrana basmaya yarar
- Her sayfa kendi bağımsız yüklenme mantığına sahip olur (loading.jsx özelliği)
- @Slot: @ işaret ile tanımlanan ve parallel route olarak ekrana basılan sayfalardır
- Slot olarak tanımlanan sayfalar layout'a prop olarak gider.
- Layout üzerinden slot olarak tanımlanan sayfaları aynı anda veya koşullu olaraka ekrana basabiliriz

# Intercepting Routes

- Önizlemeli Routelar
- Bir sayfaya yönlendiren linke tıkladığımızda öncelikle bir modal açıp yönlendireceğimiz sayfanın detaylarını modal üzerinden gösteririrz. Kullanıcı sayfayı yeniler veya url üzeirnden ziyaret ederse modal yerine sayfanın kendisini görür.
- Bu özellik genel olarak ürün detay veya login,register sayfalarında daha akıcı bir kullanıcı deneyimi için kullanılır

# SSR VS CSR
