# Server Side Rendering vs Client Side Rendering

- Client side rendering yöntemi uygulanan bir sayfa girdiğinizde `js kodu` ve `boş html dosyası` indirirsiniz. İndirilen js `kullanıcının cihazında` çalışır, html içeriğini doldurur ardından sayfa ekrana gelir

- Server side rendering yöntemi uygulanan bir sayfaya girdiğinizde `js kodu`, `sunucuda` çalışır ve `html kodu sunucuda oluşur`. Oluşan `dolu html doyasını` client indirir ve sayfa ekrana gelir

## SSR Faydaları

- JS kodu kullanıcının cihazında değilde sunucuda çalışıyor olması daha hızlı sonuç üretmesini sağlar ve daha kısa yükleme süresi olur.
- SEO açısından dolu HTML dosyası indirmek çok daha iyidir, bu sayede google'ın robotları sayfa içeriğini boş zannedip sitemizi arama sonuçlarında alt sırala koyar

## Nasıl SSR veya CSR kullanırız?

- Next.js'de iki farklı component türü vardır:
- Server component: İçeriği server'da render edilir
- Client component: İçeriği client'da render edilir

- Next.js biz aksini belirtmedikçe bütün component'ları `server component` yapar
- Eğer bileşenin üst kısmına `use client` yazarsak `client component` olur

- Next.js bizden olabildiğince fazla server component kullanmamızı bekler
- Her component'ı server component yapamıyoruz. Kullanıcı etkileşimi gerektiren (onClick,onSubmit), veya hooks (useState,useEffect) kullanana bileşenler client component olmak zorundadır

- Not: Next.js bizden olabildiğince çok server component kullanmamızı istediği için eğer bir sayfa içerisinde kullanıcı etkileşimi gerektiren bir alan varsa bütün sayfayı client component yapmak yerine ilgili alanı ayrı bir client component yaparız sayfa ise server component kalmaya devam eder

## İç İçe Kullanım

- Bir `server component` içerisinde `client component` yazmakta bir sorun yoktur

- Bir `client component` içerisinde `server component` kullanırsak server component client component'a dönüşür

- Bir `client component` içerisinde `server componment` children propuyla (HOC) aldığımızda zaman sever component'ın yapısı bozulmaz

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cahe'de tutar ve veriyi çeken fonksiyonu tekrar çalıştırdığımızda api'dan veriyi tekrar çekmek yerine önceki istekden gelen cache'de tutulan veriyi kullanır.

- Bu sayede:
- - api'dan cevap beklemek gerekmez > daha hızlı
- - api'a gereksiz istek gitmez > daha az maliyet
- - büyük oranda redux/context gibi global state managment'a ihtiyaç duymuyoruz > daha pratik

- Not: Next.js varsayılan olarak api'dan gelen cevabı cache'de tutar ama bu fetch methoduna gönderilecek parametrelerle değiştirilebilir

## Fetch Ayarları

- `cache:no-store`: cache'i asla kullanmaz her istek api'a gider
- `cache:no-cache`: önce cache'e bakar ardından api'a istek atıp cache'deki verinin güncelliğini kontrol eder cache'deki veri eskiyse yeniler değilse cache'deki veriyi kullanır
- `cache:force-cache`: varsayılan ayardır, api'dan gelen veri cache'de saklanır
- `revalidate:süre`: cache'in ne kadar süre geçerli olucağını belirler

# Next.js Methodları

## useRouter

- sadece `client` componentlarda kullanılır
- proje içerisinde yönlendirme yapmak için kullanılır
- back() | forward() | refresh() | push() methodları vardır

## redirect

- sadece `server` componentlarda kullanılır
- yönlendirme yapmak için kullanılır

## notFound

- hem `server` hem de `client` component'larda kullanılabilir
- 404 sayfasını ekrana basar

## usePathname

- sadece `client` componentlarda kullanılır
- kullanıcının bulunduğu yolu url'den alıp getirir

## useParams

- sadece `client` componentlarda kullanılır
- url'deki parametrelere erişmemizi sağlar

## useSearchParams

- sadece `client` componentlarda kullanılır
- url'deki query parametrelerine erişmemizi sağlar

# Form

- Normal şartlarda formlarda kullanıcı etkileşimini izlememiz gerektiğinden formların client component olması gerekir.
- Eğer form'un sadece gönderilme yani onSubmit anını izlemek istiyorsak server action yöntemini kullanarak formu server component olarak oluşturabiliriz

# Static Site Generation (SSG)

- SSG, next.js'ın build sırasında sayfaları html olarak üretip sunucuda saklaması işlemidir.
- Kullanıcı siteyi ziyaret ettiğinde sayfalar anında ve çok hızlı bir şekilde sunulur çünkü sayfa önceden hazırlanmıştır

## Static Sayfa

- Build anında html hazılanıp sunucuda saklanır, kullanıcı sayfaya girdiğinde tekrar hazırlanmadan kullanıcıya sunulur

## Dinamik Sayfa

- Kullanıcı sayfaya girdiği anda hazırlanıp kullanıcıya sunulan sayfalardır.
- Genelde url'de paramtresi olan ve sayfa içeriği buna göre değişen sayfalardır.

## Static Sayfayı Dinamik Sayfaya Çevirme (dynamic | revalidate)

- Next.js varsayılan olarak parametreye sahip olmayan bütün sayfaları statik yapar
- Ama bazen biz bu sayfa içeriklerinin statik olmasını istemeyebiliriz.
- Bu durumda revalidate ve dynamic özellikleri kullanılır

## Dinamic Sayfayı Static Sayfaya Çevirme (generateStaticParams)

- Next.js varsayılan olarak urlde parametresi olan bütün sayfaları dinamic yapar.
- Bunun sebebi url'deki parametrenin ne olucağının belirsiz olmasıdır.
- Bazı durumlarda detay sayfalarının alabileceği parametreler kısıtlı olur bu tarz durumlarda dinamik olan detay sayfalarını generateStaticParams yöntemiyle static hale çevirmek mümkündür.
